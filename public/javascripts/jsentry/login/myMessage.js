$(document).ready(function() {
	$('.comments__item').on('tap', function() {
		$.ajax({
			url: '/comment/readMsg',
			type: 'GET',
			data: {
				id: $(this).data('id')
			}
		})
		var path = "/single/single?id=" + $(this).data('houseid');
		location.href = path;
	})
})
