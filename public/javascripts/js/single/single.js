!function(t){function e(n){if(o[n])return o[n].exports;var a=o[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){var n=o(1);n(".logged",logStatus),$(document).ready(function(){function t(t){function e(t){return t<10&&(t="0"+t),t}var n="";t.forEach(function(o,a){var s=new Date(o.time);n=s.getFullYear()+"-"+e(s.getMonth()+1)+"-"+e(s.getDate())+" "+e(s.getHours())+":"+e(s.getMinutes()),t[a].time=n}),$(".comments").html(o({datas:t}))}var e=$("#houseId").val();$("i.unlogged").on("tap",function(){location.href="/login"}),$(".goBack").on("tap",function(){location.href="/list"}),$(".info-tabs__tab").tap(function(){$(window).scrollTo({toT:$($(this).find("a").data("href")).offset().top,durTime:120})}),$(".collect-icon").on("tap",function(t){if(t.stopPropagation(),logStatus){var o=$(this),n=$(".collect-count");o.hasClass("do-collect")?(o.removeClass("do-collect").addClass("donot-collect"),n.text(parseInt(n.text())-1),$.ajax({url:"/common/collect",type:"GET",data:{type:"0",id:e}})):o.hasClass("donot-collect")&&(o.removeClass("donot-collect").addClass("do-collect"),n.text(parseInt(n.text())+1),$.ajax({url:"/common/collect",type:"GET",data:{type:"1",id:e}}))}else location.href="/login"}),$(".like-icon").on("tap",function(t){if(t.stopPropagation(),logStatus){var o=$(this),n=$(".like-count");o.hasClass("do-like")?(o.removeClass("do-like").addClass("donot-like"),n.text(parseInt(n.text())-1),$.ajax({url:"/common/like",type:"GET",data:{type:"0",id:e}})):o.hasClass("donot-like")&&(o.removeClass("donot-like").addClass("do-like"),n.text(parseInt(n.text())+1),$.ajax({url:"/common/like",type:"GET",data:{type:"1",id:e}}))}else location.href="/login"}),_.templateSettings={evaluate:/{{([\s\S]+?)}}/g,interpolate:/{{=([\s\S]+?)}}/g,escape:/{{-([\s\S]+?)}}/g};var o=_.template($("#commentsTemplate").html());$.ajax({url:"/comment/getComments",type:"GET",data:{houseId:e},success:function(e){t(e)}});var n=$("#comment-input"),a=$(".reply-btn");a.tap(function(){if(!logStatus)return void(location.href="/login");if(n.val().length<3)return void alert("起码要说三个字吧？");var o=n.data("id")||"",s=n.val(),i={content:s,houseId:e};o&&(i.toId=o),$.ajax({url:"/comment/writeComment",type:"GET",data:i,success:function(e){t(e.data),n.val("").attr({placeholder:"你的看法..."}).removeAttr("data-id"),a.removeClass("reply-btn-shine");var o=$("#"+e.lastMsgId);$(window).scrollTo({toT:o.offset().top,durTime:300}),o.css({background:"#c2e1e1"}).animate({background:"#ffffff"},1400,"ease-out")}})}),$(".comments").on("tap",".comments__delete",function(o){$(this).parents(".comments__item").addClass("tap-from-delete"),$.ajax({url:"/comment/delComment",type:"GET",data:{id:$(this).data("id"),houseId:e,toId:$(this).data("toId")},success:function(e){t(e)}})}),$(".comments").on("click",".comments__item",function(){var t=this;return $(t).find(".comments__delete").length?void(n.val()||n.attr({placeholder:"你的看法..."}).removeAttr("data-id")):(n[0].focus(),void setTimeout(function(){if(!$(t).hasClass("tap-from-delete")){if(!logStatus)return void(location.href="/login");$(window).scrollTo({toT:$("#comments").offset().top,durTime:120}),setTimeout(function(){n.attr({placeholder:"回复 | "+$(t).data("from")+"说 : "+$(t).find(".comments__content").text().substring(0,20)+"...","data-id":$(t).data("id")})},100)}},0))}),n.blur(function(){$(this).val()||n.attr({placeholder:"你的看法..."}).removeAttr("data-id")}),n.on("input",function(){n.val().length>2?a.hasClass("reply-btn-shine")||a.addClass("reply-btn-shine"):a.removeClass("reply-btn-shine")})})},function(t,e){var o=function(t,e){e&&$(document).ready(function(){var e=$(".mask--myinfo"),o=$(".myinfo");$(t).tap(function(){"none"===e.css("display")?(e.show(),$.ajax({url:"/login/getCollectCnt",type:"get",success:function(t){$($(".myinfo").contents()[0]).find("#mycollect-count").text(t.count)}}),$.ajax({url:"/login/getMessageCnt",type:"get",success:function(t){var e=$($(".myinfo").contents()[0]);e.find("#mymessage-count").text(t.count),t.count>0?e.find(".my-message").addClass("message-tip"):e.find(".my-message").removeClass("message-tip")}}),o.animate({width:"80%"},200,"ease-out")):(e.hide(),$($(".myinfo").contents()[0]).find("#mycollect-count").text(""),o.animate({width:"0"},200,"ease-out"))}),e.on("touchmove",function(t){t.preventDefault()}),e.tap(function(){e.hide(),o.animate({width:"0"},200,"ease-out")}),$(o.prop("contentWindow").document).on("touchmove",function(t){t.preventDefault()})})};t.exports=o}]);