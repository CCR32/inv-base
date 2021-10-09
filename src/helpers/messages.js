const appModel = require('../libs/model'); 

var app_procedures =(function(){
    this.model = new appModel();
    this.procs = [];
    this.loadProcedures = async function(req, res){
        if (this.procs.length == 0){
            let parameters= ["app-inventarios","",""];
            let result  = await this.model.executeMYSQL("call QuerySelect_appMethods(?,?,?)", new Object(), parameters);
            if (result != null){
                if (result.hasOwnProperty("numberOfResult")){                       
                    this.procs = result.result;                                        
                }
            }
        }
        
    }

    this.getProcedureByText =  function(procedureText,
                                        controller, 
                                        methodtye, 
                                        defaultText){        
        if (this.procs != null){
            if(this.procs.length>0){
                for(var i in this.procs){
                    if (this.procs[i].hasOwnProperty("app_exec_text")){                        
                        if (this.procs[i].app_exec_text == procedureText &&
                            this.procs[i].app_request_method == methodtye && 
                            this.procs[i].app_option == controller)                         
                            return this.procs[i].app_exec_text;
                    }
                }
            }
        }
        return defaultText;
    }
});
var app_messages = (function(){
    this.model = new appModel();     
    this.msgs =[];
    
    this.getMessage = async function(appName, messageIdentifier, defaultMessage){        
        let parameters = [appName, messageIdentifier]
        try{
            let result = await this.model.executeMYSQL("call QuerySelect_appMessages(?,?)",new Object(), parameters);                                        
            if (result != null){
                if (result.hasOwnProperty("numberOfResult")){                       
                    if (messageIdentifier.length == 0 )
                    {           
                        return result.result;
                    }
                    return result.result[0];
                }
            }             
        }catch(e){
            return defaultMessage;
        }
        return defaultMessage; 
    }
    this.loadMessages = async function(){
        if (this.msgs.length == 0){
            this.msgs = await this.getMessage("app-inventarios", "", "default_message");
        }
    }    

    this.getMessageByText =  function(messageText,defaultText){                   
        if (this.msgs != null){
            if (this.msgs.length>0){
                for(var item in this.msgs){
                    if (this.msgs[item].hasOwnProperty("app_message_text")){
                        if (this.msgs[item].app_message_identifier == messageText)
                            return this.msgs[item].app_message_text;
                    }
                }
            }
        }
        return defaultText;
    }
    
});




const   messages = {    
    /* Mensajes para productos */
    err_product_add: "Error al agregar producto",
    err_product_not_found: "Producto no encontrado",
    /* Mensajes para usuarios*/
    err_user_not_found:  "Usuario no encontrado",
    err_user_invalid:   "Usuario no encontrado",

    /*Mensajes para invnentario*/
    err_inv_not_found: "Articulo no se encuentra en inventario", 
    err_inv_add : "Error al agregar artículo a inventario",

    /*Mensajes para categorias*/
    err_cat_not_found: "Categoria no se encuentra en listado de categorias", 
    err_cat_add: "Error al agregar categoria",

    err_perm_not_found:"Permisos no definidos para este usuario"

};
module.exports = {messages, app_messages, app_procedures};