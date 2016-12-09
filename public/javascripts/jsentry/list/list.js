var initMyInfo = require('../component/myInfo');
initMyInfo('.logged');
$(document).ready(function() {
	$('i.unlogged').on('tap',function() {
		location.href = '/login';
	});
	$('.fy-item-cover .like-icon').on('tap',function(e) {
		e.stopPropagation();
		var _thisJq = $(this);
		if (_thisJq.hasClass('do-like')) {
			_thisJq.removeClass('do-like').addClass('donot-like');
		} else if (_thisJq.hasClass('donot-like')) {
			_thisJq.removeClass('donot-like').addClass('do-like');
		}
	});
	$('.fy-item').on('tap', function() {
		var path = "/single/single?id=" + $(this).data('id');
		location.href = path;
	})
});

