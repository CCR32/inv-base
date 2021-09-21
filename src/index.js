const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const app = express(); 
const dotenv = require('dotenv').config();
const session = require('express-session');
const passport = require('./config/passport');
const routerIndex = require('../src/routes/UserRouter');
const routerProudcts = require('../src/routes/ProductRouter');
const routerInventory = require('../src/routes/InventoryRouter');
/*view engine*/
app.engine('handlebars', exphbs({
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'public/views'));
app.use('/public', express.static(path.join(__dirname, 'public')))
/* sessiones */
app.use(session({secret: 'SECRET', resave:false, saveUninitialized:true}));
/*Configurar passport*/
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan({ options: "default" }));

app.use(routerIndex);
app.use(routerProudcts);
app.use(routerInventory);


/// Inicializar servidor 
app.listen(process.env.PORT || 3000, () => { console.log(process.env.PORT); });