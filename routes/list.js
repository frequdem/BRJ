var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var checkSession = require('../assist/checkSession');
var Host = require('../models/host');
var House = require('../models/house');
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index');
});

router.get('/list', function(req, res, next) {
	var data;
	var lgSt = checkSession(req);


		House.find({}).lean().exec( function(err, data) {
			if (err) {
				reject(err);
			} else {
				res.render('list/list', {list: data, logStatus: lgSt});
			}		
		})
})

module.exports = router;
