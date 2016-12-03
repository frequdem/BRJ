var express = require('express');
var router = express.Router();
var Host = require('../models/host');
var House = require('../models/house');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/houseInfo', function(req, res, next) {
  res.render('backend/houseInfo');
});

//添加房源数据
router.post('/houseInfoInput', function(req, res, next) {
	var datas = req.body;
	var host_name1 = datas.host_name1;
	var host_age1 = datas.host_age1;
	var host_job1 = datas.host_job1;
	if (host_name1 && host_job1) {
		var host1 = new Host({
			hostName: datas.host_name1,
			hostAge: datas.host_age1,
			hostJob: datas.host_job1
		})
		var host1Id = host1._id;
		host1.save();
	}

	var host_name2 = datas.host_name2;
	var host_age2 = datas.host_age2;
	var host_job2 = datas.host_job2;
	if (host_name2 && host_job2) {
		var host2 = new Host({
			hostName: datas.host_name2,
			hostAge: datas.host_age2,
			hostJob: datas.host_job2
		})
		var host2Id = host2._id;
		host2.save();
	}

	if (datas.province) {
		var house = new House({
			province: datas.province,
			county: datas.county,
			area: datas.area,
			age: datas.age,
			hosts: [],
			dec_time: new Date(datas.dec_time),
			dec_cost: datas.dec_cost,
			dec_period: datas.dec_period,
			dec_experience: datas.dec_experience,
			title: datas.title,
			type: datas.type
		})
		if (host1Id) {
			house.hosts.push(host1Id);
		};
		if (host2Id) {
			house.hosts.push(host2Id);
		}

		house.save();
		var dirPath = path.resolve('./public/resource',house.id);
		fs.mkdir(dirPath,function(err) {
			if (err) {
				console.log(err);
			}
		});
	}

	res.redirect('/backend/houseInfo')
});
module.exports = router;
