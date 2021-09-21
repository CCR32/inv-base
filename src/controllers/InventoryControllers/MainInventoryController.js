const Inventory = require('../../models/Inventory/Inventory');
const messages = require('../../helpers/messages');


/*Registrar o actualizar nuevo artículo */
async function InventoryRegister(req, res) {    
    const inventory = new Inventory();     
    let parameters = [req.body.cSucursal, req.body.cCode, req.body.dExistencia, req.body.dStock];                                      
    try{
        if (parameters instanceof Array){            
            let result = await  inventory.create("call QueryInsert_Inventory(?,?,?,?)", parameters);            
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

/* Eliminar artículo */
async function InventoryDelete(req, res) {
    const inventory = new Inventory();     
    let parameters = [req.body.cCode];                                      
    try{
        if (parameters instanceof Array){            
            let result = await  inventory.create("call QueryDelete_Inventory(?,?,?,?)", parameters);            
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

/* Lista artícullos (api) */
async function list(req, res) {
    let inventory = new Inventory();   
    try{
        let result = await inventory.get("call QuerySelect_Inventory");
        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0)
                    throw new Error(messages.err_inv_not_found);    
                res.status(200).json(result.result);                                    
            } else {
                throw new Error(messages.err_inv_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}


/// Controlador de las vistas 
async function View(req, res) {
    let inventory = new Inventory();   
    try{
        let result = await inventory.get("call QuerySelect_Inventory");
        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0)
                    throw new Error(messages.err_inv_not_found);                                         
                res.render('Inventory/list',{result});
            } else {
                throw new Error(messages.err_inv_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}


async function find(req, res) {
    let inventory = new Inventory();   
    let parameters = [req.parameters.codigo];
    try{
        let result = await inventory.find("call QuerySelect_InventoryItem", parameters);
        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0)
                    throw new Error(messages.err_inv_not_found);    
                res.status(200).json(result.result);                                    
            } else {
                throw new Error(messages.err_inv_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}

module.exports = { InventoryRegister, InventoryDelete, list, View,find};