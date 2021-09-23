const router = require('express').Router(); 
const productCtrl = require('../controllers/ProductsControllers/ProductController');
const userController = require('../controllers/UserController');

router.get('/products', 
        userController.isLogged,
        productCtrl.list)

router.get('/products/:codigo',
        userController.isLogged,
        productCtrl.find);

router.post('/products/add', 
        userController.isLogged,
        productCtrl.create);

router.post('/products/delete', 
        userController.isLogged,
        productCtrl.destroy);

        
module.exports = router; 