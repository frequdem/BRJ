var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var House = require('../models/house');

/* GET home page. */
router.get('/single', function(req, res, next) {
	var data;
	House.findById(req.query.id, function(err, data) {
		data = data;
		res.render('single/single', {data: data});
	})
});
module.exports = router;
