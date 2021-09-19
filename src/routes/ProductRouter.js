const router = require('express').Router(); 
const productCtrl = require('../controllers/ProductsControllers/ProductController');

router.get('/Products/:id',productCtrl.find);
router.get('/Products/list', productCtrl.list);

router.post('/Pruducts/add', productCtrl.create);
router.post('/Products/delete', productCtrl.destroy);

module.exports = router; 