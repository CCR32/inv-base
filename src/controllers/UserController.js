
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const messages = require('../helpers/messages');
const {msg} = require('../config/passport');




Array.prototype.search = function(item){
    let quantity =0;
    for(var i in this){
      if (this[i] == item){
        quantity++;
      }
    }
    return quantity;
  }


function createComponentOptions(json){
    
    let htmlItem = "";    
    let header =    `<div class="wrapper-search search-hidden">   
                        <div class="search-header">
                            <div class="menu-path">
                                <span class="menu-url">Ubicacion actual: @@url</span>
                            </div>
                            <div class="close-finder">
                                <img class="close-x-finder" src="/public/img/close.png" alt="">
                            </div>
                        </div>                   
                    </div>`;    
    if (json instanceof Object){
        for(var item in json){
            
            if(json[item] != null && json[item]!= undefined){
                if (json[item].url == undefined || json[item].url == undefined ) break;
                let data = `<div class="option-found">
                                <span class='s-link' data=${json[item].url}>${json[item].descripcion}</span>
                            </div>`;
                htmlItem+= data;
            }
        }
        console.log('wrapper:' + header + htmlItem);
        return header + htmlItem;
    }
}
function createComponent(json){
    let headers = [];
    let htmlItem = "";     
    if (json instanceof Object){   
        try{     
            for(var item in json){                            
                //if (headers.filter((temp)=>
                //{return temp.cvemodulo == json[item].cvemodulo}).length == 0){                                                                                           
                    if (json[item] != undefined && json[item] != null){
                        if (json[item].cvemodulo == null || json[item].cvemodulo == undefined)
                            continue;
                        let parent = 
                        `<div class="menu-item" target="${json[item].cvemodulo}">
                            <span class="item" target="${json[item].cvemodulo}">${json[item].modulo}</span>                        
                            <div class="container-image">
                                <!--<img src="/public/img/down.png" class="image-item"></img> -->
                                <span class='menu-p-arrow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                                    </svg>
                                </span>
                            </div>                    
                        </div>`;
                                          
                        let child = 
                        `<div class="child menu-item-c child-closed" data=${json[item].nombre} target=${json[item].cvemodulo}>
                            <span class="child item-c">${json[item].nombre}</span>                                            
                        </div>`;                                       
                        if (headers.search(json[item].cvemodulo)==0){
                            htmlItem +=  parent + child;
                        } else {
                            htmlItem+= child;                                                                
                        }
                        headers.push(json[item].cvemodulo);      
                    }                                        
                //}
            }            
            return htmlItem;            
        }catch(e){
            console.log(e.message);
        }        
    }
}

function createComponentDashboard(json){                    
    let htmlItem = "";    
    if(json instanceof Object){
        try{
            for(var item in json){     
                console.log(item);                           
                if (json[item] != undefined && json[item] != null){                
                    if (json[item].folio == null||json[item].folio == undefined) break;
                    let table = 
                    `<tr>
                        <td>${json[item].folio}</td>
                        <td>${json[item].origencve}</td>
                        <td>${json[item].desorigen}</td>
                        <td>$${json[item].importe}</td>
                        <td><a href="#" data=dddd class="alert">Ver</a></td>
                    </tr>`;                 
                    htmlItem+= table;         
                }
            }
        }catch(e){
            console.log(e.message);
        }
    }
    return htmlItem;
}

function createComponentReports(json){
    let htmlItem = "";
    console.log(json[0].nombre);
    console.log(json[0].cvemodulo);
    if(json instanceof Object){
        try{
            for(var item in json){     
                console.log(item);                           
                if (json[item] != undefined && json[item] != null){                
                    if (json[item].cvemodulo == null||json[item].cvemodulo == undefined) break;
                    let table = 
                    `<tr>
                        <td>${json[item].cvemodulo}</td>
                        <td>${json[item].nombre}</td>
                        <td><a href="#" data=dddd class="alert">Ver</a></td>
                    </tr>`;                 
                    htmlItem+= table;         
                }
            }
        }catch(e){
            console.log(e.message);
        }
    }

    return htmlItem;

}

function createComponentIndicators(json){    
    if (json instanceof Object){
        if (json != undefined && json != null){
        if (json[0].prod == null|| json[0].prod == undefined) return; 
        let html =`<div class="c-item-ind">
                        <h4>Articulos</h4>
                        <span>${json[0].prod}</span>
                    </div>
                    <div class="c-item-ind">
                        <h4>Categorias</h4>
                        <span>${json[0].cat}</span>
                    </div>
                    <div class="c-item-ind">
                        <h4>Subcategorias</h4>
                        <span>${json[0].subcat}</span>
                    </div>
                    `;
                
            return html;
        }
        return "";
    }

}


