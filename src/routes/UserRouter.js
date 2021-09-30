const router = require('express').Router();
const loginCtrl = require('../controllers/UserController');
const productCtrl = require('../controllers/ProductsControllers/ProductController');

router.post('/login', loginCtrl.login);
router.post('/logoff', loginCtrl.logoff);
router.get('/login', loginCtrl.signup);
router.post('/permissions', loginCtrl.permissions);
router.post('/options', loginCtrl.options);
router.get('/dashboard',loginCtrl.isLogged, loginCtrl.dashboard);
router.post('/vreports',loginCtrl.isLogged,  loginCtrl.vreports);
router.post('/vindicators', loginCtrl.isLogged, loginCtrl.vindicators);
router.post('/vdashboard', loginCtrl.isLogged, loginCtrl.vdashboard);


module.exports = router;