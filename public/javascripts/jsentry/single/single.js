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

		//发表评论
		$('.reply-btn').tap(function() {
			if (!logStatus) {
				location.href = '/login';
			}
			var commentContent = $('#comment-input');
			if (commentContent.val().length < 3) {
				alert('起码要说三个字吧？');
				return;
			}
			$.ajax({
				url : '/comment/writeComment',
				type: 'GET',
				data: {
					content: commentContent.val(),
					houseId: houseId
				},
				success: function(datas) {
					freshComments(datas);
					commentContent.val('');
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
		$('.comments__delete').tap(function() {
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
				success: function(datas) {
					freshComments(datas);
				}
			})
		});
		//回复评论
		$('.comments__replay').tap(function() {
			alert(1);
			if (!logStatus) {
				location.href = '/login';
			}
		});
	})
