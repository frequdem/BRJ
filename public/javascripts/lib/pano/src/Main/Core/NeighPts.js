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
                        0.0, 0.0, 0.0,0.38, 0.75, -0.45,0.76, 1.5, -0.9,0.0, 0.0, 0.0,0.18, 0.75, -0.56,0.36, 1.5, -1.12,0.0, 0.0, 0.0,-0.05, 0.75, -0.59,-0.1, 1.5, -1.18,0.0, 0.0, 0.0,-0.27, 0.75, -0.52,-0.54, 1.5, -1.05,0.0, 0.0, 0.0,-0.45, 0.75, -0.38,-0.9, 1.5, -0.76,0.0, 0.0, 0.0,-0.56, 0.75, -0.18,-1.12, 1.5, -0.36,0.0, 0.0, 0.0,-0.59, 0.75, 0.05,-1.18, 1.5, 0.1,0.0, 0.0, 0.0,-0.52, 0.75, 0.27,-1.05, 1.5, 0.54,0.0, 0.0, 0.0,-0.38, 0.75, 0.45,-0.76, 1.5, 0.9,0.0, 0.0, 0.0,-0.18, 0.75, 0.56,-0.36, 1.5, 1.12,0.0, 0.0, 0.0,0.05, 0.75, 0.59,0.1, 1.5, 1.18,0.0, 0.0, 0.0,0.27, 0.75, 0.52,0.54, 1.5, 1.05,0.0, 0.0, 0.0,0.45, 0.75, 0.38,0.9, 1.5, 0.76,0.0, 0.0, 0.0,0.56, 0.75, 0.18,1.12, 1.5, 0.36,0.0, 0.0, 0.0,0.59, 0.75, -0.05,1.18, 1.5, -0.1,0.0, 0.0, 0.0,0.52, 0.75, -0.27,1.05, 1.5, -0.54,0.0, 0.0, 0.0,0.38, 0.75, -0.45,0.76, 1.5, -0.9,0.76, 1.5, -0.9,0.36, 1.5, -1.12,-0.1, 1.5, -1.18,-0.54, 1.5, -1.05,-0.9, 1.5, -0.76,-1.12, 1.5, -0.36,-1.18, 1.5, 0.1,-1.05, 1.5, 0.54,-0.76, 1.5, 0.9,-0.36, 1.5, 1.12,0.1, 1.5, 1.18,0.54, 1.5, 1.05,0.9, 1.5, 0.76,1.12, 1.5, 0.36,1.18, 1.5, -0.1,1.05, 1.5, -0.54,3.61, 0.0, 0.0,3.6, 0.0, 0.32,3.55, 0.0, 0.66,3.47, 0.0, 0.99,3.36, 0.0, 1.33,3.21, 0.0, 1.66,3.02, 0.0, 1.98,2.8, 0.0, 2.28,2.55, 0.0, 2.55,2.28, 0.0, 2.8,1.98, 0.0, 3.02,1.66, 0.0, 3.21,1.33, 0.0, 3.36,0.99, 0.0, 3.47,0.66, 0.0, 3.55,0.32, 0.0, 3.6,0.0, 0.0, 3.61,-0.32, 0.0, 3.6,-0.66, 0.0, 3.55,-0.99, 0.0, 3.47,-1.33, 0.0, 3.36,-1.66, 0.0, 3.21,-1.98, 0.0, 3.02,-2.28, 0.0, 2.8,-2.55, 0.0, 2.55,-2.8, 0.0, 2.28,-3.02, 0.0, 1.98,-3.21, 0.0, 1.66,-3.36, 0.0, 1.33,-3.47, 0.0, 0.99,-3.55, 0.0, 0.66,-3.6, 0.0, 0.32,-3.61, 0.0, 0.0,-3.6, 0.0, -0.32,-3.55, 0.0, -0.66,-3.47, 0.0, -0.99,-3.36, 0.0, -1.33,-3.21, 0.0, -1.66,-3.02, 0.0, -1.98,-2.8, 0.0, -2.28,-2.55, 0.0, -2.55,-2.28, 0.0, -2.8,-1.98, 0.0, -3.02,-1.66, 0.0, -3.21,-1.33, 0.0, -3.36,-0.99, 0.0, -3.47,-0.66, 0.0, -3.55,-0.32, 0.0, -3.6,0.0, 0.0, -3.61,0.32, 0.0, -3.6,0.66, 0.0, -3.55,0.99, 0.0, -3.47,1.33, 0.0, -3.36,1.66, 0.0, -3.21,1.98, 0.0, -3.02,2.28, 0.0, -2.8,2.55, 0.0, -2.55,2.8, 0.0, -2.28,3.02, 0.0, -1.98,3.21, 0.0, -1.66,3.36, 0.0, -1.33,3.47, 0.0, -0.99,3.55, 0.0, -0.66,3.6, 0.0, -0.32,2.3, 0.0, 0.0,2.29, 0.0, -0.21,2.26, 0.0, -0.42,2.21, 0.0, -0.63,2.14, 0.0, -0.85,2.04, 0.0, -1.06,1.93, 0.0, -1.26,1.79, 0.0, -1.45,1.63, 0.0, -1.63,1.45, 0.0, -1.79,1.26, 0.0, -1.93,1.06, 0.0, -2.04,0.85, 0.0, -2.14,0.63, 0.0, -2.21,0.42, 0.0, -2.26,0.21, 0.0, -2.29,0.0, 0.0, -2.3,-0.21, 0.0, -2.29,-0.42, 0.0, -2.26,-0.63, 0.0, -2.21,-0.85, 0.0, -2.14,-1.06, 0.0, -2.04,-1.26, 0.0, -1.93,-1.45, 0.0, -1.79,-1.63, 0.0, -1.63,-1.79, 0.0, -1.45,-1.93, 0.0, -1.26,-2.04, 0.0, -1.06,-2.14, 0.0, -0.85,-2.21, 0.0, -0.63,-2.26, 0.0, -0.42,-2.29, 0.0, -0.21,-2.3, 0.0, 0.0,-2.29, 0.0, 0.21,-2.26, 0.0, 0.42,-2.21, 0.0, 0.63,-2.14, 0.0, 0.85,-2.04, 0.0, 1.06,-1.93, 0.0, 1.26,-1.79, 0.0, 1.45,-1.63, 0.0, 1.63,-1.45, 0.0, 1.79,-1.26, 0.0, 1.93,-1.06, 0.0, 2.04,-0.85, 0.0, 2.14,-0.63, 0.0, 2.21,-0.42, 0.0, 2.26,-0.21, 0.0, 2.29,0.0, 0.0, 2.3,0.21, 0.0, 2.29,0.42, 0.0, 2.26,0.63, 0.0, 2.21,0.85, 0.0, 2.14,1.06, 0.0, 2.04,1.26, 0.0, 1.93,1.45, 0.0, 1.79,1.63, 0.0, 1.63,1.79, 0.0, 1.45,1.93, 0.0, 1.26,2.04, 0.0, 1.06,2.14, 0.0, 0.85,2.21, 0.0, 0.63,2.26, 0.0, 0.42,2.29, 0.0, 0.21
                    ],                    
            'indices': [
                        4,1,0,7,4,3,10,7,6,13,10,9,16,13,12,19,16,15,22,19,18,25,22,21,28,25,24,31,28,27,34,31,30,37,34,33,40,37,36,43,40,39,46,43,42,49,46,45,4,5,2,10,11,8,7,8,4,16,17,14,22,23,20,19,20,16,13,14,10,25,26,22,31,32,28,37,38,34,34,35,32,43,44,40,49,50,46,46,47,44,40,41,38,28,29,26,61,58,60,65,58,61,64,61,62,58,59,60,58,56,57,56,58,52,63,64,62,65,52,58,52,65,66,66,51,52,55,56,54,54,52,53,56,52,54,64,65,61,105,158,104,103,104,158,106,157,105,108,154,107,157,106,156,106,107,155,154,108,109,105,157,158,161,162,101,163,100,162,101,162,100,160,101,102,159,160,103,101,160,161,103,160,102,159,103,158,112,150,111,110,111,152,112,113,150,147,114,115,114,147,148,147,115,116,149,113,114,148,149,114,153,154,109,155,156,106,154,155,107,113,149,150,111,151,152,111,150,151,153,109,152,110,152,109,164,98,99,100,163,99,98,165,97,163,164,99,98,164,165,96,97,166,97,165,166,167,95,166,168,94,95,94,168,93,166,95,96,171,91,92,92,93,169,91,172,90,93,168,169,95,167,168,170,171,92,90,172,89,171,172,91,89,173,174,86,175,176,88,174,175,89,172,173,175,87,88,175,86,87,88,89,174,84,177,178,177,84,85,84,178,179,86,177,85,177,86,176,169,170,92,146,116,117,117,145,146,144,145,117,147,116,146,119,143,118,143,119,120,117,118,144,121,142,120,118,143,144,121,141,142,142,143,120,140,123,139,138,125,137,124,138,139,140,141,121,140,121,122,123,124,139,137,125,126,125,138,124,122,123,140,126,127,136,136,127,135,126,136,137,128,135,127,134,135,128,129,132,133,134,128,133,130,67,132,68,131,67,67,131,132,129,130,132,128,129,133,79,183,184,81,181,182,182,183,80,187,76,186,77,78,185,77,185,186,78,184,185,83,179,180,180,82,83,180,181,82,84,179,83,81,182,80,82,181,81,80,183,79,79,184,78,75,187,188,70,192,193,191,72,190,71,191,192,193,68,69,131,68,194,69,70,193,68,193,194,192,70,71,187,75,76,75,188,74,76,77,186,188,189,74,190,73,189,73,74,189,190,72,73,72,191,71,4,2,1,10,8,7,8,5,4,16,14,13,22,20,19,20,17,16,14,11,10,26,23,22,32,29,28,38,35,34,34,32,31,44,41,40,50,47,46,46,44,43,40,38,37,28,26,25
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
        _this.isDrawNeighs = true;
        _this.updateDate();
    };

    PanoAJK.Main.NeighPts.prototype = {
        constructor : PanoAJK.Main.NeighPts,

        //更新定位点
        updateDate : function(){
            var neighPtPath = GI.sys.currentPath.match(/\/[a-z]{1}\//)[0].split('/')[1];
            _this.neighPtData.paths = [];
            _this.neighPtData.positions = [];
            var neighCnt = Object.keys(GI.sys.pts[neighPtPath].neighs).length;
            for(q in GI.sys.pts[neighPtPath].neighs){
                _this.neighPtData.paths.push(GI.sys.currentPath.replace(/\/[A-Za-z]\//, '/' + q + '/'));
                _this.neighPtData.positions.push(GI.sys.pts[neighPtPath].neighs[q]);

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

            // gl.bindBuffer(gl.ARRAY_BUFFER, _this.idsBuffer); //坐标导入缓冲区
            // gl.bufferData(gl.ARRAY_BUFFER, _this.neighPtData.ptIds, gl.STATIC_DRAW); //TODO:不需要每次都新建buffer
            // gl.vertexAttribPointer(aIdCurLoc, 1, gl.FLOAT, false, 0, 0);
            // gl.enableVertexAttribArray(aIdCurLoc);

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
            if (_this.isDrawNeighs) {
                gl.drawElements(gl.TRIANGLES, _this.count, gl.UNSIGNED_SHORT, 0);
            }
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