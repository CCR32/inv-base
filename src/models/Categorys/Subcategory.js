const ModelInstance = require('../../libs/model');

const subcategoryInstance = (function() {
    this.subcategoryCode = null;
    this.subcategoryName = null;
    this.subcategoryShortdescription = null;
    this.subcategoryLongdescription = null;
    this.subcategoryStatus = null;
    this.itemsInsubCategory = null;
    this.created_date = null;
    this.created_time = null;
});

const subCategory = (function() {
    this.model = new ModelInstance();

    this.get = async function(procedure, parameters) {
        try {
            return await this.model.executeMYSQL(procedure, new subcategoryInstance());
        } catch (err) {
            throw new Error(err);
        }
    }
    this.delete = async function(procedure, parameters) {
        try {
            return this.model.RQuery(procedure, parameters);
        } catch (err) {
            throw new Error(err);
        }
    }

    this.create = async function(procedure, parameters) {
        try {
            console.log("Ejecutando creacion");
            return this.model.RQuery(procedure, parameters);
        } catch (err) {
            throw new Error(err);
        }
    }

    this.find  = async function(procedure, parameters) {
        try {
            return await this.model.executeMYSQL(procedure, new subcategoryInstance(), parameters);
        } catch (err) {
            throw new Error(err);
        }
    }
});

module.exports = subCategory;