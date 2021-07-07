var express = require('express')
var router = express.Router()
var serviceCtrl = require('../controllers/service.controller.js')
var userCtrl = require('../controllers/user-controller');
var passport = require('passport')


router.get('/', (req, res) => {
    return res.send('hello')
})

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);
router.post('/getuser', userCtrl.getUserDetails);
router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close`});
})


router.post('/service', function (req, res) {
    var response = serviceCtrl.addService(req);
    res.json({ "success": true, "data": response });
})

module.exports = router