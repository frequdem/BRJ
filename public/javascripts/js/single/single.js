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

	var initMyInfo = __webpack_require__(1);
	initMyInfo('.logged', logStatus);
	$(document).ready(function () {
		var houseId = $('#houseId').val();
		$('i.unlogged').on('tap', function () {
			location.href = '/login';
		});
		$('.goBack').on('tap', function () {
			location.href = '/list';
		});

		$('.info-tabs__tab').click(function () {
			$('html,body').scrollTo({
				toT: $($(this).find('a').data('href')).offset().top,
				durTime: 200
			});
			// $('html, body').scrollTop($($(this).find('a').data('href')).offset().top);
		});

		//收藏
		$('.collect-icon').on('tap', function (e) {
			e.stopPropagation();
			if (!logStatus) {
				location.href = '/login';
			} else {
				var _thisJq = $(this);
				var _likeCountJq = $('.collect-count');
				if (_thisJq.hasClass('do-collect')) {
					_thisJq.removeClass('do-collect').addClass('donot-collect');
					_likeCountJq.text(parseInt(_likeCountJq.text()) - 1);
					$.ajax({
						url: '/common/collect',
						type: 'GET',
						data: {
							type: '0',
							id: houseId
						}
					});
				} else if (_thisJq.hasClass('donot-collect')) {
					_thisJq.removeClass('donot-collect').addClass('do-collect');
					_likeCountJq.text(parseInt(_likeCountJq.text()) + 1);
					$.ajax({
						url: '/common/collect',
						type: 'GET',
						data: {
							type: '1',
							id: houseId
						}
					});
				}
			}
		});

		//点赞
		$('.like-icon').on('tap', function (e) {
			e.stopPropagation();
			if (!logStatus) {
				location.href = '/login';
			} else {
				var _thisJq = $(this);
				var _likeCountJq = $('.like-count');
				if (_thisJq.hasClass('do-like')) {
					_thisJq.removeClass('do-like').addClass('donot-like');
					_likeCountJq.text(parseInt(_likeCountJq.text()) - 1);
					$.ajax({
						url: '/common/like',
						type: 'GET',
						data: {
							type: '0',
							id: houseId
						}
					});
				} else if (_thisJq.hasClass('donot-like')) {
					_thisJq.removeClass('donot-like').addClass('do-like');
					_likeCountJq.text(parseInt(_likeCountJq.text()) + 1);
					$.ajax({
						url: '/common/like',
						type: 'GET',
						data: {
							type: '1',
							id: houseId
						}
					});
				}
			}
		});

		//获取评论
		_.templateSettings = {
			evaluate: /{{([\s\S]+?)}}/g,
			interpolate: /{{=([\s\S]+?)}}/g,
			escape: /{{-([\s\S]+?)}}/g
		};
		var commentsTemplate = _.template($('#commentsTemplate').html());
		$.ajax({
			url: '/comment/getComments',
			type: 'GET',
			data: {
				houseId: houseId
			},
			success: function (datas) {
				freshComments(datas);
			}
		});

		//发表评论
		$('.reply-btn').tap(function () {
			if (!logStatus) {
				location.href = '/login';
			}
			var commentContent = $('#comment-input');
			if (commentContent.val().length < 3) {
				alert('起码要说三个字吧？');
				return;
			}
			$.ajax({
				url: '/comment/writeComment',
				type: 'GET',
				data: {
					content: commentContent.val(),
					houseId: houseId
				},
				success: function (datas) {
					freshComments(datas);
					commentContent.val('');
				}
			});
		});

		//刷新评论
		function freshComments(datas) {
			var timeStr = '';
			//小于10的前面加0			
			function checkTime(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			}
			datas.forEach(function (ele, index) {
				var date = new Date(ele.time);
				timeStr = date.getFullYear() + '-' + checkTime(date.getMonth() + 1) + '-' + checkTime(date.getDate()) + ' ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes());
				datas[index].time = timeStr;
			});
			$('.comments').html(commentsTemplate({ "datas": datas }));
		}

		//删除评论
		$('.comments__delete').tap(function () {
			if (!logStatus) {
				location.href = '/login';
			}
			alert(1);
			$.ajax({
				url: '/comment/delComment',
				type: 'GET',
				data: {
					id: $(this).data('id')
				},
				success: function (datas) {
					freshComments(datas);
				}
			});
		});
		//回复评论
		$('.comments__replay').tap(function () {
			alert(1);
			if (!logStatus) {
				location.href = '/login';
			}
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
								$($('.myinfo').contents()[0]).find('#mycollect-count').text('（' + r.count + '）');
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