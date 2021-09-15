const ModelInstance = require('../libs/model');

const emailInstance = (function() {
    this.distrito = null;
    this.alias = null;
    this.email_completo = null;
    this.nombre_completo = null;
    this.activo = null;
});

const email = (function() {
    this.model = new ModelInstance();

    this.get = async function(procedure, parameters) {
        try {
            return await this.model.get(procedure, new emailInstance(), parameters);
        } catch (err) {
            throw new Error(err);
        }
    }

    this.create = async function(procedure, parameters) {
        try {
            return await this.model.create(procedure, parameters);
        } catch (err) {
            throw new Error(err);
        }   
    }

    this.delete = async function(procedure, parameters) {
        try {
            return this.model.delete(procedure, parameters);
        } catch (err) {
            throw new Error(err);
        }
    }

    this.update = async function(procedure, parameters) {
        try {
            return this.model.delete(procedure, parameters);
        } catch (err) {
            throw new Error(err);
        }
    }

});



module.exports = email;