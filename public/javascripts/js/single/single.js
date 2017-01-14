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
		var houseId = $('#houseId').val();
		$('i.unlogged').on('tap', function () {
			location.href = '/login';
		});
		$('.goBack').on('tap', function () {
			location.href = '/list';
		});

		$('.info-tabs__tab').tap(function () {
			$('.content').scrollTo({
				toT: $($(this).find('a').data('href'))[0].offsetTop,
				durTime: 120
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

		//点击回复或发送按钮执行的函数
		function sendMsg(inputJq, btnJq) {
			if (!logStatus) {
				location.href = '/login';
				return;
			}

			if (inputJq.val().length < 3) {
				alert('起码要说三个字吧？');
				return;
			}
			var toId = inputJq.data('id') || '';
			var content = inputJq.val();

			var data = {
				content: content,
				houseId: houseId
			};

			if (toId) {
				data.toId = toId;
			}
			$.ajax({
				url: '/comment/writeComment',
				type: 'GET',
				data: data,
				success: function (datas) {
					freshComments(datas.data);
					//评论框清空，发送按钮置灰
					inputJq.val('').attr({ 'placeholder': '你的看法...' }).removeAttr('data-id');
					btnJq.removeClass('reply-btn-shine');
					var lastMsgItem = $('#' + datas.lastMsgId);
					$('.content').scrollTo({
						toT: lastMsgItem[0].offsetTop,
						durTime: 300
					});
					lastMsgItem.css({ 'background': '#c2e1e1' }).animate({ 'background': '#ffffff' }, 1400, 'ease-out');
				}
			});
		}

		var commentInputJq = $('#comment-input');
		var sendBtnJq = $('.send-btn');
		//点击“发送”评论
		sendBtnJq.tap(function () {
			sendMsg(commentInputJq, sendBtnJq);
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
		$('.comments').on('tap', '.comments__delete', function (e) {
			console.log($(this).data('id'), $(this).data('toid'));
			$.ajax({
				url: '/comment/delComment',
				type: 'GET',
				data: {
					id: $(this).data('id'),
					houseId: houseId,
					toId: $(this).data('toid')
				},
				success: function (datas) {
					freshComments(datas);
				}
			});
		});

		//点击评论区的某栏
		var replyTemplate = _.template($('#replyTemplate').html());
		$('.comments').on('click', '.comments__item', function () {
			var _this = this;
			if (!logStatus) {
				location.href = '/login';
				return;
			}
			if ($(_this).find('.comments__delete').length) {
				return;
			};
			if ($(_this).find('.reply-btn').length) {
				return;
			};
			if ($(this).find('.reply-area').length) {
				$('.reply-area textarea').focus();
				return;
			}
			if ($('.reply-area').length) {
				$('.reply-area').remove();
			};

			//添加回复框
			$(this).append(replyTemplate());
			var replyInputJq = $('.reply-area textarea');
			var replyBtnJq = $('.reply-area .reply-btn');
			$('.content').scrollTop(_this.offsetTop);
			replyInputJq[0].focus();
			//回复框框失去焦点

			//检查回复框的字数
			replyInputJq.on('input', function () {
				if (replyInputJq.val().length > 2) {
					if (!replyBtnJq.hasClass('reply-btn-shine')) {
						replyBtnJq.addClass('reply-btn-shine');
					}
				} else {
					replyBtnJq.removeClass('reply-btn-shine');
				}
			});

			//点击“发送”评论
			replyBtnJq.tap(function () {
				sendMsg(replyInputJq, replyBtnJq);
			});
			setTimeout(function () {
				replyInputJq.attr({
					'placeholder': '回复 | ' + $(_this).data('from') + '说 : ' + $(_this).find('.comments__content').text().substring(0, 20) + '...',
					"data-id": $(_this).data('id')
				});
			}, 10);
		});

		//评论框更改时，检查是否存在内容，是，发送按钮量，否，置灰
		commentInputJq.on('input', function () {
			if (commentInputJq.val().length > 2) {
				if (!sendBtnJq.hasClass('reply-btn-shine')) {
					sendBtnJq.addClass('reply-btn-shine');
				}
			} else {
				sendBtnJq.removeClass('reply-btn-shine');
			}
		});

		//获取未读消息的数量（右上角）
		if (logStatus) {
			$.ajax({
				url: '/login/getMessageCnt',
				type: 'get',
				success: function (r) {
					var myMsgCnt = $('.login-img.logged');
					if (r.count > 0) {
						myMsgCnt.append('<span class="unReadMsgCnt">' + r.count + '</span>');
					}
				}
			});
		};

		// 点击播放按钮
		$('.play-icon').on('tap', function () {
			var _this = this;
			$(_this).animate({ 'background': '#fff', 'color': '#76B3B4' }, 'ease', 300);
			setTimeout(function () {
				window.location.href = $(_this).data('href');
			}, 300);
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
					//隐藏按钮上的未读消息数字
					$('.unReadMsgCnt').hide();

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