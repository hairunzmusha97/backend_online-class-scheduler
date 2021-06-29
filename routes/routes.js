var express = require('express')
var router = express.Router()
var serviceCtrl = require('../controllers/service.controller.js')


router.post('/service', function (req, res) {
    var response = serviceCtrl.addService(req);
    res.json({ "success": true, "data": response});
})

module.exports = router