const router = require('express').Router();
const invCtrl = require('../controllers/InventoryControllers/MainInventoryController');

router.get('/Inventory', invCtrl.list);
router.get('/Inventory/view', invCtrl.View);
router.get('/Inventory/:codigo', invCtrl.find);
router.post('/Inventory/add', invCtrl.InventoryRegister);
router.post('/Inventory/delete', invCtrl.InventoryDelete);


module.exports = router;