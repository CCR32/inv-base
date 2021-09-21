const router = require('express').Router(); 
const productCtrl = require('../controllers/ProductsControllers/ProductController');


router.get('/products', productCtrl.list)
router.get('/products/:codigo',productCtrl.find);
router.post('/products/add', productCtrl.create);
router.post('/products/delete', productCtrl.destroy);

module.exports = router; 