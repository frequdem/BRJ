!function(e){function o(n){if(t[n])return t[n].exports;var s=t[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,o),s.loaded=!0,s.exports}var t={};return o.m=e,o.c=t,o.p="",o(0)}([function(e,o){$(function(){function e(e){n.Core.scaleProjectionMat(e);var o=24*(n.Core.sys.projectionAngle/(120-n.Core.sys.projectionAngle));n.Controller.rotatesp=o>24?24:o,n.Core.sys.showGoods&&n.Core.sys.hasGoods&&n.Core.refreshGoodsPos(n.Controller)}function o(o,t){e(o),$(t).animate({background:"#76B3B4",color:"#eee"},60,function(){setTimeout(function(){$(t).css({background:"#eee",color:"#76B3B4"})},100)}),$(".slider .level-line").css({top:1.1*(n.Core.sys.projectionAngle-15)+"%"})}$("body").on("touchstart",function(e){e.preventDefault()}),$(".goBack").tap(function(){history.back(-1)});var t={GI:{canvas:document.getElementById("canvas"),firstPath:"resource/5842f9fba5ebde0133fe9bca/a/",smoothSwitch:!0,pts:{a:{neighs:{b:[-36.711931,-24.502305,89.732219]},goods:[{pos:[-13.260473251342773,-17.82830238342285,97.50031280517578],info:{name:"油汀",type:"电器",brand:"张工牌"}},{pos:[-15.711931,10.502305,89.732219],info:{name:"书架",type:"书架",brand:"宜家"}},{pos:[-76.02099609375,-20.143152236938477,61.76618576049805],info:{name:"电钢",type:"电器",brand:"YAMAHA"}},{pos:[-54.82075881958008,-42.49707794189453,72.03250885009766],info:{name:"面面",type:"设计师",brand:"温柔牌"}}]},b:{neighs:{a:[70.566856,-36.871385,-60.504709],c:[25.466745376586914,-59.39791488647461,76.31076049804688]},goods:[{pos:[-40.711931,-25.502305,89.732219],info:{name:"面包机",type:"家电",brand:"松下电子"}}]},c:{neighs:{b:[34.341212,-52.466784,77.89684]},goods:[]}}}},n=new PanoAJK.Init(t),s={GI:n.Core,dom:document.getElementById("compass"),controller:n.Controller,angle:98,path:"images/pano/"},a=new PanoAJK.Component.Compass(s);n.addComponent(a),n.draw(),_.templateSettings={evaluate:/{{([\s\S]+?)}}/g,interpolate:/{{=([\s\S]+?)}}/g,escape:/{{-([\s\S]+?)}}/g};var r=_.template($("#alertTpl").html());$("#all-goods-base").on("tap",".good-point",function(e){e.preventDefault(),e.stopPropagation(),$("body").append(r({data:n.Core.sys.pts[n.Core.sys.ptName].goods[parseInt($(this).attr("id"))].info}))}),$("body").on("tap",".close-alert-cross",function(){$(".alert-good-area").remove()}),$("body").longPress(function(e){var o=(new PanoAJK.Math.Matrix4).setInverseOf(n.Core.sys.projection),t=(new PanoAJK.Math.Matrix4).setInverseOf(n.Controller.vmMat4),s=[e.touches[0].clientX,e.touches[0].clientY],a=document.getElementById("canvas"),r=a.getBoundingClientRect(),i=new PanoAJK.Math.Vector3([2*(s[0]-r.left)/a.width-1,1-2*(s[1]-r.top)/a.height,0]),c=t.multiply(o).multiplyVector4(new PanoAJK.Math.Vector4([i.elements[0],i.elements[1],i.elements[2],1])),l=new PanoAJK.Math.Vector3([c.elements[0]/c.elements[3],c.elements[1]/c.elements[3],c.elements[2]/c.elements[3]]),d=l.setLength(100).elements;console.log(d)}),$("#magnifier").on("tap",".larger",function(){o(!0,this)}),$("#magnifier").on("tap",".smaller",function(){o(!1,this)}),$("#isGoodsShowed").tap(function(){var e=$(this).find(".show-goods"),o=$(this).find(".no-show-goods");"none"==o.css("display")?(e.hide(),o.show(),n.Core.sys.showGoods=!1,n.Core.cutOffGoods(400)):(e.show(),o.hide(),n.Core.sys.showGoods=!0,n.Core.cutOnGoods(400));var t=this;$(t).animate({background:"#76B3B4",color:"#eee"},60,function(){setTimeout(function(){$(t).css({background:"#eee",color:"#76B3B4"})},100)})})})}]);