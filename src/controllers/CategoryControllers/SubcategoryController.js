const Subcategory = require('../../models/Categorys/Subcategory');
const Category = require('../../models/Categorys/Category');
const messages = require('../../helpers/messages');




async function SubcategoryCreate(req,res){
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
                res.render('Subcategory/add',{items:result.result,username:req.user[0]});
            } else {
                throw new Error(messages.err_cat_not_found);
            }
        }
    } catch (e){        
        res.status(404).json({"error":e.message});
    }    
}

async function SubcategoryRegister(req, res) {
    //console.log('Entra dentro de register');
    const subcategory = new Subcategory();     
    let parameters = [req.body.csubcat, 
                      req.body.ccatcode,
                      req.body.cname, 
                      req.body.cdes,
                      req.body.clongdes];                                      
    try{
        if (parameters instanceof Array){            
            //let result = await  subcategory.create("call QueryInsert_subCategory(?,?,?,?,?)", parameters);            
            let result = await  subCategory.create("call" + res.locals.appproc.getProcedureByText("QueryInsert_subCategory",
                                                  "SubcategoryController-create", 
                                                  "POST",
                                                  "QueryInsert_subCategory(?,?,?,?,?)"), parameters);
            if (result != null){                
                if (result.hasOwnProperty("numberOfResult")){                                        
                    res.redirect('/Subcategory');
                } else {
                    throw new Error(messages.err_subcat_add);
                }
            }
        }
    }catch(e){        
        res.status(404).json({"error":e.message});
    }    
}

async function SubcategoryDelete(req, res) {
    const subCategory = new Subcategory();
    let parameters = [req.body.cCode];                                      
    try{
        if (parameters instanceof Array){            
            //let result = await  subCategory.delete("call QueryDelete_subCategory(?)", parameters);            
            let result = await  subCategory.delete("call" + res.locals.appproc.getProcedureByText("QueryDelete_subCategory",
                                                  "SubcategoryController-delete", 
                                                  "POST",
                                                  "QueryDelete_subCategory(?)"), parameters);
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
async function SubcategoryView(req,res){
    let subCategory = new Subcategory();
    try{
      let result = await subCategory.get("call QuerySelect_AllSubCategorys");
//       let result = await  subCategory.get("call" + res.locals.appproc.getProcedureByText("QuerySelect_AllSubCategorys",
//                    "SubcategoryController-view", 
//                                                  "POST",
//                                                  "QuerySelect_AllSubCategorys") );
        if (result.result !== null && result.result !== undefined){            
            if (result.hasOwnProperty("result")){
                if (result.result.length == 0)
                    throw new Error(messages.err_cat_not_found);    
                //res.status(200).json(result.result);                                    
                res.render('Subcategory/index', {items:result.result,username:req.user[0]});
            } else {
                throw new Error(messages.err_cat_not_found);
            }
        }
    } catch (e){        
        console.log("Ocurrio un error al obtener elistado de subcategorias" + e); 
        res.status(404).json({"error":e.message});
    }
}
async function SubcategoryList(req, res){
    let subCategory = new Subcategory();
    try{
        //let result = await subCategory.get("call QuerySelect_AllSubCategorys");
        let result = await  subCategory.get("call" + res.locals.appproc.getProcedureByText("QuerySelect_AllSubCategorys",
                                                  "SubcategoryController-view", 
                                                  "POST",
                                                  "QuerySelect_AllSubCategorys"));

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

async function find(req, res){
    let subCategory = new Subcategory();
    let parameters = [req.params.code];
    try{
        //let result = await subCategory.find("call QuerySelect_subCategory(?)", parameters);
        let result = await  subCategory.get("call" + res.locals.appproc.getProcedureByText("QuerySelect_subCategory",
                                                  "SubcategoryController-view", 
                                                  "POST",
                                                  "QuerySelect_subCategory(?)"), parameters);
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

module.exports = { SubcategoryRegister, SubcategoryDelete, SubcategoryView, SubcategoryList, find, SubcategoryCreate };
