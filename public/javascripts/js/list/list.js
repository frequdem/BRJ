!function(t){function o(e){if(n[e])return n[e].exports;var a=n[e]={exports:{},id:e,loaded:!1};return t[e].call(a.exports,a,a.exports,o),a.loaded=!0,a.exports}var n={};return o.m=t,o.c=n,o.p="",o(0)}([function(t,o,n){var e=n(1);e(".logged",logStatus),$(document).ready(function(){$("i.unlogged").on("tap",function(){location.href="/login"}),$(".like-icon").on("tap",function(t){if(t.stopPropagation(),$(".login-img").hasClass("unlogged"))location.href="/login";else{var o=$(this);o.hasClass("do-like")?(o.removeClass("do-like").addClass("donot-like"),$.ajax({url:"/common/like",type:"GET",data:{type:"0",id:o.parents(".fy-item").data("id")}})):o.hasClass("donot-like")&&(o.removeClass("donot-like").addClass("do-like"),$.ajax({url:"/common/like",type:"GET",data:{type:"1",id:o.parents(".fy-item").data("id")}}))}}),$(".fy-item").on("tap",function(){var t="/single/single?id="+$(this).data("id");location.href=t})})},function(t,o){var n=function(t,o){o&&$(document).ready(function(){var o=$(".mask--myinfo"),n=$(".myinfo");$(t).tap(function(){"none"===o.css("display")?(n.attr("src",n.attr("src")),o.show(),n.animate({width:"80%"},200,"ease-out")):(o.hide(),n.animate({width:"0"},200,"ease-out"))}),o.on("touchmove",function(t){t.preventDefault()}),o.tap(function(){o.hide(),n.animate({width:"0"},200,"ease-out")}),$(n.prop("contentWindow").document).on("touchmove",function(t){t.preventDefault()})})};t.exports=n}]);