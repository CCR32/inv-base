
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');




Array.prototype.search = function(item){
    let quantity =0;
    for(var i in this){
      if (this[i] == item){
        quantity++;
      }
    }
    return quantity;
  }

function createComponent(json){
    let htmlItem = ""; 
    let headers = [];
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
                                <img src="/public/img/down.png" class="image-item"></img>
                            </div>                    
                        </div>`;
                                          
                        let child = 
                        `<div class="child menu-item-c child-closed" target=${json[item].cvemodulo}>
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

async function login(req, res, next) {
    let tempuser = new User();
    try {
        passport.authenticate('local', {
            successRedirect: '/Category',
            failureRedirect: '/error'
        })(req, res, next);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
    const password = bcrypt.hashSync("pwd0CCAdmin", 10);
    console.log(password);
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
module.exports = { login, logoff, isLogged, signup, isLoggedApi, permissions };
