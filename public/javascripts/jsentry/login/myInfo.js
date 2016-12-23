$(function() {
	$('.logout').tap(function() {
		$.ajax({
			url: '/login/logout',
			success: function(r) {
				if (r.status === 200) {
				       window.parent.location.reload();
				} else if (r.status === 400) {
					alert(r.msg);
				}				
			}
		})
	});

	$('.my-collect').tap(function() {
		window.parent.location.href = '/login/myCollect';
	});
	$('.my-message').tap(function() {
		window.parent.location.href = '/login/myMessage';
	});

	$('body').on('touchmove', function(e) {
			e.preventDefault();
		});
})
