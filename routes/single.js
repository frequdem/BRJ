var express = require('express');
var router = express.Router();
var checkSession = require('../assist/checkSession');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var House = require('../models/house');
var Host = require('../models/host');

/* GET home page. */
router.get('/single', function(req, res, next) {
	var data;
	House.findById(req.query.id, function(err, dataTemp) {
		data = dataTemp.toObject();
		Promise.all(data.hosts.map(function(id) {
			return new Promise(function(resolve, reject) {
				Host.findById(id, function(err, data){					
						resolve(data)
					})
			});
		})).then(function(hs) {
				data.hosts = hs;
				data.dec_time = data.dec_time.getFullYear()+"-"+(data.dec_time.getMonth()+1)+"-"+data.dec_time.getDate();
				var lgSt = checkSession(req);
				res.render('single/single', {data: data, logStatus: lgSt});
			})
		})		
	});
module.exports = router;
