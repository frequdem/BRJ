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
/***/ function(module, exports, __webpack_require__) {

	$(function () {
		var initMyInfo = __webpack_require__(1);
		initMyInfo('.logged', logStatus);
		$('i.unlogged').on('tap', function () {
			location.href = '/login';
		});
		$('.like-icon').on('tap', function (e) {
			e.stopPropagation();
			if ($('.login-img').hasClass('unlogged')) {
				location.href = '/login';
			} else {
				var _thisJq = $(this);
				if (_thisJq.hasClass('do-like')) {
					_thisJq.removeClass('do-like').addClass('donot-like');
					$.ajax({
						url: '/common/like',
						type: 'GET',
						data: {
							type: '0',
							id: _thisJq.parents('.fy-item').data('id')
						}
					});
				} else if (_thisJq.hasClass('donot-like')) {
					_thisJq.removeClass('donot-like').addClass('do-like');
					$.ajax({
						url: '/common/like',
						type: 'GET',
						data: {
							type: '1',
							id: _thisJq.parents('.fy-item').data('id')
						}
					});
				}
			}
		});
		$('.fy-item').on('tap', function () {
			var path = "/single/single?id=" + $(this).data('id');
			location.href = path;
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	//传入的参数为触发“我的”面板的元素, 是否载入了我的面板
	var initMyInfo = function (selector, bool) {
		if (bool) {
			$(document).ready(function () {
				var maskJq = $('.mask--myinfo');
				var myinfoJq = $('.myinfo');

				$(selector).tap(function () {
					if (maskJq.css('display') === 'none') {
						maskJq.show();
						$.ajax({
							url: '/login/getCollectCnt',
							type: 'get',
							success: function (r) {
								$($('.myinfo').contents()[0]).find('#mycollect-count').text(r.count);
							}
						});
						$.ajax({
							url: '/login/getMessageCnt',
							type: 'get',
							success: function (r) {
								var messageJq = $($('.myinfo').contents()[0]);
								messageJq.find('#mymessage-count').text(r.count);
								if (r.count > 0) {
									messageJq.find('.my-message').addClass('message-tip');
								} else {
									messageJq.find('.my-message').removeClass('message-tip');
								}
							}
						});

						myinfoJq.animate({ width: '80%' }, 200, 'ease-out');
					} else {
						maskJq.hide();
						$($('.myinfo').contents()[0]).find('#mycollect-count').text('');
						myinfoJq.animate({ width: '0' }, 200, 'ease-out');
					}
				});

				maskJq.on('touchmove', function (e) {
					e.preventDefault();
				});
				maskJq.tap(function () {
					maskJq.hide();
					myinfoJq.animate({ width: '0' }, 200, 'ease-out');
				});

				$(myinfoJq.prop('contentWindow').document).on('touchmove', function (e) {
					e.preventDefault();
				});
			});
		}
	};
	module.exports = initMyInfo;

/***/ }
/******/ ]);