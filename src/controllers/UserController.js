
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');



async function permissions(req, res){
    const user = new User();    
    if (req.isAuthenticated()){
        let parameters = [req.user.username];
        try{
            let result = await User.find("call QrySelect_UserPerm(?)", parameters);        
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
