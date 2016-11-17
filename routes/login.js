var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Schema = mongoose.Schema;
var User = new Schema({ 
    name : String, 
    pw : String 
});
var UserModel = mongoose.model('User', User);


mongoose.connect('mongodb://localhost/db');

router.get('/', function(req, res, next) {
  	res.render('login/login',{referer: req.headers.referer});
});

router.post('/signIn', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	UserModel.findOne({name: username, pw: password},function(err, obj) {
		if (obj) {
			res.json({status: 200, msg: '', result: {}});
		} else {
			res.json({status: 400, msg: '', resutl: {}});
		}
	})

})

router.post('/signUp', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	 var user = new UserModel({ 
        name : username, 
        pw : password 
    }); 
    user.save();	
    res.json({status: 200, msg: '', result: {}});
})

module.exports = router;
