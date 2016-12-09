$(document).ready(function() {
	var FORM_TYPE = 1;//1为登录，2为注册
	var phoneTest = /^\d{11}$/;
	var emailTest = /^.+@.+\.com$/;
	$('.confirm').tap(function() {
		switch (FORM_TYPE) {
			case 1:
				var username1 = $('#username1').val().replace(/\s/g, "");
				var password1 = $('#password1').val().replace(/\s/g, "");
				var data1 = {
							username: username1,
							password: password1
						};

				$.ajax({
					url: '/login/signIn',
					data: data1,
					type: 'POST',
					success: function(data) {
						if(data.status === 200) {
							location.replace($('.referer').val());		
						} else {
							alert("账号或密码错误");
						}
					}
				})
				break;
			case 2:
				var un2 = $('#username2');
				var pw2 = $('#password2');
				var pw2Again = $('#password21');

				var username2 = username2.replace(/\s/g, "");
				var password2 = password2.replace(/\s/g, "");
				var password21 = password21.replace(/\s/g, "");
				//验证输入合法性
				if ((!username2) || (!password2) || (!password21)) {
					alert('请填写完整的信息');
					return;
				}

				if (!(phoneTest.test(username2) || emailTest.test(username2))) {
					alert('请输入合法邮箱或手机号');
					un2.val('');
					return;
				}

				if (password2.length <6) {
					alert('密码设置过短');
					return;
				}

				if (password2 !== password21) {
					alert('两输入密码不一致');
					pw2.val('');
					pw2Again.val('');
					return;
				}

				var data2 = {
						username: username2,
						password: password2
					};
					$.ajax({
						url: '/login/signUp',
						data: data2,
						type: 'POST',
						success: function(data) {
							if(data.status === 200) {
								if (data.result.isUsed) {
									alert('该用户名已被注册');
									un2.val('');
									pw2.val('');
									pw2Again.val('');
								} else {
									alert("注册成功！");
									location.replace($('.referer').val());
								}
							} else {
								alert("注册失败");
							}
						}
				})
				break;
		}
		

	});	

	var signInTabJq = $('.signIn-tab');
	var signUpTabJq = $('.signUp-tab');
	var signInAreaJq = $('.signIn-area');
	var signUpAreaJq = $('.signUp-area');
	signInTabJq.tap(function() {
		if (!$(this).hasClass('active-tab')) {
			$(this).addClass('active-tab');
			signUpTabJq.removeClass('active-tab');
			signUpAreaJq.hide(0);
			signInAreaJq.show(500);

			FORM_TYPE = 1;
		}		
	});
	signUpTabJq.tap(function() {
		if (!$(this).hasClass('active-tab')) {
			$(this).addClass('active-tab');
			signInTabJq.removeClass('active-tab');
			signInAreaJq.hide(0);
			signUpAreaJq.show(500);

			FORM_TYPE = 2;
		}
	});
	$('.goBack').tap(function() {
		history.back();
	})
})
