/**
 * Created by KX on 2016/8/10.
 */
require('./PanoAJK.js');
require('../WebGL/WebGLContext.js');
require('../WebGL/math.js');
(function($){
    var GI,
        gl,
        program;

    var aNeighCoordsLoc,
        uNeighViewMatLoc,
        uNeighProjectionLoc,
        uNeighAlphaLoc,
        aIdCurLoc,
        uIdSelLoc;

    var _this;

    PanoAJK.Main.NeighPts = function(GIcontext) {
        GI = GIcontext;
        gl = GI.sys.gl;
        _this = this;

        var shaderDates = {
            vShaderId : "vNeighshader",
            fShaderId : "fNeighshader"
        };

        program = GI.sys.neighProgram = GI.sys.WebGLContext.createProgramComplete(gl, shaderDates.vShaderId, shaderDates.fShaderId);
        gl.useProgram(program);//使用着色器程序
        aNeighCoordsLoc = gl.getAttribLocation(program, "aCoords");//获取着色器中各变量的Location
        uNeighViewMatLoc = gl.getUniformLocation(program, "uViewMat");
        uNeighProjectionLoc = gl.getUniformLocation(program, "uProjection");
        uNeighAlphaLoc = gl.getUniformLocation(program, "uAlpha");
        aIdCurLoc = gl.getAttribLocation(program, "aIdCur");
        uIdSelLoc = gl.getUniformLocation(program, "uIdSel");

        _this.neighPtData = {
            'vertexPositions': [
                4.59, 0.0, 0.0, 4.58, 0.0, 0.41, 4.52, 0.0, 0.84, 4.42, 0.0, 1.26, 4.27, 0.0, 1.69, 4.08, 0.0, 2.11, 3.85, 0.0, 2.51, 3.57, 0.0, 2.9, 3.25, 0.0, 3.25, 2.9, 0.0, 3.57, 2.51, 0.0, 3.85, 2.11, 0.0, 4.08, 1.69, 0.0, 4.27, 1.26, 0.0, 4.42, 0.84, 0.0, 4.52, 0.41, 0.0, 4.58, 0.0, 0.0, 4.59, -0.41, 0.0, 4.58, -0.84, 0.0, 4.52, -1.26, 0.0, 4.42, -1.69, 0.0, 4.27, -2.11, 0.0, 4.08, -2.51, 0.0, 3.85, -2.9, 0.0, 3.57, -3.25, 0.0, 3.25, -3.57, 0.0, 2.9, -3.85, 0.0, 2.51, -4.08, 0.0, 2.11, -4.27, 0.0, 1.69, -4.42, 0.0, 1.26, -4.52, 0.0, 0.84, -4.58, 0.0, 0.41, -4.59, 0.0, 0.0, -4.58, 0.0, -0.41, -4.52, 0.0, -0.84, -4.42, 0.0, -1.26, -4.27, 0.0, -1.69, -4.08, 0.0, -2.11, -3.85, 0.0, -2.51, -3.57, 0.0, -2.9, -3.25, 0.0, -3.25, -2.9, 0.0, -3.57, -2.51, 0.0, -3.85, -2.11, 0.0, -4.08, -1.69, 0.0, -4.27, -1.26, 0.0, -4.42, -0.84, 0.0, -4.52, -0.41, 0.0, -4.58, 0.0, 0.0, -4.59, 0.41, 0.0, -4.58, 0.84, 0.0, -4.52, 1.26, 0.0, -4.42, 1.69, 0.0, -4.27, 2.11, 0.0, -4.08, 2.51, 0.0, -3.85, 2.9, 0.0, -3.57, 3.25, 0.0, -3.25, 3.57, 0.0, -2.9, 3.85, 0.0, -2.51, 4.08, 0.0, -2.11, 4.27, 0.0, -1.69, 4.42, 0.0, -1.26, 4.52, 0.0, -0.84, 4.58, 0.0, -0.41, 2.65, 0.0, 0.0, 2.64, 0.0, -0.24, 2.61, 0.0, -0.48, 2.55, 0.0, -0.73, 2.47, 0.0, -0.98, 2.36, 0.0, -1.22, 2.22, 0.0, -1.45, 2.06, 0.0, -1.67, 1.88, 0.0, -1.88, 1.67, 0.0, -2.06, 1.45, 0.0, -2.22, 1.22, 0.0, -2.36, 0.98, 0.0, -2.47, 0.73, 0.0, -2.55, 0.48, 0.0, -2.61, 0.24, 0.0, -2.64, 0.0, 0.0, -2.65, -0.24, 0.0, -2.64, -0.48, 0.0, -2.61, -0.73, 0.0, -2.55, -0.98, 0.0, -2.47, -1.22, 0.0, -2.36, -1.45, 0.0, -2.22, -1.67, 0.0, -2.06, -1.88, 0.0, -1.88, -2.06, 0.0, -1.67, -2.22, 0.0, -1.45, -2.36, 0.0, -1.22, -2.47, 0.0, -0.98, -2.55, 0.0, -0.73, -2.61, 0.0, -0.48, -2.64, 0.0, -0.24, -2.65, 0.0, 0.0, -2.64, 0.0, 0.24, -2.61, 0.0, 0.48, -2.55, 0.0, 0.73, -2.47, 0.0, 0.98, -2.36, 0.0, 1.22, -2.22, 0.0, 1.45, -2.06, 0.0, 1.67, -1.88, 0.0, 1.88, -1.67, 0.0, 2.06, -1.45, 0.0, 2.22, -1.22, 0.0, 2.36, -0.98, 0.0, 2.47, -0.73, 0.0, 2.55, -0.48, 0.0, 2.61, -0.24, 0.0, 2.64, 0.0, 0.0, 2.65, 0.24, 0.0, 2.64, 0.48, 0.0, 2.61, 0.73, 0.0, 2.55, 0.98, 0.0, 2.47, 1.22, 0.0, 2.36, 1.45, 0.0, 2.22, 1.67, 0.0, 2.06, 1.88, 0.0, 1.88, 2.06, 0.0, 1.67, 2.22, 0.0, 1.45, 2.36, 0.0, 1.22, 2.47, 0.0, 0.98, 2.55, 0.0, 0.73, 2.61, 0.0, 0.48, 2.64, 0.0, 0.24,
            ],
            'indices': [
                90, 37, 38, 36, 37, 91, 38, 89, 90, 41, 88, 40, 89, 38, 39, 39, 40, 88, 87, 41, 42, 90, 91, 37, 94, 95, 34, 32, 33, 95, 34, 95, 33, 93, 34, 35, 92, 93, 36, 34, 93, 94, 36, 93, 35, 92, 36, 91, 44, 45, 84, 43, 44, 84, 46, 82, 45, 81, 47, 48, 48, 80, 81, 80, 48, 49, 82, 46, 47, 81, 82, 47, 86, 87, 42, 88, 89, 39, 87, 88, 41, 45, 82, 83, 43, 84, 85, 45, 83, 84, 85, 86, 43, 42, 43, 86, 31, 32, 96, 95, 96, 32, 31, 98, 30, 97, 31, 96, 31, 97, 98, 29, 30, 99, 30, 98, 99, 100, 29, 99, 28, 29, 100, 27, 101, 26, 28, 100, 27, 103, 25, 26, 24, 105, 23, 25, 103, 24, 22, 23, 105, 100, 101, 27, 102, 103, 26, 104, 105, 24, 103, 104, 24, 106, 107, 22, 21, 107, 108, 22, 107, 21, 105, 106, 22, 19, 20, 108, 19, 110, 18, 108, 20, 21, 18, 110, 17, 16, 17, 111, 110, 111, 17, 109, 110, 19, 108, 109, 19, 101, 102, 26, 78, 79, 49, 80, 49, 79, 78, 51, 77, 50, 78, 49, 76, 77, 51, 76, 51, 52, 51, 78, 50, 53, 75, 52, 52, 75, 76, 74, 55, 73, 74, 75, 53, 72, 57, 71, 70, 59, 69, 58, 70, 71, 55, 72, 73, 53, 54, 74, 56, 72, 55, 56, 57, 72, 57, 58, 71, 69, 59, 60, 69, 60, 68, 58, 59, 70, 67, 60, 61, 67, 68, 60, 62, 65, 66, 67, 61, 66, 65, 63, 64, 127, 64, 0, 63, 0, 64, 62, 63, 65, 61, 62, 66, 54, 55, 74, 11, 116, 117, 13, 114, 115, 115, 116, 13, 120, 9, 119, 118, 10, 117, 9, 118, 119, 10, 11, 117, 15, 112, 113, 112, 15, 16, 15, 113, 14, 111, 112, 16, 14, 114, 13, 14, 113, 114, 13, 116, 12, 12, 116, 11, 7, 120, 121, 3, 125, 126, 124, 5, 123, 4, 124, 125, 2, 127, 1, 0, 1, 127, 2, 3, 126, 127, 2, 126, 125, 3, 4, 120, 8, 9, 8, 120, 7, 9, 10, 118, 121, 122, 7, 5, 6, 122, 6, 7, 122, 5, 122, 123, 5, 124, 4,
            ],
            'positions': [],
            'paths': []
        };

        _this.coordsBuffer = gl.createBuffer();
        _this.idsBuffer = gl.createBuffer();
        _this.indexBuffer = gl.createBuffer();
        gl.uniformMatrix4fv(uNeighProjectionLoc, false, GI.sys.projection.elements);
        _this.alpha = 0.06;
        _this.multiple = 1.06;
        _this.brighteningBool = true;
        _this.updateDate();
    };

    PanoAJK.Main.NeighPts.prototype = {
        constructor : PanoAJK.Main.NeighPts,

        //更新定位点
        updateDate : function(){
            var neighPtPath = GI.sys.currentPath.split('/')[2];
            _this.neighPtData.paths = [];
            _this.neighPtData.positions = [];
            for(var q = 0;q<GI.sys.pts[neighPtPath].length;q++){
                _this.neighPtData.paths.push(GI.sys.pts[neighPtPath][q].path);
                _this.neighPtData.positions.push(GI.sys.pts[neighPtPath][q].position);

                //更新定位点周围圆环的几何信息。
                var arrPos = [];
                var arrInx = [];
                var arrIds = [];

                for(var i = 0; i<_this.neighPtData.positions.length;i++){
                    for(var j = 0;j<_this.neighPtData.vertexPositions.length;j++){
                        switch(j%3){
                            case 0:
                                arrIds.push(i);
                                arrPos.push(_this.neighPtData.vertexPositions[j]+_this.neighPtData.positions[i][0]);
                                break;
                            case 1:
                                arrPos.push(_this.neighPtData.vertexPositions[j]+_this.neighPtData.positions[i][1]);
                                break;
                            case 2:
                                arrPos.push(_this.neighPtData.vertexPositions[j]+_this.neighPtData.positions[i][2]);
                                break;
                        }
                    }
                    for(var t = 0;t<_this.neighPtData.indices.length;t++){
                        arrInx.push(_this.neighPtData.indices[t]+_this.neighPtData.vertexPositions.length/3*i);
                    }
                }
                _this.neighPtData.coord = new Float32Array(arrPos);
                _this.neighPtData.index = new Uint16Array(arrInx);
                _this.neighPtData.ptIds = new Float32Array(arrIds);
                _this.count = _this.neighPtData.index.length;
            }
        },

        //每帧渲染的时候，执行函数操作
        render : function (cam) {
            gl.useProgram(program);
            gl.bindBuffer(gl.ARRAY_BUFFER, _this.coordsBuffer); //坐标导入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, _this.neighPtData.coord, gl.STATIC_DRAW); //TODO:不需要每次都新建buffer
            gl.vertexAttribPointer(aNeighCoordsLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aNeighCoordsLoc);

            gl.bindBuffer(gl.ARRAY_BUFFER, _this.idsBuffer); //坐标导入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, _this.neighPtData.ptIds, gl.STATIC_DRAW); //TODO:不需要每次都新建buffer
            gl.vertexAttribPointer(aIdCurLoc, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aIdCurLoc);

            // if(GI.selId != -1){
            //     _this.brighten();
            // }else if(GI.selId == -1){
            //     _this.darken();
            // }

            if (_this.alpha > 0.72) {
                _this.brighteningBool = false;
            } else if (_this.alpha < 0.04) {
                _this.brighteningBool = true;
            }

            if (_this.brighteningBool) {
                _this.alpha *= _this.multiple;
            } else {
                _this.alpha /= _this.multiple;
            }
            gl.uniform1f(uNeighAlphaLoc,_this.alpha);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _this.indexBuffer);//索引导入缓冲区
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, _this.neighPtData.index, gl.STATIC_DRAW);
            gl.uniformMatrix4fv(uNeighViewMatLoc, false, cam.vmMat4.elements);

            gl.drawElements(gl.TRIANGLES, _this.count, gl.UNSIGNED_SHORT, 0);
        },

        //逐渐明亮
        brighten : function(){
            if(_this.alpha <=1){
                _this.alpha += 0.1;
                gl.uniform1i(uIdSelLoc,GI.selId);
            }
        },

        //逐渐灰暗
        darken : function(){
            if(_this.alpha>0.11){
                _this.alpha = 0.1;
                gl.uniform1i(uIdSelLoc,GI.selId);
            }
        },

        //直接明亮
        shine : function(){
            gl.uniform1i(uIdSelLoc,GI.selId);
            _this.alpha = 1.0;
        }

    };

})(window.jQuery || window.Zepto);