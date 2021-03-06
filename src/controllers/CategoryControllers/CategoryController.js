const Category = require('../../models/Categorys/Category');
const messages = require('../../helpers/messages');



async function ViewRegister(req,res){
    res.render('Category/add',{ username:req.user[0]});
}

async function CategoryRegister(req, res) {
    const category = new Category();     
    let parameters = [req.body.cCodigo, req.body.cNombreCategoria, req.body.cDescripcionCategoria,
                     req.body.cDescripcionLarga];                                      
    try{
        if (parameters instanceof Array){            
            //let result = await  category.create("call QueryInsert_Category(?,?,?,?)", parameters);            
            let result = await  category.create("call " + res.locals.appproc.getProcedureByText("QueryInsert_Category",
                                                                                        "CategoryController-create", 
                                                                                        "POST",
                                                                                        "QueryInsert_Category(?,?,?,?)"), parameters);
            if (result != null){                
                if (result.hasOwnProperty("numberOfResult")){                    
                    res.status(200).json(result);
                } else {
                    throw new Error(messages.err_cat_add);
                }
            }
        }
    }catch(e){        
        res.status(404).json({"error":e.message});
    }    
}

/* eliminar categorias para api */
async function CategoryDelete(req, res) {
    const category = new Category();
    let parameters = [req.body.cCode];                                      
    try{
        if (parameters instanceof Array){            
            //let result = await  category.delete("call QueryDelete_Category(?)", parameters);            

            let result = await  category.delete("call " + res.locals.appproc.getProcedureByText("QueryDelete_Category",
                                                                                        "CategoryController-delete", 
                                                                                        "POST",
                                                                                        "QueryDelete_Category(?)"), parameters);
            if (result != null){                
                if (result.hasOwnProperty("numberOfResult")){                    
                    res.status(200).json(result);
                } else {
                    throw new Error(messages.err_cat_not_found);
                }
            }
        }
    }catch(e){        
        res.status(404).json({"error":e.message});
    }    
}
/* Lista de categorias para api */
async function CategoryList(req, res) {
    console.log('Dentro de categoryView');
        
    let category = new Category();   
    try{
        //let result = await category.get("call QuerySelect_AllCategorys");
        let result = await category.get("CALL " + res.locals.appproc.getProcedureByText("QuerySelect_AllCategorys",
                                                                                        "CategoryController-viewall", 
                                                                                        "GET",
                                                                                        "QuerySelect_AllCategorys"));

        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0){
                    throw new Error(messages.err_cat_not_found);                    
                }                
                res.render('Category/index',{items:result.result, username:req.user[0]});
            } else {
                throw new Error(messages.err_cat_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}

/* Lista de categorias para api */
async function list(req, res) {    
    let category = new Category();   
    try{
        //let result = await category.get("call QuerySelect_AllCategorys");
        let result = await category.get("CALL " + res.locals.appproc.getProcedureByText("QuerySelect_AllCategorys",
                                                                                        "CategoryController-viewall", 
                                                                                        "GET",
                                                                                        "QuerySelect_AllCategorys"));
        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0){
                    throw new Error(messages.err_cat_not_found);                    
                }                
                res.status(200).json({items:result.result});
            } else {
                throw new Error(messages.err_cat_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}

/* Lista de categorias para api */
async function find(req, res) {
    let category = new Category();   
    let parameters = [req.params.code];
    try{
        //let result = await category.find("call QuerySelect_Category(?)", parameters);
        let result = await category.find("CALL " + res.locals.appproc.getProcedureByText("QuerySelect_Category",
                                                                                        "CategoryController-view", 
                                                                                        "GET",
                                                                                        "QuerySelect_Category(?)"),parameters);

        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0)
                    throw new Error(messages.err_cat_not_found);    
                res.status(200).json(result.result);                                    
            } else {
                throw new Error(messages.err_cat_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }
}




module.exports = { CategoryRegister, CategoryDelete,  CategoryList,find, ViewRegister, list};
