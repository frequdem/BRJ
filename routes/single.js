var express = require('express');
var router = express.Router();
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
				// data.dec_time = data.dec_time.format("yyyy-MM-dd");
				res.render('single/single', {data: data});
			})
		})		
	});
module.exports = router;
