const ModelInstance = require('../../libs/model');

const categoryInstance = (function() {
    this.categoryCode = null;
    this.categoryName = null;
    this.categoryShortdescription = null;
    this.categoryLongdescription = null;
    this.categoryStatus = null;
    this.itemsInCategory = null;
    this.created_date = null;
    this.created_time = null;
});

const Category = (function() {
    this.model = new ModelInstance();

    this.get = async function(procedure, parameters) {
        try {
            return await this.model.executeMYSQL(procedure, new categoryInstance());
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
            return await this.model.executeMYSQL(procedure, new categoryInstance(), parameters);
        } catch (err) {
            throw new Error(err);
        }
    }
});

module.exports = Category;