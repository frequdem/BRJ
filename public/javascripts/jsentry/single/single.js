	var initMyInfo = require('../component/myInfo');
	initMyInfo();
	$(document).ready(function() {
		$('i.unlogged').on('tap',function() {
			location.href = '/login';
		});
		$('.goBack').on('tap', function() {
			location.href = '/list';
		});
	})
