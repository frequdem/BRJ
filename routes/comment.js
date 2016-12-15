var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var checkSession = require('../assist/checkSession');
var Host = require('../models/host');
var House = require('../models/house');
var User = require('../models/user');
var Comment = require('../models/comment');
/* GET home page. */
router.get('/getComments', function(req, res, next) {
  res.json({result: 1});
});

module.exports = router;
