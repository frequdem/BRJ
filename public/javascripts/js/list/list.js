!function(t){function e(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var o=n(1);o(".logged",logStatus),$(document).ready(function(){$("i.unlogged").on("tap",function(){location.href="/login"}),$(".like-icon").on("tap",function(t){if(t.stopPropagation(),$(".login-img").hasClass("unlogged"))location.href="/login";else{var e=$(this);e.hasClass("do-like")?(e.removeClass("do-like").addClass("donot-like"),$.ajax({url:"/common/like",type:"GET",data:{type:"0",id:e.parents(".fy-item").data("id")}})):e.hasClass("donot-like")&&(e.removeClass("donot-like").addClass("do-like"),$.ajax({url:"/common/like",type:"GET",data:{type:"1",id:e.parents(".fy-item").data("id")}}))}}),$(".fy-item").on("tap",function(){var t="/single/single?id="+$(this).data("id");location.href=t})})},function(t,e){var n=function(t,e){e&&$(document).ready(function(){var e=$(".mask--myinfo"),n=$(".myinfo");$(t).tap(function(){"none"===e.css("display")?(e.show(),$.ajax({url:"/login/getCollectCnt",type:"get",success:function(t){$($(".myinfo").contents()[0]).find("#mycollect-count").text(t.count)}}),$.ajax({url:"/login/getMessageCnt",type:"get",success:function(t){var e=$($(".myinfo").contents()[0]);e.find("#mymessage-count").text(t.count),t.count>0?(console.log(e.find(".my-message")),e.find(".my-message").addClass("message-tip")):e.find(".my-message").removeClass("message-tip")}}),n.animate({width:"80%"},200,"ease-out")):(e.hide(),$($(".myinfo").contents()[0]).find("#mycollect-count").text(""),n.animate({width:"0"},200,"ease-out"))}),e.on("touchmove",function(t){t.preventDefault()}),e.tap(function(){e.hide(),n.animate({width:"0"},200,"ease-out")}),$(n.prop("contentWindow").document).on("touchmove",function(t){t.preventDefault()})})};t.exports=n}]);