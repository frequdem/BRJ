!function(t){function e(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){$(function(){function t(t,n){if(!logStatus)return void(location.href="/login");if(t.val().length<3)return void alert("起码要说三个字吧？");var o=t.data("id")||"",s=t.val(),l={content:s,houseId:a};o&&(l.toId=o),$.ajax({url:"/comment/writeComment",type:"GET",data:l,success:function(o){e(o.data),t.val("").attr({placeholder:"你的看法..."}).removeAttr("data-id"),n.removeClass("reply-btn-shine");var a=$("#"+o.lastMsgId);$(".content").scrollTo({toT:a[0].offsetTop,durTime:300}),a.css({background:"#c2e1e1"}).animate({background:"#ffffff"},1400,"ease-out")}})}function e(t){function e(t){return t<10&&(t="0"+t),t}var n="";t.forEach(function(o,a){var s=new Date(o.time);n=s.getFullYear()+"-"+e(s.getMonth()+1)+"-"+e(s.getDate())+" "+e(s.getHours())+":"+e(s.getMinutes()),t[a].time=n}),$(".comments").html(s({datas:t}))}var o=n(1);o(".logged",logStatus);var a=$("#houseId").val();$("i.unlogged").on("tap",function(){location.href="/login"}),$(".goBack").on("tap",function(){location.href="/list"}),$(".info-tabs__tab").tap(function(){$(".content").scrollTo({toT:$($(this).find("a").data("href"))[0].offsetTop,durTime:120})}),$(".collect-icon").on("tap",function(t){if(t.stopPropagation(),logStatus){var e=$(this),n=$(".collect-count");e.hasClass("do-collect")?(e.removeClass("do-collect").addClass("donot-collect"),n.text(parseInt(n.text())-1),$.ajax({url:"/common/collect",type:"GET",data:{type:"0",id:a}})):e.hasClass("donot-collect")&&(e.removeClass("donot-collect").addClass("do-collect"),n.text(parseInt(n.text())+1),$.ajax({url:"/common/collect",type:"GET",data:{type:"1",id:a}}))}else location.href="/login"}),$(".like-icon").on("tap",function(t){if(t.stopPropagation(),logStatus){var e=$(this),n=$(".like-count");e.hasClass("do-like")?(e.removeClass("do-like").addClass("donot-like"),n.text(parseInt(n.text())-1),$.ajax({url:"/common/like",type:"GET",data:{type:"0",id:a}})):e.hasClass("donot-like")&&(e.removeClass("donot-like").addClass("do-like"),n.text(parseInt(n.text())+1),$.ajax({url:"/common/like",type:"GET",data:{type:"1",id:a}}))}else location.href="/login"}),_.templateSettings={evaluate:/{{([\s\S]+?)}}/g,interpolate:/{{=([\s\S]+?)}}/g,escape:/{{-([\s\S]+?)}}/g};var s=_.template($("#commentsTemplate").html());$.ajax({url:"/comment/getComments",type:"GET",data:{houseId:a},success:function(t){e(t)}});var l=$("#comment-input"),i=$(".send-btn");i.tap(function(){t(l,i)}),$(".comments").on("tap",".comments__delete",function(t){console.log($(this).data("id"),$(this).data("toid")),$.ajax({url:"/comment/delComment",type:"GET",data:{id:$(this).data("id"),houseId:a,toId:$(this).data("toid")},success:function(t){e(t)}})});var c=_.template($("#replyTemplate").html());$(".comments").on("click",".comments__item",function(){var e=this;if(!logStatus)return void(location.href="/login");if(!$(e).find(".comments__delete").length&&!$(e).find(".reply-btn").length){if($(this).find(".reply-area").length)return void $(".reply-area textarea").focus();$(".reply-area").length&&$(".reply-area").remove(),$(this).append(c());var n=$(".reply-area textarea"),o=$(".reply-area .reply-btn");$(".content").scrollTop(e.offsetTop),n[0].focus(),n.on("input",function(){n.val().length>2?o.hasClass("reply-btn-shine")||o.addClass("reply-btn-shine"):o.removeClass("reply-btn-shine")}),o.tap(function(){t(n,o)}),setTimeout(function(){n.attr({placeholder:"回复 | "+$(e).data("from")+"说 : "+$(e).find(".comments__content").text().substring(0,20)+"...","data-id":$(e).data("id")})},10)}}),l.on("input",function(){l.val().length>2?i.hasClass("reply-btn-shine")||i.addClass("reply-btn-shine"):i.removeClass("reply-btn-shine")}),logStatus&&$.ajax({url:"/login/getMessageCnt",type:"get",success:function(t){var e=$(".login-img.logged");t.count>0&&e.append('<span class="unReadMsgCnt">'+t.count+"</span>")}}),$(".play-icon").on("tap",function(){var t=this;$(t).animate({background:"#fff",color:"#76B3B4"},"ease",300),setTimeout(function(){window.location.href=$(t).data("href")},300)})})},function(t,e){var n=function(t,e){e&&$(document).ready(function(){var e=$(".mask--myinfo"),n=$(".myinfo");$(t).tap(function(){$(".unReadMsgCnt").hide(),"none"===e.css("display")?(e.show(),$.ajax({url:"/login/getCollectCnt",type:"get",success:function(t){$($(".myinfo").contents()[0]).find("#mycollect-count").text(t.count)}}),$.ajax({url:"/login/getMessageCnt",type:"get",success:function(t){var e=$($(".myinfo").contents()[0]);e.find("#mymessage-count").text(t.count),t.count>0?e.find(".my-message").addClass("message-tip"):e.find(".my-message").removeClass("message-tip")}}),n.animate({width:"80%"},200,"ease-out")):(e.hide(),$($(".myinfo").contents()[0]).find("#mycollect-count").text(""),n.animate({width:"0"},200,"ease-out"))}),e.on("touchmove",function(t){t.preventDefault()}),e.tap(function(){e.hide(),n.animate({width:"0"},200,"ease-out")}),$(n.prop("contentWindow").document).on("touchmove",function(t){t.preventDefault()})})};t.exports=n}]);