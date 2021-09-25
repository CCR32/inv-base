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

router.get('/api/Category/list', 
        userController.isLoggedApi, 
        ctrlCategory.list);

router.get('/Subcategory', 
        userController.isLogged,
        ctrlSubcategory.SubcategoryView);

router.get('/api/Subcategory/:code', 
        userController.isLoggedApi, 
        ctrlSubcategory.find);

router.post('/Subcategory/add', 
        userController.isLogged,
        ctrlSubcategory.SubcategoryRegister);

router.get('/Subcategory/add', 
        userController.isLogged,
        ctrlSubcategory.SubcategoryCreate);

router.post('/api/Subcategory/delete', 
        userController.isLogged,
        ctrlSubcategory.SubcategoryDelete);



module.exports = router; 