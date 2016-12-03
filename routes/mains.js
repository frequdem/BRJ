var express = require('express');
var router = express.Router();
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
		res.render('list/list', {list: data});
	})

})

module.exports = router;
