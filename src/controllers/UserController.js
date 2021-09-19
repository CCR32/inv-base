
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');



async function login(req, res, next) {
    let tempuser = new User();
    try {
        passport.authenticate('local', {
            successRedirect: '/app/Inventory/list',
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
    res.render('login/login');
}

const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('is auth');
        return next();
    }
    return res.redirect('/login');
}
module.exports = { login, logoff, isLogged, signup };
