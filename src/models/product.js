const modelInstance = require('../libs/model');


const productInstance = (function() {
    this.Codigo = null;
    this.Descripcion = null;
    this.Nombre = null;
    this.IdProducto = null;
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
});


module.exports = product;