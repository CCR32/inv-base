
const Product = require('../../models/product');
const messages = require('../../helpers/messages');



async function destroy(req,res){
    console.log('Dentro de products destroy');
    const product = new Product(); 
    let parameters = [req.body.cCodigo]; 
    try{
        if (parameters instanceof Array){
            //let result = await  product.delete("call QueryDelete_product(?)", parameters);
           let result = await product.delete("call " + res.locals.appproc.getProcedureByText("QryDelete_Product", 
                                                       "ProductController-delete", 
                                                        "POST", 
               "QryDelete_Product(?)")); 
            if (result != null){
                console.log(result);
                if (result.hasOwnProperty("numberOfResult")){
                    res.status(200).json(result);
                }else {
                    throw new Error(messages.err_product_not_found);
                }
            }
        }
    }catch(e){        
        res.status(404).json({"error":e.message});
    }
}


async function create(req,res){
    console.log('Dentro de products create');
    const product = new Product();     
    let parameters = [req.body.cCodigo, req.body.cDescripcion, req.body.cCategoria, 
        req.body.cSubcategoria, req.body.dPrecioActual, req.body.dPrecioNormal,
        req.body.cTipoPrecio, req.body.cEstado, req.body.iTipoObjeto];                              
        console.log(parameters);
    try{
        if (parameters instanceof Array){            
        //    let result = await  product.create("call QueryInsert_product(?,?,?,?,?,?,?,?,?)", parameters);            
            let result = await  producto.create("call" + res.locals.appproc.getProcedureByText("QueryInsert_product", 
                                                                                               "ProductController-create", 
                                                                                                "POST","QueryInsert_Product(?,?,?,?,?,?,?,?)")); 
            if (result != null){  
                if (result.hasOwnProperty("numberOfResult")){                    
                    res.status(200).json(result);
                } else {
                    throw new Error(messages.err_product_not_found);
                }
            }
        }
    }catch(e){        
        res.status(500).json(e);
    }    
}


async function find(req,res){
    const product = new Product();    
    let parameters = [req.params.codigo];
    try{
        //let result = await product.find("call QuerySelect_Products(?)", parameters);        
        let result = await product.find("call " + res.locals.appproc.getProcedureByText("QuerySelect_Product", 
                                                        "ProductController-view", 
                                                        "POST", "QuerySelect_Product(?)")); 

        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0)
                    throw new Error(messages.err_product_not_found);    
                res.status(200).json(result.result);                                    
            } else {
                throw new Error(messages.err_product_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}


async function list(req,res){
    const product = new Product();        
    try{
        let result = await product.get("call QuerySelect_AllProducts");
        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0)
                    throw new Error(messages.err_product_not_found);                    
                res.render('Product/index',{items:result.result,username:req.user[0]});
            } else {
                throw new Error(messages.err_product_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}

module.exports = { create,destroy,find, list};
