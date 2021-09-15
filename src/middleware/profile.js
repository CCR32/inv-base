const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


const fileObject = (function() {
    this.writeLog = function(string) {
        try {
            let file_name = "mns_sys_route.log";
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



const logger = async function(req, res, next) {
    this.fObject = new fileObject();
    if (req.path.indexOf('login') != -1) {
        console.log('La ruta requeriere autorizacion');
        if (req.headers.authorization !== undefined) {
            console.log(`Existe permiso de autorizacion: ${req.headers.authorization}`);
            const token = await jwt.sign({ username: req.body.username }, process.env.SECRET);
            try {
                if (jwt.verify(token, process.env.SECRET)) {
                    console.log('Pasa verifificación');
                    next();
                }
            } catch (e) {
                console.log(`Ocurrio un error al verficar el token ${e.message}`);
            }
            console.log(token);
        }
    }
    this.fObject.writeLog("\nMostrando ruta: " + req.path);;
    next();
}

module.exports = logger;