!function(o){function n(e){if(t[e])return t[e].exports;var a=t[e]={exports:{},id:e,loaded:!1};return o[e].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}var t={};return n.m=o,n.c=t,n.p="",n(0)}([function(o,n,t){var e=t(1);e(".logged"),$(document).ready(function(){$("i.unlogged").on("tap",function(){location.href="/login"}),$(".like-icon").on("tap",function(o){if(o.stopPropagation(),$(".login-img").hasClass("unlogged"))location.href="/login";else{var n=$(this);n.hasClass("do-like")?(n.removeClass("do-like").addClass("donot-like"),$.ajax({url:"/common/like",type:"GET",data:{type:"0",id:n.parents(".fy-item").data("id")}})):n.hasClass("donot-like")&&(n.removeClass("donot-like").addClass("do-like"),$.ajax({url:"/common/like",type:"GET",data:{type:"1",id:n.parents(".fy-item").data("id")}}))}}),$(".fy-item").on("tap",function(){var o="/single/single?id="+$(this).data("id");location.href=o})})},function(o,n){var t=function(o){$(document).ready(function(){var n=$(".mask--myinfo"),t=$(".myinfo");$(o).tap(function(){"none"===n.css("display")?(n.show(),t.animate({width:"80%"},200,"ease-out")):(n.hide(),t.animate({width:"0"},200,"ease-out"))}),n.on("touchmove",function(o){o.preventDefault()}),$(t.prop("contentWindow").document).on("touchmove",function(o){o.preventDefault()})})};o.exports=t}]);