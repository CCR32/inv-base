const router = require('express').Router();
const loginCtrl = require('../controllers/UserController');
const productCtrl = require('../controllers/ProductsControllers/ProductController');

router.post('/login', loginCtrl.login);
router.post('/logoff', loginCtrl.logoff);
router.get('/logoff', loginCtrl.logoff);
router.get('/login', loginCtrl.signup);
router.post('/permissions', loginCtrl.permissions);
router.post('/options', loginCtrl.options);
router.get('/dashboard',loginCtrl.isLogged, loginCtrl.dashboard);
router.post('/vreports',loginCtrl.isLogged,  loginCtrl.vreports);
router.post('/vindicators', loginCtrl.isLogged, loginCtrl.vindicators);
router.post('/vdashboard', loginCtrl.isLogged, loginCtrl.vdashboard);
router.post('/destroy', loginCtrl.isLogged, loginCtrl.DestroyProfile);
router.post('/update', loginCtrl.isLogged, loginCtrl.UpdateProfile)
router.get('/profile', loginCtrl.isLogged, loginCtrl.profile);
router.get('/users/add', loginCtrl.isLogged, loginCtrl.register);
router.get('/users', loginCtrl.isLogged, loginCtrl.users); 
router.post('/users/add', loginCtrl.isLogged, loginCtrl.create);
router.post('/users/find', loginCtrl.isLogged, loginCtrl.find);



module.exports = router;