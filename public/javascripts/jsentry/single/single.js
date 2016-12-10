	var initMyInfo = require('../component/myInfo');
	initMyInfo('.logged');
	$(document).ready(function() {
		$('i.unlogged').on('tap',function() {
			location.href = '/login';
		});
		$('.goBack').on('tap', function() {
			location.href = '/list';
		});

		$('.info-tabs__tab').click(function() {
				$('html,body').scrollTo({
					toT: $($(this).find('a').data('href')).offset().top,
					durTime: 150
				});	
				// $('html, body').scrollTop($($(this).find('a').data('href')).offset().top);
			})
	})
