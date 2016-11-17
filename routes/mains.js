var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index');
});

router.get('/list', function(req, res, next) {
	res.render('list/list');
})

module.exports = router;
