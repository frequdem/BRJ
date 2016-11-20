$(document).ready(function() {
	$('span.login-img').click(function() {
		location.href = '/login';
	});
	$('.fy-item-cover .like-icon').click(function() {
		var _thisJq = $(this);
		if (_thisJq.hasClass('do-like')) {
			_thisJq.removeClass('do-like').addClass('donot-like');
		} else if (_thisJq.hasClass('donot-like')) {
			_thisJq.removeClass('donot-like').addClass('do-like');
		}
	})

})