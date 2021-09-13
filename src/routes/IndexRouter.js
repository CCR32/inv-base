const router = require('express').Router();
const usrCtrl = require('../controllers/UserController');

router.get('/login', usrCtrl.login);
router.get('/logoff', usrCtrl.logoff);

module.exports = router;