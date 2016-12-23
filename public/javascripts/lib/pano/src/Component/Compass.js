/**
 * Created by KX on 2016/7/11.
 */
/**
 * Created by KX on 2016/7/8.
 */
require('../Main/Init/Init');
(function ($) {
    PanoAJK.Component.Compass = function(args){ //三个参数分别代表GI核心程序，展示平面图的DOM元素，相机控制器，初始角度与南向的顺时针夹角。
        var rootDom = args.dom;
        var GI = this.GI = args.GI;

        this.ctrller = args.controller;
        this.angleSpan = args.angle;

        this.virtualDom = document.createElement('div');

        //加入指南针框
        var compassImg = new Image();
        var pathSegs = GI.sys.firstPath.split('/');
        compassImg.src = '/images/pano/compass.png';

        var imgId = document.createAttribute('style');
        imgId.nodeValue = 'width:100%;height:100%;';
        compassImg.setAttributeNode(imgId);
        this.virtualDom.appendChild(compassImg);

        //加入指针
        var pointerImg = new Image();

        pointerImg.src = '/images/pano/compassPointer.png';
        var pointerImgId = document.createAttribute('style');
        pointerImgId.nodeValue = 'position:absolute;top:26%;left:30%;width:40%;height : 50%';
        pointerImg.setAttributeNode(pointerImgId);
        this.virtualDom.appendChild(pointerImg);

        var virtualId = document.createAttribute('style');
        virtualId.nodeValue = 'position:relative;width: 100%;height : 100%;';
        this.virtualDom.setAttributeNode(virtualId);
        rootDom.appendChild(this.virtualDom);

        //存储方位点的信息
        var dir = this.ctrller.dir.elements;
        this.dir = [dir[0],dir[2]];

        this.pointerImg = pointerImg;
    };
    PanoAJK.Component.Compass.prototype.update = function(){
        var _this = this;
        var pointerImg = $(_this.pointerImg);

        //更新方向
        var dir = _this.ctrller.dir.elements;
        if(!(dir[0]== _this.dir[0] && dir[2] == _this.dir[2])){

            if(dir[0]>=0){
                pointerImg.css({'transform':'rotate(-'+(Math.acos(_this.ctrller.dirHorizontal.elements[2])*57.3 + _this.angleSpan) + 'deg)'});
            }
            else{
                pointerImg.css({'transform':'rotate('+(Math.acos(_this.ctrller.dirHorizontal.elements[2])*57.3 - _this.angleSpan) + 'deg)'});
            }
            _this.dir = [dir[0],dir[2]];
        }
    }
})(window.jQuery || window.Zepto);