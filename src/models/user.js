const ModelInstance = require('../libs/model');
const bcrypt = require('bcryptjs');

const userInstance = (function() {
    this.IM_PASSWORD = null;
    this.IM_PALABRA = null;
    this.CLVPOS = null;
    this.CL_EMPLEADO = null;
    this.SN_ACTIVO = null;
    this.NU_PREGUNTA = null;
    this.username = null;
    this.password = null;
    this.error = null;
});

const user = (function() {
    this.model = new ModelInstance();
    this.get = async function(procedure, parameters) {
        try {
            return await this.model.executeMYSQL(procedure, new userInstance(), parameters);
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

    this.verifyPassword = async function(password, user) {
    
        return bcrypt.compareSync(password, user.password)
        
    }

});



module.exports = user;