async function create(req, res) {
    const user = new User();     
    let parameters = ["", req.body.name, 
    req.body.lastname,req.body.lastname,
    req.body.username,
    bcrypt.hashSync(req.body.pwd, 10), 
    req.body.user_type,"A", req.user[0].usrinterno];                                      
    console.log("Objetos: " + parameters);
    if (req.isAuthenticated()){        
        if (req.user[0].usrinterno != undefined){
        try{
            if (parameters instanceof Array){            
                let result = await  user.update("call QueryRegister_User(?,?,?,?,?,?,?,?,?)", parameters);            
                if (result != null){                
                    if (result.hasOwnProperty("numberOfResult")){                    
                        //res.status(200).json({username: req.user, message:"user_updated"});
                        res.redirect('../users');
                    } else {
                        throw new Error(messages.err_perm_not_found);
                    }
                }
            }
            }catch(e){        
                res.status(404).json({"error":e.message});
            }    
        }
    }
}



// Este es solo para actualizar el registro 
async function UpdateProfile(req, res) {
    const user = new User();     
    let parameters = ["", req.body.name, 
    req.body.lastname,req.body.lastname,
    req.body.username,
    bcrypt.hashSync(req.body.pwd, 10), 
    req.body.user_type,"A", "owner"];                                      

    if (req.isAuthenticated()){        
        if (req.user[0].usrinterno != undefined){
        try{
            if (parameters instanceof Array){            
                let result = await  user.update("call QueryRegister_User(?,?,?,?,?,?,?,?,?)", parameters);            
                if (result != null){                
                    if (result.hasOwnProperty("numberOfResult")){                    
                        //res.status(200).json({username: req.user, message:"user_updated"});
                        res.redirect('/logoff');
                    } else {
                        throw new Error(messages.err_perm_not_found);
                    }
                }
            }
            }catch(e){        
                res.status(404).json({"error":e.message});
            }    
        }
    }
}


async function DestroyProfile(req, res) {
    const user = new User();     
    let parameters = [req.username];                                      
    if (req.isAuthenticated()){        
        if (req.user[0].usrinterno != undefined){
        try{
            if (parameters instanceof Array){            
                let result = await  user.delete("call QueryDelete_User(?)", parameters);            
                if (result != null){                
                    if (result.hasOwnProperty("numberOfResult")){                    
                        if (req.isAuthenticated()) {
                            req.session.destroy(() => {
                                res.redirect('/login');
                            });
                        }
                    } else {
                        throw new Error(messages.err_user_invalid);
                    }
                }
            }
            }catch(e){        
                res.status(404).json({"error":e.message});
            }    
        }
    }
}


async function destroy(req, res) {
    const user = new User();     
    let parameters = [req.body.username];                                          
    if (req.isAuthenticated()){        
        if (req.user[0].usrinterno != undefined){
        try{
            if (parameters instanceof Object){            
                let result = await  user.delete("call QueryDelete_User(?)", parameters);            
                if (result != null){                
                    if (result.hasOwnProperty("numberOfResult")){                    
                        if (req.isAuthenticated()) {
                            res.redirect('../users');
                        }
                    } else {
                        throw new Error(messages.err_user_invalid);
                    }
                }
            }
            }catch(e){        
                res.status(404).json({"error":e.message});
            }    
        }
    }
}


async function profile(req,res){
    res.render('login/profile', {username:req.user[0]});
}
async function vdashboard(req, res){
    let user = new User();        
    if (req.isAuthenticated()){
        if (req.user[0].usrinterno == undefined)        
            throw new Error("user_error");
        let parameters = [req.user[0].usrinterno, req.body.cData];  
        console.log('with parameters:' + parameters);          
        try{
            let result = await user.get("call QrySelect_Dashboard");                    
            if (result.result !== null && result.result !== undefined){            
                if (result.hasOwnProperty("result")){
                    if (result.result.length == 0)
                        throw new Error(messages.err_perm_not_found);    
                     res.status(200).json(createComponentDashboard(result.result));                      
                } else {
                    throw new Error(messages.err_perm_not_found);
                }
            }
        } catch (e){        
            res.status(404).json({"error":e.message});
        }
    }
}
async function vreports(req, res){
    let user = new User();        
    if (req.isAuthenticated()){
        if (req.user[0].usrinterno == undefined)        
            throw new Error("user_error");
        let parameters = [req.user[0].usrinterno, req.body.cData];  
        console.log('with parameters:' + parameters);          
        try{
            let result = await user.get("call QrySelect_Reports(?,?)", parameters);                    
            if (result.result !== null && result.result !== undefined){            
                if (result.hasOwnProperty("result")){
                    if (result.result.length == 0)
                        throw new Error(messages.err_perm_not_found);    
                     res.status(200).json(createComponentReports(result.result));                      
                } else {
                    throw new Error(messages.err_perm_not_found);
                }
            }
        } catch (e){        
            res.status(404).json({"error":e.message});
        }
    }
}
async function vindicators(req, res){
    let user = new User();        
    if (req.isAuthenticated()){
        if (req.user[0].usrinterno == undefined)        
            throw new Error("user_error");
        let parameters = [req.user[0].usrinterno, req.body.cData];  
        console.log('with parameters:' + parameters);          
        try{
            let result = await user.get("call QrySelect_Indicators", parameters);                    
            if (result.result !== null && result.result !== undefined){            
                if (result.hasOwnProperty("result")){
                    if (result.result.length == 0)
                        throw new Error(messages.err_perm_not_found);    
                     res.status(200).json(createComponentIndicators(result.result));                      
                } else {
                    throw new Error(messages.err_perm_not_found);
                }
            }
        } catch (e){        
            res.status(404).json({"error":e.message});
        }
    }
}

