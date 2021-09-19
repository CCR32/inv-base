const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStategy({
        usernameField: 'username',
        passwordField: 'password'
    },

    async(username, password, done) => {
        try {
            console.log('Entra en passport');
            const user = new User();
            let parameters = [username];
            let result = await user.get("call QuerySelect_User(?)", parameters);                         
            if (result.result !== null && result.result !== undefined) {
                user.password = result.result[0].contrasena;
                if (await user.verifyPassword(password, user)){
                    return done(null, result.result);
                }
            }
        } catch (error) {
            console.log("Error dentro de passport:" + error);
            return done(null, false, {
                message: 'Usuario o contraseña invalido'
            })
        }
    }
));

// Serializar
passport.serializeUser((username, callback) => {
    callback(null, username);
});
//Deserializar
passport.deserializeUser((username, callback) => {
    callback(null, username);
});


module.exports = passport;