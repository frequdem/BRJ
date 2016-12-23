$(function() {
	var initMyInfo = require('../component/myInfo');
	initMyInfo('.logged', logStatus);
	$('i.unlogged').on('tap',function() {
		location.href = '/login';
	});
	$('.like-icon').on('tap',function(e) {
		e.stopPropagation();
		if ($('.login-img').hasClass('unlogged')) {
			location.href = '/login';
		} else {
			var _thisJq = $(this);
			if (_thisJq.hasClass('do-like')) {
				_thisJq.removeClass('do-like').addClass('donot-like');
				$.ajax({
					url: '/common/like',
					type: 'GET',
					data: {
						type: '0',
						id: _thisJq.parents('.fy-item').data('id')
					}
				});
			} else if (_thisJq.hasClass('donot-like')) {
				_thisJq.removeClass('donot-like').addClass('do-like');
				$.ajax({
					url: '/common/like',
					type: 'GET',
					data: {
						type: '1',						
						id: _thisJq.parents('.fy-item').data('id')
					}
				});
			}
		}

	});
	$('.fy-item').on('tap', function() {
		var path = "/single/single?id=" + $(this).data('id');
		location.href = path;
	});

	//获取未读消息的数量（右上角）
	if (logStatus) {
		$.ajax({
				url: '/login/getMessageCnt',
				type: 'GET',
				success: function(r) {				
					var myMsgCnt = $('.unReadMsgCnt');
					if (r.count > 0){
						myMsgCnt.text(r.count).show();
					} else {
						myMsgCnt.hide();
					}				
				}
			});
	}
	
});

