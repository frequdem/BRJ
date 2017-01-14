var express = require('express');
var router = express.Router();
var House = require('../models/house');
var Good = require('../models/good');
router.get('/', function(req, res, next) {
	House.findOne({_id: req.query.id}).lean().exec(function(err, data) {
		var infoFinal = {};
		var panosInfo = data.panos;
		var cnt = 0;
		var sumCnt = 0; //sumCnt为总共要查询的物品数
		for (item1 in panosInfo) {
			infoFinal[item1] = {};
			infoFinal[item1].neighs = panosInfo[item1].neighs;
			sumCnt += panosInfo[item1].goods.length;
		}

		var panoFinal = {};
		for (item2 in panosInfo) {
			panoFinal[item2] = [];
		}

		var panoIds = {};
		for (item5 in panosInfo) {

			if (panosInfo[item5].goods.length) {
				panoIds[item5] = [];
				panosInfo[item5].goods.forEach(function(ele, i) {
					panoIds[item5].push(ele.goodId.toString());
				})
			}
		}


		function inArray(item, arr) {
			if (!arr.length) {
				return -1;
			}
			for (var i = 0; i < arr.length; i ++) {
				if (arr[i] == item) {
					return i
				}
			}
			return -1;
		}

		function inWhichSceneAreGoods(id) {
			for (item4 in panosInfo) {

				if (inArray(id, panoIds[item4] )!= -1) {
					
					return item4;
				}
			}
		}

		for (item in panosInfo) {
			panosInfo[item].goods.forEach(function(ele, i) {
				Good.findOne({_id: ele.goodId}).lean().exec(function(err, data) {
					var panoItem = {};
					panoItem.pos = ele.pos;
					panoItem.info = data;
					var t = inWhichSceneAreGoods(data._id.toString());
					panoFinal[t].push(panoItem);
					if (cnt == sumCnt -1) {
						for (item3 in panosInfo) {
							infoFinal[item3].goods = panoFinal[item3];
						}
    					res.render('pano/pano', {panos: JSON.stringify(infoFinal)});
					}
					cnt ++;

				});


			});
		}
	})
});
module.exports = router;
