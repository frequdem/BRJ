var express = require('express');
var router = express.Router();
var checkSession = require('../assist/checkSession');
var Host = require('../models/host');
var House = require('../models/house');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index');
});

router.get('/list', function(req, res, next) {
	var data;
	House.find({}, function(err, data) {
		data = data;
		var lgSt = checkSession(req);
		res.render('list/list', {list: data, logStatus: lgSt});
	})

})

module.exports = router;
