	var initMyInfo = require('../component/myInfo');
	initMyInfo('.logged');
	$(document).ready(function() {
		$('i.unlogged').on('tap',function() {
			location.href = '/login';
		});
		$('.goBack').on('tap', function() {
			location.href = '/list';
		});
	})
