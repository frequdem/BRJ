/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	$(document).ready(function () {
		var FORM_TYPE = 1; //1为登录，2为注册
		var phoneTest = /^\d{11}$/;
		var emailTest = /^.+@.+\.com$/;
		$('.confirm').tap(function () {
			switch (FORM_TYPE) {
				case 1:
					var data1 = {
						username: $('#username1').val(),
						password: $('#password1').val()
					};

					$.ajax({
						url: '/login/signIn',
						data: data1,
						type: 'POST',
						success: function (data) {
							if (data.status === 200) {
								location.href = $('.referer').val();
							} else {
								alert("账号或密码错误");
							}
						}
					});
					break;
				case 2:
					var un2 = $('#username2');
					var pw2 = $('#password2');
					var pw2Again = $('#password21');

					//验证输入合法性
					if (!un2.val() || !pw2.val() || !pw2Again.val()) {
						alert('请填写完整的信息');
						return;
					}

					if (!(phoneTest.test(un2.val()) || emailTest.test(un2.val()))) {
						alert('请输入合法邮箱或手机号');
						un2.val('');
						return;
					}

					if (pw2.val().length < 6) {
						alert('密码设置过短');
						return;
					}

					if (pw2.val() !== pw2Again.val()) {
						alert('两输入密码不一致');
						pw2.val('');
						pw2Again.val('');
						return;
					}

					var data2 = {
						username: un2.val(),
						password: pw2.val()
					};
					$.ajax({
						url: '/login/signUp',
						data: data2,
						type: 'POST',
						success: function (data) {
							if (data.status === 200) {
								alert("注册成功！");
								location.href = $('.referer').val();
							} else {
								alert("注册失败");
							}
						}
					});
					break;
			}
		});

		var signInTabJq = $('.signIn-tab');
		var signUpTabJq = $('.signUp-tab');
		var signInAreaJq = $('.signIn-area');
		var signUpAreaJq = $('.signUp-area');
		signInTabJq.tap(function () {
			if (!$(this).hasClass('active-tab')) {
				$(this).addClass('active-tab');
				signUpTabJq.removeClass('active-tab');
				signUpAreaJq.hide(0);
				signInAreaJq.show(500);

				FORM_TYPE = 1;
			}
		});
		signUpTabJq.tap(function () {
			if (!$(this).hasClass('active-tab')) {
				$(this).addClass('active-tab');
				signInTabJq.removeClass('active-tab');
				signInAreaJq.hide(0);
				signUpAreaJq.show(500);

				FORM_TYPE = 2;
			}
		});
	});

/***/ }
/******/ ]);