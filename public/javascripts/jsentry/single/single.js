
	$(function() {
		var initMyInfo = require('../component/myInfo');
		initMyInfo('.logged', logStatus);
		var houseId = $('#houseId').val();
		$('i.unlogged').on('tap',function() {
			location.href = '/login';
		});
		$('.goBack').on('tap', function() {
			location.href = '/list';
		});

		$('.info-tabs__tab').tap(function() {
				$(window).scrollTo({
					toT: $($(this).find('a').data('href')).offset().top,
					durTime: 120,
				});	
				// $('html, body').scrollTop($($(this).find('a').data('href')).offset().top);
			});

		//收藏
		$('.collect-icon').on('tap',function(e) {
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
		$('.like-icon').on('tap',function(e) {
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
		    evaluate    : /{{([\s\S]+?)}}/g,
		    interpolate : /{{=([\s\S]+?)}}/g,
		    escape      : /{{-([\s\S]+?)}}/g
		};
		var commentsTemplate = _.template($('#commentsTemplate').html());
		$.ajax({
			url: '/comment/getComments',
			type: 'GET',
			data: {
				houseId: houseId
			},
			success: function(datas) {
				freshComments(datas);
			}
		});


		var commentInputJq = $('#comment-input');
		var replyBtnJq = $('.reply-btn');
		//点击“发送”评论
		replyBtnJq.tap(function() {			
			if (!logStatus) {
				location.href = '/login';
				return;
			}
			
			if (commentInputJq.val().length < 3) {
				alert('起码要说三个字吧？');
				return;
			}
			var toId = commentInputJq.data('id') || '';
			var content = commentInputJq.val();

			var data = {
				content: content,
				houseId: houseId
			};

			if (toId) {
				data.toId = toId;
			}
			$.ajax({
				url : '/comment/writeComment',
				type: 'GET',
				data: data,
				success: function(datas) {
					freshComments(datas.data);
					//评论框清空，发送按钮置灰
					commentInputJq.val('').attr({'placeholder': '你的看法...'}).removeAttr('data-id');
					replyBtnJq.removeClass('reply-btn-shine');
					var lastMsgItem = $('#' + datas.lastMsgId);
					$(window).scrollTo({
						toT: lastMsgItem.offset().top,
						durTime: 300
					});	
					lastMsgItem.css({'background': '#c2e1e1'}).animate({'background': '#ffffff'}, 1400, 'ease-out');
				}
			})
		});

		//刷新评论
		function freshComments(datas) {
				var timeStr = '';	
				//小于10的前面加0			
				function checkTime(i) {
						if (i<10) {
							i="0" + i
						}
					    return i;
					}
				datas.forEach(function(ele, index) {
					var date = new Date(ele.time);
					timeStr = date.getFullYear() + '-' + checkTime(date.getMonth()+1) + '-' + checkTime(date.getDate()) + ' ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes())
					datas[index].time = timeStr;
				})
				$('.comments').html(commentsTemplate({"datas": datas}));
		}

		//删除评论
		$('.comments').on('tap', '.comments__delete', function(e) {
			$(this).parents('.comments__item').addClass('tap-from-delete');
			
			$.ajax({
				url: '/comment/delComment',
				type: 'GET',
				data: {
					id: $(this).data('id'),
					houseId: houseId,
					toId: $(this).data('toId')
				},
				success: function(datas) {
					freshComments(datas);
				}
			})
		});
		
		//点击评论区的某栏
		$('.comments').on('click', '.comments__item', function() {
			var _this = this;

			if ($(_this).find('.comments__delete').length) {
				if (!commentInputJq.val()) {					
					commentInputJq.attr({'placeholder': '你的看法...'}).removeAttr('data-id');						
				};
				return;
			};
			commentInputJq[0].focus();
			setTimeout(function() {
				if ($(_this).hasClass('tap-from-delete')) {
					return;
				}				
				if (!logStatus) {
					location.href = '/login';
					return;
				}
				//滚动到评论框
				$(window).scrollTo({
						toT: $('#comments').offset().top,
						durTime: 120
				});	
				setTimeout(function() {						
						commentInputJq.attr({
							'placeholder': '回复 | '+ $(_this).data('from') + '说 : ' + $(_this).find('.comments__content').text().substring(0,20) + '...',
							 "data-id": $(_this).data('id')
							});
				}, 100);
			}, 0);

		});

		//评论框失去焦点(为了防止点击发送之前，发生blur事件，所以延迟执行)
		commentInputJq.blur( function() {	
			if (!$(this).val()) {					
					commentInputJq.attr({'placeholder': '你的看法...'}).removeAttr('data-id');						
			};
		});

		//评论框更改时，检查是否存在内容，是，发送按钮量，否，置灰
		commentInputJq.on('input', function() {
			if (commentInputJq.val().length > 2) {
				if (!replyBtnJq.hasClass('reply-btn-shine')) {
					replyBtnJq.addClass('reply-btn-shine');
				}
			} else {
				replyBtnJq.removeClass('reply-btn-shine');
			}
		})
	});

