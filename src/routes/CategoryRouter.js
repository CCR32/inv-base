const router = require('express').Router(); 
const ctrlCategory = require('../controllers/CategoryControllers/CategoryController');
const ctrlSubcategory = require('../controllers/CategoryControllers/SubcategoryController');

router.post('/Category/add', ctrlCategory.CategoryRegister);
router.get('/Category/:code', ctrlCategory.find);
router.post('/Category/delete', ctrlCategory.CateogryDelete);
router.get('/Category', ctrlCategory.CategoryList);

router.get('/Subcategory', ctrlSubcategory. SubcategoryList);
router.get('/Subcategory/:code', ctrlSubcategory.find);
router.post('/Subcategory/add', ctrlSubcategory.SubcategoryRegister);
router.post('/Subcategory/delete', ctrlSubcategory.SubcategoryDelete);



module.exports = router; 