async function register(req,res){
    res.render('login/register',{ username:req.user[0]});
}
async function dashboard(req, res){    
    res.render('Dashboard/index',{ username:req.user[0]});
    
}

async function options(req, res){
    let user = new User();        
    if (req.isAuthenticated()){
        if (req.user[0].usrinterno == undefined)        
            throw new Error("user_error");
        let parameters = [req.user[0].usrinterno, req.body.cData];  
        console.log('with parameters:' + parameters);          
        try{
            let result = await user.get("call QrySelect_OptionsXModule(?,?)", parameters);                    
            if (result.result !== null && result.result !== undefined){            
                if (result.hasOwnProperty("result")){
                    if (result.result.length == 0)
                        throw new Error(messages.err_perm_not_found);    
                     res.status(200).json(createComponentOptions(result.result));                      
                } else {
                    throw new Error(messages.err_perm_not_found);
                }
            }
        } catch (e){        
            res.status(404).json({"error":e.message});
        }
    }
}

async function permissions(req, res){
    let user = new User();        
    if (req.isAuthenticated()){
        if (req.user[0].usrinterno == undefined)        
            throw new Error("user_error");
        let parameters = [req.user[0].usrinterno];            
        try{
            let result = await user.get("call QrySelect_UserPerm(?)", parameters);                    
            if (result.result !== null && result.result !== undefined){            
                if (result.hasOwnProperty("result")){
                    if (result.result.length == 0)
                        throw new Error(messages.err_perm_not_found);    
                     res.status(200).json(createComponent(result.result));                      
                } else {
                    throw new Error(messages.err_perm_not_found);
                }
            }
        } catch (e){        
            res.status(404).json({"error":e.message});
        }
    }
}




async function find(req, res){
    let user = new User();        
    if (req.isAuthenticated()){
      if (req.user[0].usrinterno == undefined)        
         throw new Error("user_error");
        let parameters = [req.body.username];            
        try{
            let result = await user.get("call QuerySelect_User(?)", parameters);                    
            if (result.result !== null && result.result !== undefined){            
                if (result.hasOwnProperty("result")){
                    if (result.result.length == 0)
                        throw new Error(messages.err_perm_not_found); 
                        res.status(200).json(result.result);                     
                } else {
                    throw new Error(messages.err_perm_not_found);
                }
            }
        } catch (e){        
            res.status(404).json({"error":e.message});
        }
    }
}



async function users(req, res){
    let user = new User();        
    if (req.isAuthenticated()){
        if (req.user[0].usrinterno == undefined)        
            throw new Error("user_error");
        let parameters = [req.user[0].usrinterno];            
        try{
            let result = await user.get("call QuerySelectAll_Users", parameters);                    
            if (result.result !== null && result.result !== undefined){            
                if (result.hasOwnProperty("result")){
                    if (result.result.length == 0)
                        throw new Error(messages.err_perm_not_found);    
                     res.render('login/users', {username:req.user[0], items:result.result});
                } else {
                    throw new Error(messages.err_perm_not_found);
                }
            }
        } catch (e){        
            res.status(404).json({"error":e.message});
        }
    }
}


async function login(req, res, next) {
    let tempuser = new User();
        
    try {
        passport.authenticate('local', {
            successRedirect: '/Dashboard',
            failureRedirect: '/error'
        })(req, res, next);
    } catch (err) {
        res.status(500).json({ error:msg.getMessageByText("user_not_found", "Usuario o contraseña no encontrados")});
    }
}

//  User loggoff
async function logoff(req, res) {
    if (req.isAuthenticated()) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
}

async function signup(req, res){
    /*const password = bcrypt.hashSync("pwd0CCAdmin", 10);
    console.log('pwd:' + password);*/
    res.render('login/login', {AppName:'Nombre Aplicacion'});
}

const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {        
        return next();
    }
    res.redirect('/login');
}
const isLoggedApi = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.status(200).json({error:"Loggin is required"});
}
module.exports = { login, logoff, isLogged, signup, isLoggedApi, permissions,options, dashboard, vreports, vindicators, vdashboard, profile,DestroyProfile, UpdateProfile, register,create, users, find, destroy};
