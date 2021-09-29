const router = require('express').Router();
const loginCtrl = require('../controllers/UserController');
const productCtrl = require('../controllers/ProductsControllers/ProductController');

router.post('/login', loginCtrl.login);
router.post('/logoff', loginCtrl.logoff);
router.get('/login', loginCtrl.signup);
router.post('/permissions', loginCtrl.permissions);
router.post('/options', loginCtrl.options);


module.exports = router;