const router = require('express').Router();
const invCtrl = require('../controllers/InventoryControllers/MainInventoryController');
const userController = require('../controllers/UserController');

router.get('/Inventory', 
            userController.isLogged,
            invCtrl.View);
//router.get('/Inventory/view', invCtrl.View);
router.get('/Inventory/:codigo', 
            userController.isLogged,
            invCtrl.find);
router.post('/Inventory/add', 
            userController.isLogged,
            invCtrl.InventoryRegister);

router.post('/Inventory/delete', 
            userController.isLogged,
            invCtrl.InventoryDelete);


module.exports = router;