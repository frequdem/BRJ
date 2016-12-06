var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res, next) {
  	res.render('login/login',{referer: req.headers.referer});
});

router.post('/signIn', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({
		username: username,
		password: password
	}, function(err, obj) {
		if (obj) {
				req.session.userId = obj.id;
				res.json({status: 200, msg: '', result: {}});
			} else {
				res.json({status: 400, msg: '', resutl: {}});
			}
	})
})

router.post('/signUp', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	User.findOne({
		username: username
	}, function(err, obj) {
		if (obj) {		
				res.json({status: 200, msg: '', result: {isUsed: true}});
			}else {
				var user = new User({ 
			        username : username, 
			        password : password 
			    }); 
			    user.save();
			    req.session.userId = user.id;	
			    res.json({status: 200, msg: '', result: {}});
			}
	})

	 
})

module.exports = router;
