const router = require('express').Router(); 
const ctrlCategory = require('../controllers/CategoryControllers/CategoryController');

router.post('/Category/add', ctrlCategory.CategoryRegister);
router.get('/Category/:code', ctrlCategory.find);
router.post('/Category/delete', ctrlCategory.CateogryDelete);
router.get('/Category', ctrlCategory.CategoryList);

module.exports = router; 