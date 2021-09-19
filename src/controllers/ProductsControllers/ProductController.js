
const Product = require('../models/product');
const messages = require('../../helpers/messages');
const { response } = require('express');

async function list(req,res){
    const product = new Product();
    try{
        let product = await new Product.get("QuerySelect_AllProduct");
        if (product.result !== null && product.result !== undefined){
            if (product.result.hasOwnProperty("result")){
                res.status(200).json(product.result);                                    
            }
            throw new Error(messages.err_product_not_found);
        }
    } catch (e){
        res.status(500).json(e);
    }

}
async function destroy(req,res){
    const product = new Product(); 
    let parameters = [req.body.cCodigo]; 
    try{
        if (parameters instanceof Array){
            let product = await new Product.delete("QueryDelete_product", parameters);
            if (product != null){
                if (product.hasOwnProperty("numberOfRowsAffected")){
                    res.status(200).json(product);
                }
                throw new Error(messages.err_product_not_found);
            }
        }
    }catch(e){
        res.status(500).json(e);
    }
}
async function create(req, res){
    const product = new Product();
    let parameters = [rq.body.cCodigo, req.body.cDescripcion, req.body.cCategoria, 
        req.body.cSubcategoria, req.body.dPrecioActual, req.body.dPrecioNormal,
        req.body.cTipoPrecio, req.body.cEstado, req.body.iTipoObjeto];                              
    try {
        if (parameters instanceof Array){
            let register = await  new Product.create("QueryInsert_product(?,?,?,?,?,?,?,?,?", parameters);
            if (register != null && register != undefined){
                if (register.hasOwnProperty("numberOfRows")){
                    return res.status(200).json({product: product});
                }   
                throw new Error(messages.err_product_add);
            }
        }
    }catch(e){
        res.status(500).json(e);
    }
}

module.exports = { create,destroy,list };