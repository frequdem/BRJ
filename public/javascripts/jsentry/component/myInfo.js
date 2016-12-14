//传入的参数为触发“我的”面板的元素, 是否载入了我的面板
var initMyInfo = function(selector, bool) {
	if (bool) {
		$(document).ready(function() {
			var maskJq = $('.mask--myinfo');
			var myinfoJq = $('.myinfo');
			$(selector).tap(function() {
				if (maskJq.css('display') === 'none') {
					myinfoJq.attr('src', '/login/myInfo');
					maskJq.show();
					myinfoJq.animate({width: '80%'}, 200, 'ease-out');
				} else {
					maskJq.hide();
					myinfoJq.attr('src', '');		
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