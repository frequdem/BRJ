var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var checkSession = require('../assist/checkSession');
var User = require('../models/user');
var Comment = require('../models/comment');
/* GET home page. */
router.get('/getComments', function(req, res, next) {
	Comment.find({houseId:req.query.houseId}).populate('from','id nickname').populate('to', 'id nickname').sort({time: 1}).lean().exec(function(err, data) {
		var lgSt = checkSession(req);
		if (lgSt) {
			data.forEach(function(ele, index) {
				if (ele.from._id.toString() == req.session.userId) {
					data[index].fromMe = true;
				}
			});
		};
	  	res.json(data);
	})
});
router.get('/writeComment', function(req, res, next) {
	var lgSt = checkSession(req);
	if (lgSt) {
		var comment = new Comment({
			houseId: req.query.houseId,
			from: req.session.userId,
			content: req.query.content,
			time: new Date()
		});

		if (req.query.toId) {
			comment.to = req.query.toId;
		}
		comment.save(function(err, data){
	  		Comment.find({houseId:req.query.houseId}).populate('from','id nickname').populate('to', 'id nickname').sort({time: 1}).lean().exec(function(err, data) {
				data.forEach(function(ele, index) {
					if (ele.from._id.toString() == req.session.userId) {
						data[index].fromMe = true;
					}
				});				
			  	res.json(data);
			});
			//存一个给收信人
			if (req.query.toId) {
				User.findOneAndUpdate({_id: req.query.toId}, {$addToSet: {message: data._id}}, function(err, data) {
					if (err) {
						console.log(err);
					}
				})
			}
			
		});
	}	
})

router.get('/delComment', function(req, res, next) {
	var lgSt = checkSession(req);
	if (lgSt) {
		Comment.findOneAndRemove({_id: req.query.id}, function() {
	  		Comment.find({houseId:req.query.houseId}).populate('from','id nickname').populate('to', 'id nickname').sort({time: 1}).lean().exec(function(err, data) {
				data.forEach(function(ele, index) {
					if (ele.from._id.toString() == req.session.userId) {
						data[index].fromMe = true;
					}
				});

			  	res.json(data);
			})
		})
	}
})

module.exports = router;
