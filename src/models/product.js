const modelInstance = require('../libs/model');


const productInstance = (function() {
    this.codigo = null;
    this.descripcion = null;
    this.categoria = null;
    this.subcategoria = null;
    this.precioActual = null;
    this.precioNormal = null;
    this.tipoPrecio = null; 
    this.estado = null; 
    this.tipoObjeto = null; 
    this.fecha_creacion = null; 
    this.modificado = null; 
});

const product = (function() {
    this.model = new modelInstance();

    this.get = async function(query) {
        try {
            return await this.model.executeMYSQL(query, new productInstance());
        } catch (e) {
            throw new Error(e);
        }
    }
    this.find = async function(query, parameters){
        try{
            return await this.model.executeMYSQL(query, new productInstance(), parameters);
        }catch(e){
            throw new Error(e);
        }
    }
    this.create = async function(query,parameters) {
        try {
            return await this.model.RQuery(query, parameters);
        } catch (e) {
            throw new Error(e);
        }
    }
    this.delete = async function(query,parameters) {
        try {
            return await this.model.RQuery(query, parameters);
        } catch (e) {
            throw new Error(e);
        }
    }
});


module.exports = product;