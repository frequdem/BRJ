$(function() {
	$('body').on('touchstart', function(e) {
		e.preventDefault();
	});
	$('.goBack').tap(function() {
		history.back(-1);
	})
})