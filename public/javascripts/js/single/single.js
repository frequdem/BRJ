!function(t){function e(n){if(o[n])return o[n].exports;var a=o[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){$(function(){function t(t,o){if(!logStatus)return void(location.href="/login");if(t.val().length<3)return void alert("起码要说三个字吧？");var n=t.data("id")||"",s=t.val(),l={content:s,houseId:a};n&&(l.toId=n),$.ajax({url:"/comment/writeComment",type:"GET",data:l,success:function(n){e(n.data),t.val("").attr({placeholder:"你的看法..."}).removeAttr("data-id"),o.removeClass("reply-btn-shine");var a=$("#"+n.lastMsgId);$(".content").scrollTo({toT:a[0].offsetTop,durTime:300}),a.css({background:"#c2e1e1"}).animate({background:"#ffffff"},1400,"ease-out")}})}function e(t){function e(t){return t<10&&(t="0"+t),t}var o="";t.forEach(function(n,a){var s=new Date(n.time);o=s.getFullYear()+"-"+e(s.getMonth()+1)+"-"+e(s.getDate())+" "+e(s.getHours())+":"+e(s.getMinutes()),t[a].time=o}),$(".comments").html(s({datas:t}))}var n=o(1);n(".logged",logStatus);var a=$("#houseId").val();$("i.unlogged").on("tap",function(){location.href="/login"}),$(".goBack").on("tap",function(){location.href="/list"}),$(".info-tabs__tab").tap(function(){$(".content").scrollTo({toT:$($(this).find("a").data("href"))[0].offsetTop,durTime:120})}),$(".collect-icon").on("tap",function(t){if(t.stopPropagation(),logStatus){var e=$(this),o=$(".collect-count");e.hasClass("do-collect")?(e.removeClass("do-collect").addClass("donot-collect"),o.text(parseInt(o.text())-1),$.ajax({url:"/common/collect",type:"GET",data:{type:"0",id:a}})):e.hasClass("donot-collect")&&(e.removeClass("donot-collect").addClass("do-collect"),o.text(parseInt(o.text())+1),$.ajax({url:"/common/collect",type:"GET",data:{type:"1",id:a}}))}else location.href="/login"}),$(".like-icon").on("tap",function(t){if(t.stopPropagation(),logStatus){var e=$(this),o=$(".like-count");e.hasClass("do-like")?(e.removeClass("do-like").addClass("donot-like"),o.text(parseInt(o.text())-1),$.ajax({url:"/common/like",type:"GET",data:{type:"0",id:a}})):e.hasClass("donot-like")&&(e.removeClass("donot-like").addClass("do-like"),o.text(parseInt(o.text())+1),$.ajax({url:"/common/like",type:"GET",data:{type:"1",id:a}}))}else location.href="/login"}),_.templateSettings={evaluate:/{{([\s\S]+?)}}/g,interpolate:/{{=([\s\S]+?)}}/g,escape:/{{-([\s\S]+?)}}/g};var s=_.template($("#commentsTemplate").html());$.ajax({url:"/comment/getComments",type:"GET",data:{houseId:a},success:function(t){e(t)}});var l=$("#comment-input"),i=$(".send-btn");i.tap(function(){t(l,i)}),$(".comments").on("tap",".comments__delete",function(t){console.log($(this).data("id"),$(this).data("toid")),$.ajax({url:"/comment/delComment",type:"GET",data:{id:$(this).data("id"),houseId:a,toId:$(this).data("toid")},success:function(t){e(t)}})});var c=_.template($("#replyTemplate").html());$(".comments").on("click",".comments__item",function(){var e=this;if(!logStatus)return void(location.href="/login");if($(e).find(".comments__delete").length)return void(l.val()||l.attr({placeholder:"你的看法..."}).removeAttr("data-id"));if(!$(this).find("#reply-area").length){$(this).append(c());var o=$("#reply-area textarea"),n=$("#reply-area .reply-btn");$(".content").scrollTop(e.offsetTop),o[0].focus(),o.blur(function(){setTimeout(function(){$("#reply-area").remove()},0)}),o.on("input",function(){o.val().length>2?n.hasClass("reply-btn-shine")||n.addClass("reply-btn-shine"):n.removeClass("reply-btn-shine")}),n.tap(function(){t(o,n)}),setTimeout(function(){o.attr({placeholder:"回复 | "+$(e).data("from")+"说 : "+$(e).find(".comments__content").text().substring(0,20)+"...","data-id":$(e).data("id")})},10)}}),l.on("input",function(){l.val().length>2?i.hasClass("reply-btn-shine")||i.addClass("reply-btn-shine"):i.removeClass("reply-btn-shine")}),logStatus&&$.ajax({url:"/login/getMessageCnt",type:"get",success:function(t){var e=$(".unReadMsgCnt");t.count>0?e.text(t.count).show():e.hide()}})})},function(t,e){var o=function(t,e){e&&$(document).ready(function(){var e=$(".mask--myinfo"),o=$(".myinfo");$(t).tap(function(){$(".unReadMsgCnt").hide(),"none"===e.css("display")?(e.show(),$.ajax({url:"/login/getCollectCnt",type:"get",success:function(t){$($(".myinfo").contents()[0]).find("#mycollect-count").text(t.count)}}),$.ajax({url:"/login/getMessageCnt",type:"get",success:function(t){var e=$($(".myinfo").contents()[0]);e.find("#mymessage-count").text(t.count),t.count>0?e.find(".my-message").addClass("message-tip"):e.find(".my-message").removeClass("message-tip")}}),o.animate({width:"80%"},200,"ease-out")):(e.hide(),$($(".myinfo").contents()[0]).find("#mycollect-count").text(""),o.animate({width:"0"},200,"ease-out"))}),e.on("touchmove",function(t){t.preventDefault()}),e.tap(function(){e.hide(),o.animate({width:"0"},200,"ease-out")}),$(o.prop("contentWindow").document).on("touchmove",function(t){t.preventDefault()})})};t.exports=o}]);