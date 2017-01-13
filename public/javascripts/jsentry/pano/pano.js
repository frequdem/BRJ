$(function() {
	$('body').on('touchstart', function(e) {
		e.preventDefault();
	});
	$('.goBack').tap(function() {
		history.back(-1);
	});


    var settings = {
        GI:{
            canvas : document.getElementById('canvas'),
            firstPath : "resource/5842f9fba5ebde0133fe9bca/a/",
            smoothSwitch : true,
            pts: {
                a: {
                    neighs: {
                        b: [-36.711931,-24.502305,89.732219]
                    },
                    goods: [{
                        pos: [-13.260473251342773, -17.82830238342285, 97.50031280517578],
                        info: {
                            name: '油汀',
                            type: '电器',
                            brand: '张工牌'
                        }
                    },{
                        pos: [-15.711931,10.502305,89.732219],
                        info: {
                            name: '书架',
                            type: '书架',
                            brand: '宜家'
                        }
                    },{
                        pos: [-76.02099609375, -20.143152236938477, 61.76618576049805],
                        info: {
                            name: '电钢',
                            type: '电器',
                            brand: 'YAMAHA'
                        }
                    },{
                        pos: [-54.82075881958008, -42.49707794189453, 72.03250885009766],
                        info: {
                            name: '面面',
                            type: '设计师',
                            brand: '温柔牌'
                        }
                        
                    }]
                },
                b: {
                    neighs: {
                        a: [70.566856,-36.871385,-60.504709],
                        c: [25.466745376586914, -59.39791488647461, 76.31076049804688]
                    },
                    goods: [{
                        pos: [-40.711931,-25.502305,89.732219],
                        info: {
                            name: '面包机',
                            type: '家电',
                            brand: '松下电子'
                        }
                    }]
                },
                c: {
                    neighs: {
                        b: [34.341212,-52.466784,77.89684]
                    },
                    goods: []
                }                
            }
        }
    };
    var qj = new PanoAJK.Init(settings);

    var argsForCompass = {
        GI : qj.Core,
        dom : document.getElementById('compass'),
        controller : qj.Controller,
        angle : 98,
        path: 'images/pano/'
    };
    var compass = new PanoAJK.Component.Compass(argsForCompass);
    qj.addComponent(compass);
    qj.draw();

    //物品部分
    //标注点闪烁
    // qj.Core.goodPtShine();
    _.templateSettings = {
        evaluate    : /{{([\s\S]+?)}}/g,
        interpolate : /{{=([\s\S]+?)}}/g,
        escape      : /{{-([\s\S]+?)}}/g
    };
    var alertTemplate = _.template($('#alertTpl').html());
    $('#all-goods-base').on('tap', '.good-point', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').append(alertTemplate({data: qj.Core.sys.pts[qj.Core.sys.ptName].goods[parseInt($(this).attr('id'))].info}));
    })
    $('body').on('tap', '.close-alert-cross', function() {
        $('.alert-good-area').remove();
    })

    //长按显示朝向坐标；
    $('body').longPress(function(e){
        var persMat = new PanoAJK.Math.Matrix4().setInverseOf(qj.Core.sys.projection);
        var viewMat = new PanoAJK.Math.Matrix4().setInverseOf(qj.Controller.vmMat4);
        var target = [e.touches[0].clientX, e.touches[0].clientY];
        var canvas = document.getElementById('canvas');
        var cavsBound = canvas.getBoundingClientRect();
        var screenAxis = new PanoAJK.Math.Vector3([(target[0] - cavsBound.left) * 2 / canvas.width - 1, 1 - (target[1] - cavsBound.top) * 2 / canvas.height, 0]);
        var ptt = viewMat.multiply(persMat).multiplyVector4(new PanoAJK.Math.Vector4([screenAxis.elements[0], screenAxis.elements[1], screenAxis.elements[2], 1]));
        var pttt = new PanoAJK.Math.Vector3([ptt.elements[0]/ptt.elements[3], ptt.elements[1]/ptt.elements[3], ptt.elements[2]/ptt.elements[3]]);
        var ptttt = pttt.setLength(100).elements;
        console.log(ptttt);
    });

    /**
    * 缩放时更改旋转速度刷新商品
    * @param {Boolean} bool - true表示放大，false表示缩小
    * @return 
    */
    function scaleProjectionAndSpeedAndGoods(bool) {
        qj.Core.scaleProjectionMat(bool);
        var speed = 24 * (qj.Core.sys.projectionAngle / (120 - qj.Core.sys.projectionAngle));
        qj.Controller.rotatesp =  speed > 24 ? 24 : speed;
        if (qj.Core.sys.showGoods &&  qj.Core.sys.hasGoods) {
                qj.Core.refreshGoodsPos(qj.Controller);
            }
    }
    /**
    * 缩放时按钮闪烁
    * @param {Boolean} bool - true表示放大，false表示缩小
    * @return 
    */
    function scaleAndBlink(bool, ele) {
        scaleProjectionAndSpeedAndGoods(bool);
        $(ele).animate({'background': '#76B3B4', 'color': '#eee'}, 60,function() {
            setTimeout(function() {
                $(ele).css({'background': '#eee', 'color': '#76B3B4'});
            }, 100);
        });
        $('.slider .level-line').css({'top': (qj.Core.sys.projectionAngle-15) *1.1 + '%'});
    }
    $('#magnifier').on('tap', '.larger', function() {
        scaleAndBlink(true, this);
        
    });
    $('#magnifier').on('tap', '.smaller', function() {
        scaleAndBlink(false, this);
    });


    //商品开关
    $('#isGoodsShowed').tap(function() {
        var showJq = $(this).find('.show-goods');
        var noShowJq = $(this).find('.no-show-goods');  
        if (noShowJq.css('display') == 'none') {
            showJq.hide();
            noShowJq.show();
            qj.Core.sys.showGoods = false;            
            qj.Core.cutOffGoods(400);
        } else {
            showJq.show();
            noShowJq.hide();
            qj.Core.sys.showGoods = true;            
            qj.Core.cutOnGoods(400);
        }
        var ele = this;
        $(ele).animate({'background': '#76B3B4', 'color': '#eee'}, 60,function() {
            setTimeout(function() {
                $(ele).css({'background': '#eee', 'color': '#76B3B4'});
            }, 100);
        });
    });    

})