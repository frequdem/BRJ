var express = require('express');
var router = express.Router();
var Host = require('../models/host')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index');
});

router.get('/list', function(req, res, next) {
	var host = new Host({
		hostName: '刘文超',
		hostJob: '建筑师',
		hostAge: 27,
		_id: '1'
	});
	host.save();
	res.render('list/list');
})

module.exports = router;
