/**
 * Created by KX on 2016/8/9.
 */
require('./PanoAJK.js');
require('../WebGL/math.js');
(function($) {
    var zoomEnd = 0;
    var canvas,_this,GI;
    var moveSt = new PanoAJK.Math.Vector3();
    var moveEnd = new PanoAJK.Math.Vector3();
    var rotateSt = new PanoAJK.Math.Vector3();
    var rotateEnd = new PanoAJK.Math.Vector3();
    var clickPos = [-10000,10000];      //鼠标点击，为了验证mouseup是否与mousedown位置相同。
    var touchSt = [-10000,10000];       //touch点击

    PanoAJK.Main.Controller = function (args) {
        _this = this;
        GI = args.GI;
        var camera = new PanoAJK.Main.Camera(new PanoAJK.Math.Vector3(),new PanoAJK.Math.Vector3([0,0,1]));
        _this.canvas = canvas = GI.sys.canvas;
        _this.rotBool = _this.moveBool = false; //开关
        _this.rotInertia = false;
        _this.DIRHORIZONTAL_UPDATE = true;

        _this.loc = camera.loc;         //相机信息
        _this.tar = camera.tar;
        _this.dir = camera.dir;
        _this.up = camera.up;
        _this.upperLimit = camera.upperLimit || 1;
        _this.lowerLimit = camera.lowerLimit || -1;
        _this.dirHorizontal = new PanoAJK.Math.Vector3();  //相机水平朝向

        _this.movesp = 1;   //速度
        _this.rotatesp = args.rotatesp || 20;
        _this.zoomsp = 1;
        _this.rotInertiasp = args.rotInertiasp || 0.92;  //最大为0.99999
        _this.smooothTime = 5000;

        _this.mouse = [0, 0];   //鼠标滑动的时候，计算鼠标的位置
        _this.clickBool = false;
        _this.smoothRotate = {
            bool: false,
            count: 0,
            step: 0,
            axis: new PanoAJK.Math.Vector3([0, 0, 0]),
            quat: new PanoAJK.Math.Quat(),
            forward1: false,
            forward1Dist: 0,
            forward2: false,
            forward2Dist: 0
        };
        _this.bindEvent();
        _this.update();


    };

    PanoAJK.Main.Controller.prototype = {
        constructor : PanoAJK.Main.Controller,

        bindEvent : function(){
            $(canvas).on('mousedown',_this.mousedown).on('mousemove',_this.mousemove)
                .on('touchstart',_this.touchstart).on('NeighPts.tap',_this.touchtap);


            /* canvas.addEventListener('mousedown',_this.mousedown,false);
             canvas.addEventListener('mousewheel',controller.mousewheel,false);
             canvas.addEventListener('mousemove',_this.mousemove,false);
             canvas.addEventListener('touchstart',_this.touchstart,false);
             $(canvas).on('NeighPts.tap',_this.touchtap);*/
        },

        offEvent : function(){
            $(canvas).off('mousedown',_this.mousedown).off('mousemove',_this.mousemove)
                .off('touchstart',_this.touchstart).off('NeighPts.tap',_this.touchtap);

        },

        update: function () {
            //forwardBackwardCam();
            _this.zoomCam();
            _this.moveCam();
            _this.rotateCamQuat();
            var locEle = _this.loc.elements;
            var tarEle = _this.tar.elements;
            _this.tar.copy(new PanoAJK.Math.Vector3(locEle).add(_this.dir));
            _this.vmMat4 = new PanoAJK.Math.Matrix4().setLookAt(locEle[0], locEle[1], locEle[2], tarEle[0], tarEle[1], tarEle[2], 0, 1, 0);

            //更新水平角
            if (_this.DIRHORIZONTAL_UPDATE) {
                _this.dirHorizontal.elements[0] = _this.dir.elements[0];
                _this.dirHorizontal.elements[2] = _this.dir.elements[2];
                _this.dirHorizontal.normalize();
            }
        },

        zoomCam: function () {
            if (zoomEnd != 0) {
                var zoomChange = _this.zoomsp * zoomEnd;
                _this.loc.add(new PanoAJK.Math.Vector3().copy(_this.dir).setLength(zoomChange));
                zoomEnd = 0;
            }
        },

        moveCam: function () {
            if (moveEnd.elements[0] != moveSt.elements[0] || moveEnd.elements[1] != moveSt.elements[1]) {
                var moveChange = new PanoAJK.Math.Vector3(moveEnd.elements).subtract(moveSt).setLength(_this.dir.length() * _this.movesp);
                var moveChangeMap = new PanoAJK.Math.Vector3([0, 1, 0]).setLength(moveChange.elements[1]);
                moveChangeMap.subtract(new PanoAJK.Math.Vector3([0, 1, 0]).cross(_this.dir).setLength(moveChange.elements[0]));
                _this.loc.add(moveChangeMap);
                _this.tar.add(moveChangeMap);
                moveSt.copy(moveEnd);
            }
        },

        rotateCamQuat: function () {

            var quatRo = new PanoAJK.Math.Quat();

            //旋转惯性
            if (_this.rotInertia) {

                _this.angle = _this.angle * _this.rotInertiasp;


                if (_this.angle < 0.0002) {
                    _this.rotInertia = false;
                }
            } else {
                _this.axis = new PanoAJK.Math.Vector3();
                _this.angle = _this.rotatesp * Math.acos(rotateSt.dot(rotateEnd) / (rotateSt.length() * rotateEnd.length()));
                _this.axis.copy(rotateEnd).cross(rotateSt).normalize();
            }

            if (Math.abs(_this.angle) > 0.0002) {
                quatRo.setFromAxisAngle(_this.axis.elements, -_this.angle);

                _this.dir.applyQuat(quatRo);

                _this.up.applyQuat(quatRo);

                rotateEnd.applyQuat(quatRo);

                rotateSt.copy(rotateEnd);

            }
            //下压效果
            //if(Math.abs(_this.angle) <0.008 && _this.ForwardAlready && _this.mouseUpAlready){
            //    _this.backwardBit = true;
            //}

            /* 非惯性旋转
             var axis = new PanoAJK.Math.Vector3();
             var quatRo = new PanoAJK.Math.Quat();

             var angle = _this.rotatesp*Math.acos(rotateSt.dot(rotateEnd)/(rotateSt.length()*rotateEnd.length()));

             if(Math.abs(angle)>0.0001){
             axis.copy(rotateEnd).cross(rotateSt).normalize();
             quatRo.setFromAxisAngle( axis.elements, -angle );

             _this.dir.applyQuat(quatRo);

             _this.up.applyQuat(quatRo);

             rotateEnd.applyQuat(quatRo);

             rotateSt.copy(rotateEnd);
             }*/
        },      //四元数方法旋转

        mousewheel : function() {
            event.preventDefault();
            event.stopPropagation();
            if (event.wheelDelta) {
                zoomEnd += event.wheelDelta / 40;
            } else if (event.detail) {
                zoomEnd += event.detail / 3;
            }
        },

        mousedown : function(event) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.button) {
                case 0 :
                    rotateSt.copy(_this.getCoordOnBallForPano(event.clientX, event.clientY));
                    rotateEnd.copy(rotateSt);
                    _this.rotBool = true;

                    //惯性效果
                    _this.rotInertia = false;

                    //下压效果
                    //_this.forwardBit = true;
                    //_this.mouseUpAlready = false;

                    clickPos = [event.clientX, event.clientY];
                    break;
                //case 2 :
                //    moveSt.copy(_this.getCoordOnScreen(event.clientX,event.clientY));
                //    moveEnd.copy(moveSt);
                //    _this.moveBool = true;
                //    break;
            }
            $(canvas).on('mouseup',_this.mouseup.bind(null,event))
        },

        mousemove : function(event){
            if (_this.rotBool) {
                rotateEnd.copy(_this.getCoordOnBallForPano(event.clientX, event.clientY));
            } else if (_this.moveBool) {
                moveEnd.copy(_this.getCoordOnScreen(event.clientX, event.clientY));
            } else {
                var cavsBound = canvas.getBoundingClientRect();
                _this.mouse = [(event.clientX - cavsBound.left) * 2 / canvas.width - 1, 1 - (event.clientY - cavsBound.top) * 2 / canvas.height];
            }
        },

        mouseup : function(event){
            event.preventDefault();
            event.stopPropagation();
            switch (event.button) {
                case 0 :
                    _this.rotBool = false;

                    //惯性效果
                    _this.rotInertia = true;

                    /*下压效果
                     _this.mouseUpAlready = true;*/

                    if (Math.abs(clickPos[0] - event.clientX) + Math.abs(clickPos[1] - event.clientY) < 0.1) {
                        clickPos = [10000, 10000];
                        _this.clickBool = true;
                    }
                    break;
                /*  case 2 :
                 _this.moveBool = false;
                 break;*/
            }
            $(canvas).off('mouseup',_this.mouseup.bind(null,event))
        },

        moveToNextpt : function (){

            if (GI.selId != -1 && _this.clickBool) {
                _this.offEvent();
                GI.sys.currentPath = GI.objsToDraw.neighPts.neighPtData.paths[GI.selId];
                GI.cutOffGoods();
                GI.objsToDraw.neighPts.isDrawNeighs = false;
                GI.objsToDraw.skybox.updateTexture(GI.sys.currentPath, false);
                //平滑旋转相机
                var dirNextPt = new PanoAJK.Math.Vector3([GI.objsToDraw.neighPts.neighPtData.positions[GI.selId][0], 0, GI.objsToDraw.neighPts.neighPtData.positions[GI.selId][2]]).normalize();
                if (!_this.smoothRotate.bool) {
                    _this.smoothRotate.axis = new PanoAJK.Math.Vector3().copy(_this.dir);
                    _this.smoothRotate.axis.cross(dirNextPt).normalize();
                    _this.smoothRotate.step = Math.acos(_this.dir.dot(dirNextPt)) / 20;
                    _this.smoothRotate.quat.setFromAxisAngle(_this.smoothRotate.axis.elements, _this.smoothRotate.step);
                    _this.smoothRotate.bool = true;
                }
            }

            if (_this.smoothRotate.bool && GI.objsToDraw.skybox.imgLoadedBool) {
                if (_this.smoothRotate.count < 20) {

                    _this.dir.applyQuat(_this.smoothRotate.quat);
                    _this.smoothRotate.count += 1;
                } else {
                    _this.tar.copy(_this.dir);
                    _this.smoothRotate.count = 0;
                    _this.smoothRotate.bool = false;
                    _this.smoothRotate.forward1 = true;
                    _this.smoothRotate.forward1Dist = _this.smoothRotate.forward2Dist = 0;
                }
            } else if (_this.smoothRotate.forward1) {
                _this.loc.add(new PanoAJK.Math.Vector3().copy(_this.dir).setLength(1.2));
                _this.smoothRotate.forward1Dist += 1.2;
                GI.sys.cubeProgram.switchRatio = _this.smoothRotate.forward1Dist / 36;
                GI.sys.cubeProgram.switchRatio = GI.sys.cubeProgram.switchRatio > 0.92 ? 1.0 : GI.sys.cubeProgram.switchRatio;

                if (_this.smoothRotate.forward1Dist == 36) {
                    GI.objsToDraw.skybox.applyTexture(GI.sys.currentPath);
                    _this.smoothRotate.forward1 = false;
                    _this.smoothRotate.forward2 = true;
                    _this.loc.setLength(90).reverse();
                }

            } else if (_this.smoothRotate.forward2) {

                _this.loc.add(new PanoAJK.Math.Vector3().copy(_this.dir).setLength(3));
                _this.smoothRotate.forward2Dist += 3;
                GI.sys.cubeProgram.switchRatio = 1 - _this.smoothRotate.forward2Dist / 90;
                GI.sys.cubeProgram.switchRatio = GI.sys.cubeProgram.switchRatio > 0.92 ? 1.0 : GI.sys.cubeProgram.switchRatio;
                if (_this.smoothRotate.forward2Dist == 90) {
                    GI.sys.cubeProgram.switchRatio = 0.0;
                    _this.smoothRotate.forward2 = false;
                    _this.loc = new PanoAJK.Math.Vector3();
                    _this.bindEvent();
                    //更新全景相邻点位
                    GI.objsToDraw.neighPts.updateDate();
                    GI.objsToDraw.neighPts.isDrawNeighs = true;
                    if (GI.sys.hasGoods) {
                        GI.updateGoodsPos();
                        GI.updateGoodsDom();
                        GI.cutOffGoods(0);
                        console.log(0);
                        if (GI.sys.showGoods) {
                            console.log(1);                     
                            setTimeout(function() {
                                GI.cutOnGoods(400);
                            },0);
                        }
                    }
                }
            }

            _this.clickBool = false;
        },

        touchstart : function (event){
            var eventTargets = event.changedTouches;
            switch (eventTargets.length) {
                case 1:
                    rotateSt.copy(_this.getCoordOnBallForPano(eventTargets[0].clientX, eventTargets[0].clientY));
                    rotateEnd.copy(rotateSt);
                    _this.rotBool = true;
                    _this.rotInertia = false;
                    touchSt = [eventTargets[0].clientX, eventTargets[0].clientY];
                    break;

                case 2:

                    break;
            }
            $(canvas).on('touchmove', _this.touchmove).on('touchend', _this.touchend);

        },

        touchmove : function (event){
            var eventTargets = event.changedTouches;
            switch (eventTargets.length) {
                case 1:
                    if (_this.rotBool) {
                        rotateEnd.copy(_this.getCoordOnBallForPano(eventTargets[0].clientX, eventTargets[0].clientY));
                    }
                    break;
                case 2:
                    break;
            }
        },

        touchend : function(event){
            var eventTargets = event.changedTouches;
            switch (eventTargets.length) {
                case 1:
                    _this.rotBool = false;
                    _this.rotInertia = true;
                    if (Math.abs(touchSt[0] - eventTargets[0].clientX) + Math.abs(touchSt[1] - eventTargets[0].clientY) < 0.12) {
                        _this.clickBool = true;
                        var cavsBound = canvas.getBoundingClientRect();
                        _this.mouse = [(eventTargets[0].clientX - cavsBound.left) * 2 / canvas.width - 1, 1 - (eventTargets[0].clientY - cavsBound.top) * 2 / canvas.height];
                        touchSt = [10000, 10000];
                        $('canvas').trigger('NeighPts.tap');
                    }
                    break;
                case 2:
                    break;
            }
            $(canvas).off('touchmove', _this.touchmove).off('touchend', _this.touchend);
        },

        touchtap : function(event){
            GI.objsToDraw.neighPts.shine();
        },

        getCoordOnBallForPano : function(pagex, pagey){

            var vec1 = new PanoAJK.Math.Vector3([0, 1, 0]);
            var vec2 = new PanoAJK.Math.Vector3([0, 1, 0]);
            var cavsBound = canvas.getBoundingClientRect();

            var coordOnBall = new PanoAJK.Math.Vector3([((pagex - cavsBound.left) - 0.5 * canvas.width) / (GI.sys.canvasObject.halfDiagonal),
                ((pagey - cavsBound.top) - 0.5 * canvas.height  ) / (GI.sys.canvasObject.halfDiagonal), 0]);

            var length = coordOnBall.length();
            if (length > 1) {
                coordOnBall.normalize();
            } else {
                coordOnBall.elements[2] = Math.sqrt(1 - length * length);
            }
            vec1.setLength(coordOnBall.elements[1]);
            vec1.add(vec2.cross(_this.dir).setLength(coordOnBall.elements[0]));
            vec1.add(vec2.copy(_this.dir).setLength(coordOnBall.elements[2]));
            return vec1;
        },

        getCoordOnScreen : function(pagex, pagey){
            var cavsBound = canvas.getBoundingClientRect();
            return new PanoAJK.Math.Vector3([(pagex - cavsBound.left) / canvas.width, (pagey - cavsBound.top) / canvas.height, 0]);
        },

        forwardBackwardCam: function () {
            //点击全景时，下压效果。
            var deepVec;
            if (_this.forwardBit) {
                deepVec = new PanoAJK.Math.Vector3().copy(_this.dir).setLength(_this.deepTouch); // 下压深度
                deepVec.reverse();
                _this.loc.add(deepVec);
                _this.tar.add(deepVec);
                _this.forwardBit = false;
                _this.ForwardAlready = true;
            }

            //全景下压效果收回
            if (_this.backwardBit) {
                deepVec = new PanoAJK.Math.Vector3().copy(_this.dir).setLength(_this.deepTouch * 0.08);
                _this.loc.add(deepVec);
                _this.tar.add(deepVec);
                if (_this.loc.length() > _this.deepTouch) {
                    _this.backwardBit = false;
                    _this.ForwardAlready = false;
                }
            }
        },

        rotateCamMatrix: function () {
            var axis = new PanoAJK.Math.Vector3();
            var matrixRo = new PanoAJK.Math.Matrix4();
            var angle = _this.rotatesp * Math.acos(rotateSt.dot(rotateEnd) / (rotateSt.length() * rotateEnd.length()));
            if (Math.abs(angle) > 0.001) {
                axis.copy(rotateEnd).cross(rotateSt).normalize();

                matrixRo.setRotate(-angle, axis.elements[0], axis.elements[1], axis.elements[2]);

                var dir = new PanoAJK.Math.Vector3();
                dir.copy(_this.dir);
                _this.dir = new PanoAJK.Math.Matrix4(matrixRo).multiplyVector3(_this.dir);
                if (_this.dir.elements[1] <= _this.lowerLimit || _this.dir.elements[1] >= _this.upperLimit) {
                    _this.dir = dir;
                } else {
                    _this.up = new PanoAJK.Math.Matrix4(matrixRo).multiplyVector3(_this.up);
                }
                rotateEnd = new PanoAJK.Math.Matrix4(matrixRo).multiplyVector3(rotateEnd);
                rotateSt.copy(rotateEnd);
            }
        },   //Matrix方法进行旋转

        getDirHorizon : function(){
            return _this.dirHorizontal;
        }
    }
})(window.jQuery || window.Zepto);

