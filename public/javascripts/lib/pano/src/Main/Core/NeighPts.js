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
                    0.0, 1.74, -0.05,0.47, 3.39, -0.65,0.94, 5.03, -1.25,0.0, 1.74, -0.05,0.21, 3.39, -0.78,0.43, 5.03, -1.51,0.0, 1.74, -0.05,-0.09, 3.39, -0.81,-0.19, 5.03, -1.57,0.0, 1.74, -0.05,-0.39, 3.39, -0.71,-0.77, 5.03, -1.37,0.0, 1.74, -0.05,-0.6, 3.39, -0.52,-1.2, 5.03, -0.99,0.0, 1.74, -0.05,-0.73, 3.39, -0.27,-1.46, 5.03, -0.48,0.0, 1.74, -0.05,-0.76, 3.39, 0.04,-1.51, 5.03, 0.13,0.0, 1.74, -0.05,-0.66, 3.39, 0.33,-1.31, 5.03, 0.72,0.0, 1.74, -0.05,-0.47, 3.39, 0.55,-0.94, 5.03, 1.15,0.0, 1.74, -0.05,-0.21, 3.39, 0.68,-0.43, 5.03, 1.41,0.0, 1.74, -0.05,0.09, 3.39, 0.7,0.19, 5.03, 1.46,0.0, 1.74, -0.05,0.39, 3.39, 0.6,0.77, 5.03, 1.26,0.0, 1.74, -0.05,0.6, 3.39, 0.41,1.2, 5.03, 0.88,0.0, 1.74, -0.05,0.73, 3.39, 0.16,1.46, 5.03, 0.38,0.0, 1.74, -0.05,0.76, 3.39, -0.15,1.51, 5.03, -0.24,0.0, 1.74, -0.05,0.66, 3.39, -0.44,1.31, 5.03, -0.82,0.0, 1.74, -0.05,0.47, 3.39, -0.65,0.94, 5.03, -1.25,0.94, 5.03, -1.25,0.43, 5.03, -1.51,-0.19, 5.03, -1.57,-0.77, 5.03, -1.37,-1.2, 5.03, -0.99,-1.46, 5.03, -0.48,-1.51, 5.03, 0.13,-1.31, 5.03, 0.72,-0.94, 5.03, 1.15,-0.43, 5.03, 1.41,0.19, 5.03, 1.46,0.77, 5.03, 1.26,1.2, 5.03, 0.88,1.46, 5.03, 0.38,1.51, 5.03, -0.24,1.31, 5.03, -0.82,4.59, 0.0, 0.0,4.58, 0.0, 0.41,4.52, 0.0, 0.84,4.42, 0.0, 1.26,4.27, 0.0, 1.69,4.08, 0.0, 2.11,3.85, 0.0, 2.51,3.57, 0.0, 2.9,3.25, 0.0, 3.25,2.9, 0.0, 3.57,2.51, 0.0, 3.85,2.11, 0.0, 4.08,1.69, 0.0, 4.27,1.26, 0.0, 4.42,0.84, 0.0, 4.52,0.41, 0.0, 4.58,0.0, 0.0, 4.59,-0.41, 0.0, 4.58,-0.84, 0.0, 4.52,-1.26, 0.0, 4.42,-1.69, 0.0, 4.27,-2.11, 0.0, 4.08,-2.51, 0.0, 3.85,-2.9, 0.0, 3.57,-3.25, 0.0, 3.25,-3.57, 0.0, 2.9,-3.85, 0.0, 2.51,-4.08, 0.0, 2.11,-4.27, 0.0, 1.69,-4.42, 0.0, 1.26,-4.52, 0.0, 0.84,-4.58, 0.0, 0.41,-4.59, 0.0, 0.0,-4.58, 0.0, -0.41,-4.52, 0.0, -0.84,-4.42, 0.0, -1.26,-4.27, 0.0, -1.69,-4.08, 0.0, -2.11,-3.85, 0.0, -2.51,-3.57, 0.0, -2.9,-3.25, 0.0, -3.25,-2.9, 0.0, -3.57,-2.51, 0.0, -3.85,-2.11, 0.0, -4.08,-1.69, 0.0, -4.27,-1.26, 0.0, -4.42,-0.84, 0.0, -4.52,-0.41, 0.0, -4.58,0.0, 0.0, -4.59,0.41, 0.0, -4.58,0.84, 0.0, -4.52,1.26, 0.0, -4.42,1.69, 0.0, -4.27,2.11, 0.0, -4.08,2.51, 0.0, -3.85,2.9, 0.0, -3.57,3.25, 0.0, -3.25,3.57, 0.0, -2.9,3.85, 0.0, -2.51,4.08, 0.0, -2.11,4.27, 0.0, -1.69,4.42, 0.0, -1.26,4.52, 0.0, -0.84,4.58, 0.0, -0.41,2.65, 0.0, 0.0,2.64, 0.0, -0.24,2.61, 0.0, -0.48,2.55, 0.0, -0.73,2.47, 0.0, -0.98,2.36, 0.0, -1.22,2.22, 0.0, -1.45,2.06, 0.0, -1.67,1.88, 0.0, -1.88,1.67, 0.0, -2.06,1.45, 0.0, -2.22,1.22, 0.0, -2.36,0.98, 0.0, -2.47,0.73, 0.0, -2.55,0.48, 0.0, -2.61,0.24, 0.0, -2.64,0.0, 0.0, -2.65,-0.24, 0.0, -2.64,-0.48, 0.0, -2.61,-0.73, 0.0, -2.55,-0.98, 0.0, -2.47,-1.22, 0.0, -2.36,-1.45, 0.0, -2.22,-1.67, 0.0, -2.06,-1.88, 0.0, -1.88,-2.06, 0.0, -1.67,-2.22, 0.0, -1.45,-2.36, 0.0, -1.22,-2.47, 0.0, -0.98,-2.55, 0.0, -0.73,-2.61, 0.0, -0.48,-2.64, 0.0, -0.24,-2.65, 0.0, 0.0,-2.64, 0.0, 0.24,-2.61, 0.0, 0.48,-2.55, 0.0, 0.73,-2.47, 0.0, 0.98,-2.36, 0.0, 1.22,-2.22, 0.0, 1.45,-2.06, 0.0, 1.67,-1.88, 0.0, 1.88,-1.67, 0.0, 2.06,-1.45, 0.0, 2.22,-1.22, 0.0, 2.36,-0.98, 0.0, 2.47,-0.73, 0.0, 2.55,-0.48, 0.0, 2.61,-0.24, 0.0, 2.64,0.0, 0.0, 2.65,0.24, 0.0, 2.64,0.48, 0.0, 2.61,0.73, 0.0, 2.55,0.98, 0.0, 2.47,1.22, 0.0, 2.36,1.45, 0.0, 2.22,1.67, 0.0, 2.06,1.88, 0.0, 1.88,2.06, 0.0, 1.67,2.22, 0.0, 1.45,2.36, 0.0, 1.22,2.47, 0.0, 0.98,2.55, 0.0, 0.73,2.61, 0.0, 0.48,2.64, 0.0, 0.24
                ],
            'indices': [
                    4,1,0,7,4,3,10,7,6,13,10,9,16,13,12,19,16,15,22,19,18,25,22,21,28,25,24,31,28,27,34,31,30,37,34,33,40,37,36,43,40,39,46,43,42,49,46,45,10,11,8,25,26,23,34,35,32,43,44,40,40,41,38,61,59,60,61,62,63,58,61,65,58,59,61,58,56,57,56,58,65,64,61,63,52,56,65,52,65,66,66,51,52,55,56,54,56,53,54,52,53,56,61,64,65,157,104,105,103,104,158,105,156,157,108,155,107,156,105,106,106,107,155,154,108,109,157,158,104,161,162,101,99,100,162,101,162,100,160,101,102,159,160,103,101,160,161,103,160,102,159,103,158,111,112,151,110,111,151,113,149,112,148,114,115,115,147,148,147,115,116,149,113,114,148,149,114,153,154,109,155,156,106,154,155,108,112,149,150,110,151,152,112,150,151,152,153,110,109,110,153,98,99,163,162,163,99,98,165,97,164,98,163,98,164,165,96,97,166,97,165,166,167,96,166,95,96,167,94,168,93,95,167,94,170,92,93,91,172,90,92,170,91,89,90,172,167,168,94,169,170,93,171,172,91,170,171,91,173,174,89,88,174,175,89,174,88,172,173,89,86,87,175,86,177,85,175,87,88,85,177,84,83,84,178,177,178,84,176,177,86,175,176,86,168,169,93,145,146,116,147,116,146,145,118,144,117,145,116,143,144,118,143,118,119,118,145,117,120,142,119,119,142,143,141,122,140,141,142,120,139,124,138,137,126,136,125,137,138,122,139,140,120,121,141,123,139,122,123,124,139,124,125,138,136,126,127,136,127,135,125,126,137,134,127,128,134,135,127,129,132,133,134,128,133,132,130,131,194,131,67,130,67,131,129,130,132,128,129,133,121,122,141,78,183,184,80,181,182,182,183,80,187,76,186,185,77,184,76,185,186,77,78,184,82,179,180,179,82,83,82,180,81,178,179,83,81,181,80,81,180,181,80,183,79,79,183,78,74,187,188,70,192,193,191,72,190,71,191,192,69,194,68,67,68,194,69,70,193,194,69,193,192,70,71,187,75,76,75,187,74,76,77,185,188,189,74,72,73,189,73,74,189,72,189,190,72,191,71,4,5,1,5,2,1,7,8,5,7,5,4,16,17,14,16,14,13,22,23,20,22,20,19,19,20,17,19,17,16,13,14,11,13,11,10,31,32,29,31,29,28,37,38,35,37,35,34,49,50,46,50,47,46,46,47,43,47,44,43,28,29,25,29,26,25,10,8,7,25,23,22,34,32,31,44,41,40,40,38,37
                ],
            'positions': [],
            'paths': []
        };

        _this.coordsBuffer = gl.createBuffer();
        _this.idsBuffer = gl.createBuffer();
        _this.indexBuffer = gl.createBuffer();
        gl.uniformMatrix4fv(uNeighProjectionLoc, false, GI.sys.projection.elements);
        _this.alpha = 0.06;
        _this.multiple = 1.05;
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

            if (_this.alpha > 0.5) {
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