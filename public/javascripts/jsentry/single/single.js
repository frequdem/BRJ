	$(document).ready(function() {
		$('span.login-img').on('tap',function() {
			location.href = '/login';
		});
		$('.goBack').on('tap', function() {
			history.back();
		});
	})
