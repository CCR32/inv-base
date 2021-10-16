const mysql = require('mysql');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');


const mysqlconfig = {
    host: process.env.HOST_MYSQL,
    user: process.env.USERNAME_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DB_MYSQL,
    port: process.env.MYSQL_PORT
};

//Se creo esta función para verificar que los objetos tengan al menos una propiedad adempas de las heredadas por Object 
const verifyObject = function(object){ 
        let numberOfProperties = 0;     
        if (object !== null && object !== undefined) { 
                console.log('Database.js procesndo objeto' + object); 
                numberOfProperties= Object.getOwnPropertyNames(object).length;

                if (numberOfProperties == 0) 
                        return false; 
                return true; 
        }
}
const resultObject = (function(result) {
    this.numberOfResult = 0;
    this.result = [];
    this.rowsAffected = 0;
    this.messageError = null;
    if (result !== null) {
        if (result.rowsAffected !== undefined)
            this.numberOfResult = result.rowsAffected;
    }

    this.withResult = function(result) {
        this.result = result;
        return this;
    }
    this.withNumberOfRows = function(number) {
        this.numberOfResult = number;
        return this;
    }
    this.withError = function(error) {
        this.messageError = error;
        return this;
    }
});


const fileObject = (function() {
    this.writeLog = function(string) {
        try {
            let file_name = "mns_sys.log";
            let bufferTime = new Date();
            let str_time = "\n" + bufferTime.getMonth() + "-" + bufferTime.getDate() + "-" + bufferTime.getFullYear() +
                String.fromCharCode(32) + bufferTime.getHours() + ":" + bufferTime.getMinutes() + ":" + bufferTime.getSeconds();
            string = str_time + String.fromCharCode(32) + string;
            fs.appendFile(file_name, string, (err) => {
                if (err !== null) {
                    throw new Error(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

const dbObject = (function() {
    // sobreescribo la función para que cuando un dato se encuentre no importe si son mayúsculas y monisculas.
    this.fObject = new fileObject();
   
    /// Ejecutar esta función para servidores sde base de datos mysql. 
    this.QuerySelect_MYSQL = async function(qry, obj, parameters) {
        let promObj = new Promise((resolve, reject) => {
            this.objConnection = mysql.createConnection(mysqlconfig);
            var _this = this;
            _this.tempObj = obj;
            _this.res = [];            
            this.objConnection.connect(function(err) {
                if (err) throw new Error(err);
                console.log(` parameters: ${parameters}`);
                _this.objConnection.query(qry, parameters, function(err, result, fields) {
                    //console.log(`Ejecutando query : ${qry} with result: ${result} with fields: ${fields}`);
                    try {
                        if (err) throw new Error(err);
                        for (var value in result[0]) {
                            let tempItem = new Object();
                            for (var item in fields[0]) {
                                if (_this.tempObj.hasOwnProperty(fields[0][item].name)) {
                                    tempItem[fields[0][item].name] = result[0][value][fields[0][item].name];
                                } else {
                                    Object.assign(tempItem, result[0][value]);
                                }
                            }
                        //Este cambio se agrego pra que no se agreguen registros que no tengan propiedades bug-009
                        if (verifyObject(tempItem))
                            _this.res.push(tempItem);
                        }
                    } catch (e) {
                        resolve(new resultObject(this).withError(e.message));
                    }
                    _this.objConnection.destroy();
                    resolve(new resultObject(_this.res).withResult(_this.res).withNumberOfRows(_this.res.length));
                    return _this.res;
                });
            });

        });
        return await promObj.then(function(res) { return res; }).catch(function(err) {
            throw new Error(err);
        });
    }


    this.QueryExec_Mysql = async function(procedure, parameters) {
        this.bufferLog = "";
        this.res = [];
        try {
            let promObj = new Promise((resolve, reject) => {
                var _this = this;
                this.objConnection = mysql.createConnection(mysqlconfig);
                this.objConnection.connect(function(err) {
                    if (err) throw new Error(err);
                    _this.objConnection.query(procedure, parameters, function(err, result, fields) {
                        try {
                            if (err) throw new Error(err);                          
                            _this.res = result;
                            //console.log("result database: " + _this.res.affectedRows);                            
                            resolve(new resultObject(_this.res).withResult(_this.res).withNumberOfRows(_this.res.affectedRows));

                            //return _this.res;
                        } catch (e) {
                            resolve(new resultObject(this).withError(e.message));
                        }
                    });
                    if (parameters != null) {
                        for (var param in parameters) {
                            _this.bufferLog += parameters[param] + '=' + String.fromCharCode(39) + parameters[param] + String.fromCharCode(39) + String.fromCharCode(32);
                        }
                    }
                    _this.fObject.writeLog("Ejecutando procedimiento.-> " + procedure + " " + _this.bufferLog);
                });

            });
            return await promObj.then(function(res) { return res; }).catch(function(err) {
                throw new Error(err);
            });
        } catch (e) {
            let resItem = new resultObject(e.message);
        }
    }
});

module.exports = dbObject;
