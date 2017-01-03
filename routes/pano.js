var express = require('express');
var router = express.Router();
var House = require('../models/house');
router.get('/', function(req, res, next) {
	House.findOne({_id: req.query.id}, function(err, data) {
    	res.render('pano/pano', {panos: JSON.stringify(data.panos)});
	})
});
module.exports = router;
