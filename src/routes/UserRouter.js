const router = require('express').Router();
const loginCtrl = require('../controllers/UserController');
const productCtrl = require('../controllers/ProductsControllers/ProductController');

router.post('/login', loginCtrl.login);
router.post('/logoff', loginCtrl.logoff);
router.get('/login', loginCtrl.signup);


/*router.get('/products', productCtrl.list)
router.get('/products/:codigo',productCtrl.find);
router.post('/products/add', productCtrl.create);
router.post('/products/delete', productCtrl.destroy);*/

module.exports = router;