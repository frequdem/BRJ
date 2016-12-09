$(document).ready(function() {
	$('.logout').tap(function() {
		$.ajax({
			url: '/login/logout',
			success: function(r) {
				if (r.status === 200) {
					parent.location.reload();
				} else if (r.status === 400) {
					alert(r.msg);
				}
				
			}
		})
	});
	$('body').on('touchmove', function(e) {
			e.preventDefault();
		});
})