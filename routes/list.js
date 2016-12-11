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

	Promise.all([new Promise(function(resolve, reject){
		House.find({}).lean().exec( function(err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}		
		})
	}), new Promise(function(resolve, reject) {
		if (lgSt) {
			User.findOne({_id: req.session.userId}, function(err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}	
			})
		} else {			
			resolve();

		}
	})]).then(function(datas) {
		data = datas[0]; 
		
		if (!!datas[1] && datas[1].like.length) {

			datas[1].like.map(function(item) {
				data.forEach(function(value, index, arr) {
					if (item === value._id.toString()) {						
						data[index].like = true;
					}					
				})
			})
		}
		res.render('list/list', {list: data, logStatus: lgSt});
	}).catch(function(err) {
		console.log(err);
	});
		

})

module.exports = router;
