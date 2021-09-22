const ModelInstance = require('../../libs/model.js');

const inventoryInstance = (function() {
    this.code = null;
    this.descriptionItem = null;
    this.categoryItem = null;
    this.subcategoryItem = null;
    this.stockTotalItem = null;
    this.existTotalItem = null;
    this.statusItem = null;
    this.created_date = null;
    this.created_time = null;
});

const Inventory = (function() {
    this.model = new ModelInstance();

    this.delete = async function(procedure, parameters) {
        try {
            return await this.model.RQuery(procedure, parameters);
        } catch (err) {
            throw new Error(err);
        }
    }
    this.get = async function(procedure, parameters) {
        try {
            return await this.model.executeMYSQL(procedure, new inventoryInstance());
        } catch (err) {
            throw new Error(err);
        }
    }
    this.create = async function(procedure, parameters) {
        try {
            return await this.model.RQuery(procedure, parameters);
        } catch (err) {
            throw new Error(err);
        }
    }

    this.find = async function(procedure, parameters) {
        try {
            return await this.model.executeMYSQL(procedure, new inventoryInstance(),parameters);
        } catch (err) {
            throw new Error(err);
        }

    }

});


module.exports = Inventory;