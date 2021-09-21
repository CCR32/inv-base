
const Product = require('../../models/product');
const messages = require('../../helpers/messages');


async function find(req,res){
    const product = new Product();
    try{
        let parameters = [req.body.upc];
        let product = await new product.find("QuerySelect_Product",parameters);
        if (product.result !== null && product.result !== undefined){
            if (product.result.hasOwnProperty("result")){
                res.status(200).json(product.result);                                    
            }
            throw new Error(messages.err_product_not_found);
        }
    } catch (e) {
        res.status(500).json(e);
    }
}

async function list(req,res){
    const product = new Product();
    console.log('Dentro de list');
    try{
        let result = await product.get("call QuerySelect_AllProduct;");
        if (result.result !== null && product.result !== undefined){
            if (result.result.hasOwnProperty("result")){
                res.status(200).json(result.result);                                    
            }
            throw new Error(messages.err_product_not_found);
        }
    } catch (e){
        console.log('Ocurrio un error:' + e.message);
        res.status(500).json({e});
    }
}
async function destroy(req,res){
    console.log('Dentro de products destroy');
    const product = new Product(); 
    let parameters = [req.body.cCodigo]; 
    try{
        if (parameters instanceof Array){
            let result = await  product.delete("call QueryDelete_product(?)", parameters);
            if (result != null){
                console.log(result);
                if (result.hasOwnProperty("numberOfResult")){
                    res.status(200).json(result);
                }
                throw new Error(messages.err_product_not_found);
            }
        }
    }catch(e){
        console.log(e);
        res.status(500).json(e);
    }
}


async function create(req,res){
    console.log('Dentro de products create');
    const product = new Product();     
    let parameters = [rq.body.cCodigo, req.body.cDescripcion, req.body.cCategoria, 
        req.body.cSubcategoria, req.body.dPrecioActual, req.body.dPrecioNormal,
        req.body.cTipoPrecio, req.body.cEstado, req.body.iTipoObjeto];                              
        console.log(parameters);
    try{
        if (parameters instanceof Array){            
            let result = await  new product.create("call QueryInsert_product(?,?,?,?,?,?,?,?,?)", parameters);
            if (result != null){
                console.log(result);
                if (result.hasOwnProperty("numberOfResult")){
                    res.status(200).json(result);
                }
                throw new Error(messages.err_product_not_found);
            }
        }
    }catch(e){
        console.log(e);
        res.status(500).json(e);
    }
}
module.exports = { create,destroy,list,find};