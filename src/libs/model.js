const dbObject = require('../config/Database');


const model = (function() {
    this.executeMYSQL = async function(query, obj, parameters) {
        this.dbObject = new dbObject();
        if (parameters !== null) {
            return await this.dbObject.QuerySelect_MYSQL(query, obj, parameters);
        } else {
            return await this.dbObject.QuerySelect_MYSQL(query, obj);
        }
    }
    this.RQuery = async function(query, obj) {
        this.dbObject = new dbObject();
        return await this.dbObject.QueryExec_Mysql(query, obj);
    }

});


module.exports = model;