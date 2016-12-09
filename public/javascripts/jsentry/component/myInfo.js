var initMyInfo = function() {
	$(document).ready(function() {
		var maskJq = $('.mask--myinfo');
		var myinfoJq = $('.myinfo');
		$('.logged').tap(function() {
			if (maskJq.css('display') === 'none') {
				maskJq.show();
				myinfoJq.animate({width: '80%'}, 200, 'ease-out');
			} else {
				maskJq.hide();			
				myinfoJq.animate({width: '0'}, 200, 'ease-out');
			}
		});

		maskJq.on('touchmove', function(e) {
			e.preventDefault();
		});
		myinfoJq.on('touchmove', function(e) {
			e.preventDefault();
		});
	})
}
module.exports = initMyInfo;