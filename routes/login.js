var express = require('express');
var router = express.Router();
var checkSession = require('../assist/checkSession');
var mongoose = require('mongoose');
var User = require('../models/user');
var House = require('../models/house');
var Comment = require('../models/comment');
router.get('/', function(req, res, next) {
  	res.render('login/login',{referer: req.headers.referer});
});
router.get('/myInfo', function(req, res, next) {
	User.findOne({_id: req.session.userId}, function(err, data) {
		res.render('login/myInfo', {data: data});
	})	
});
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		if (err) {
			res.json({status: 400, msg: '退出未成功', result: {err: err}});
		} else {
			res.json({status: 200, msg: '', result: {}});
		}
	});
	
})

//我的收藏
router.get('/myCollect', function(req, res, next) {
	var data;
	User.findOne({_id: req.session.userId}, function(err, data) {
				if (err) {
					console.log(err);
				} else {
					House.find({_id: {$in: data.collect}}).exec(function(err, data) {
						if (err) {
							console.log(err);
						} else {
							res.render('login/myCollect', {list: data});
						}		
				 	})
				}	
			})
})

//我的消息
router.get('/myMessage', function(req, res, next) {
	var data;
	User.findOne({_id: req.session.userId}, function(err, data) {
				if (err) {
					console.log(err);
				} else {
					var messageIdList = data.message;
					Comment.find({_id: {$in: messageIdList}}).lean().exec(function(err, data) {
						if (err) {
							console.log(err);
						} else {
							var delCnt = messageIdList.length;
							messageIdList.forEach(function(ele, index) {
								data.forEach(function(ele1, index1) {
									if (ele1._id.toString() == ele) {
										delCnt -= 1;
										return;
									}
								})
							});
							console.log(delCnt,data);
							res.render('login/myMessage', {list: data, delCnt: delCnt});
						}		
				 	})
				}	
			})
})

//登录
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

//注册
router.post('/signUp', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var nickname = req.body.nickname;
	User.findOne({
		username: username
	}, function(err, obj) {
		if (obj) {		
				res.json({status: 200, msg: '', result: {isUsed: true}});
			}else {
				var user = new User({ 
			        username: username, 
			        password: password,
			        nickname: nickname
			    }); 
			    user.save();
			    req.session.userId = user.id;	
			    res.json({status: 200, msg: '', result: {}});
			}
	}) 
})

//获取收藏数
router.get('/getCollectCnt', function(req, res, next) {
	var data;
	User.findOne({_id: req.session.userId}, function(err, data) {
				if (err) {
					console.log(err);
				} else {
					res.json({count: data.collect.length});			
				}	
			})
});

//获取收藏数
router.get('/getMessageCnt', function(req, res, next) {
	var data;
	User.findOne({_id: req.session.userId}, function(err, data) {
				if (err) {
					console.log(err);
				} else {
					res.json({count: data.message.length});			
				}	
			})
})

module.exports = router;
