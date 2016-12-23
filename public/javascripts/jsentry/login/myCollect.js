$(function() {
	$('.fy-item').on('tap', function() {
		var path = "/single/single?id=" + $(this).data('id');
		location.href = path;
	})
})
