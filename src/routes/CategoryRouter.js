const router = require('express').Router(); 
const ctrlCategory = require('../controllers/CategoryControllers/CategoryController');
const ctrlSubcategory = require('../controllers/CategoryControllers/SubcategoryController');
const userController = require('../controllers/UserController');


router.post('/Category/add',
        userController.isLogged,  
        ctrlCategory.CategoryRegister);

router.get('/Category/add', 
        userController.isLogged, 
        ctrlCategory.ViewRegister);        

router.get('/Category/:code',
        userController.isLoggedApi, 
        ctrlCategory.find);

router.post('/Category/delete',
        userController.isLogged, 
        ctrlCategory.CategoryDelete);

router.get('/Category', 
        userController.isLogged, 
        ctrlCategory.CategoryList);

router.get('/Subcategory', 
        userController.isLogged,
        ctrlSubcategory.SubcategoryView);

router.get('/Subcategory/:code', 
        userController.isLoggedApi, 
        ctrlSubcategory.find);

router.post('/Subcategory/add', 
        userController.isLogged,
        ctrlSubcategory.SubcategoryRegister);

router.post('/Subcategory/delete', 
        userController.isLogged,
        ctrlSubcategory.SubcategoryDelete);



module.exports = router; 