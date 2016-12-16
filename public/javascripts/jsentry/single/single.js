	var initMyInfo = require('../component/myInfo');
	initMyInfo('.logged', logStatus);
	$(document).ready(function() {
		var houseId = $('#houseId').val();
		$('i.unlogged').on('tap',function() {
			location.href = '/login';
		});
		$('.goBack').on('tap', function() {
			location.href = '/list';
		});

		$('.info-tabs__tab').click(function() {
				$('html,body').scrollTo({
					toT: $($(this).find('a').data('href')).offset().top,
					durTime: 200,
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
		//点击“发送”评论
		$('.reply-btn').tap(function() {			
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
					freshComments(datas);
					commentInputJq.val('').attr({'placeholder': '你的看法...'}).removeAttr('data-id');	
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
		$('.comments').on('tap', '.comments__delete', function() {
			$.ajax({
				url: '/comment/delComment',
				type: 'GET',
				data: {
					id: $(this).data('id'),
					houseId: houseId 
				},
				success: function(datas) {
					freshComments(datas);
				}
			})
		});
		
		//点击“回复”按钮
		$('.comments').on('tap', '.comments__reply', function() {
			var _this = this;
			if (!logStatus) {
				location.href = '/login';
				return;
			}
			//滚动到评论框
			$('html,body').scrollTo({
					toT: $('#comments').offset().top,
					durTime: 50
				});	
				setTimeout(function() {
						commentInputJq.trigger('focus').attr({'placeholder': '回复'+ $(_this).data('from') + ':', "data-id": $(_this).data('id')});
					}, 100);
		});

		//评论框失去焦点(为了防止点击发送之前，发生blur事件，所以延迟执行)
		commentInputJq.blur( function() {	
				if (!$(this).val()) {					
						commentInputJq.attr({'placeholder': '你的看法...'}).removeAttr('data-id');						
				};
			});
	});

