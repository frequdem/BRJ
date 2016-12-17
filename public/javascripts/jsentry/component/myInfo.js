//传入的参数为触发“我的”面板的元素, 是否载入了我的面板
var initMyInfo = function(selector, bool) {
	if (bool) {
		$(document).ready(function() {
			var maskJq = $('.mask--myinfo');
			var myinfoJq = $('.myinfo');
			
			$(selector).tap(function() {
				if (maskJq.css('display') === 'none') {
					maskJq.show();
					$.ajax({
						url: '/login/getCollectCnt',
						type: 'get',
						success: function(r) {
							$($('.myinfo').contents()[0]).find('#mycollect-count').text(r.count);
						}
					});
					$.ajax({
						url: '/login/getMessageCnt',
						type: 'get',
						success: function(r) {
							var messageJq = $($('.myinfo').contents()[0]);
							messageJq.find('#mymessage-count').text(r.count)
							if (r.count > 0){
								messageJq.find('.my-message').addClass('message-tip');
							} else {
								messageJq.find('.my-message').removeClass('message-tip');
							}
							
						}
					});

					myinfoJq.animate({width: '80%'}, 200, 'ease-out');
				} else {
					maskJq.hide();
					$($('.myinfo').contents()[0]).find('#mycollect-count').text('');
					myinfoJq.animate({width: '0'}, 200, 'ease-out');
				}
			});

			maskJq.on('touchmove', function(e) {
				e.preventDefault();
			});
			maskJq.tap(function() {
				maskJq.hide();			
				myinfoJq.animate({width: '0'}, 200, 'ease-out');
			});
			
			$(myinfoJq.prop('contentWindow').document).on('touchmove', function(e) {
				e.preventDefault();
			});
		})
	}
}
module.exports = initMyInfo;