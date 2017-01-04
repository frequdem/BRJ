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
                        1.01, 0.0, 0.0,1.0, 0.0, 0.09,0.99, 0.0, 0.18,0.97, 0.0, 0.28,0.94, 0.0, 0.37,0.89, 0.0, 0.46,0.84, 0.0, 0.55,0.78, 0.0, 0.63,0.71, 0.0, 0.71,0.63, 0.0, 0.78,0.55, 0.0, 0.84,0.46, 0.0, 0.89,0.37, 0.0, 0.94,0.28, 0.0, 0.97,0.18, 0.0, 0.99,0.09, 0.0, 1.0,0.0, 0.0, 1.01,-0.09, 0.0, 1.0,-0.18, 0.0, 0.99,-0.28, 0.0, 0.97,-0.37, 0.0, 0.94,-0.46, 0.0, 0.89,-0.55, 0.0, 0.84,-0.63, 0.0, 0.78,-0.71, 0.0, 0.71,-0.78, 0.0, 0.63,-0.84, 0.0, 0.55,-0.89, 0.0, 0.46,-0.94, 0.0, 0.37,-0.97, 0.0, 0.28,-0.99, 0.0, 0.18,-1.0, 0.0, 0.09,-1.01, 0.0, 0.0,-1.0, 0.0, -0.09,-0.99, 0.0, -0.18,-0.97, 0.0, -0.28,-0.94, 0.0, -0.37,-0.89, 0.0, -0.46,-0.84, 0.0, -0.55,-0.78, 0.0, -0.63,-0.71, 0.0, -0.71,-0.63, 0.0, -0.78,-0.55, 0.0, -0.84,-0.46, 0.0, -0.89,-0.37, 0.0, -0.94,-0.28, 0.0, -0.97,-0.18, 0.0, -0.99,-0.09, 0.0, -1.0,0.0, 0.0, -1.01,0.09, 0.0, -1.0,0.18, 0.0, -0.99,0.28, 0.0, -0.97,0.37, 0.0, -0.94,0.46, 0.0, -0.89,0.55, 0.0, -0.84,0.63, 0.0, -0.78,0.71, 0.0, -0.71,0.78, 0.0, -0.63,0.84, 0.0, -0.55,0.89, 0.0, -0.46,0.94, 0.0, -0.37,0.97, 0.0, -0.28,0.99, 0.0, -0.18,1.0, 0.0, -0.09,0.6, 0.0, 0.0,0.6, 0.0, -0.05,0.59, 0.0, -0.11,0.58, 0.0, -0.17,0.56, 0.0, -0.22,0.53, 0.0, -0.28,0.5, 0.0, -0.33,0.47, 0.0, -0.38,0.42, 0.0, -0.42,0.38, 0.0, -0.47,0.33, 0.0, -0.5,0.28, 0.0, -0.53,0.22, 0.0, -0.56,0.17, 0.0, -0.58,0.11, 0.0, -0.59,0.05, 0.0, -0.6,0.0, 0.0, -0.6,-0.05, 0.0, -0.6,-0.11, 0.0, -0.59,-0.17, 0.0, -0.58,-0.22, 0.0, -0.56,-0.28, 0.0, -0.53,-0.33, 0.0, -0.5,-0.38, 0.0, -0.47,-0.42, 0.0, -0.42,-0.47, 0.0, -0.38,-0.5, 0.0, -0.33,-0.53, 0.0, -0.28,-0.56, 0.0, -0.22,-0.58, 0.0, -0.17,-0.59, 0.0, -0.11,-0.6, 0.0, -0.05,-0.6, 0.0, 0.0,-0.6, 0.0, 0.05,-0.59, 0.0, 0.11,-0.58, 0.0, 0.17,-0.56, 0.0, 0.22,-0.53, 0.0, 0.28,-0.5, 0.0, 0.33,-0.47, 0.0, 0.38,-0.42, 0.0, 0.42,-0.38, 0.0, 0.47,-0.33, 0.0, 0.5,-0.28, 0.0, 0.53,-0.22, 0.0, 0.56,-0.17, 0.0, 0.58,-0.11, 0.0, 0.59,-0.05, 0.0, 0.6,0.0, 0.0, 0.6,0.05, 0.0, 0.6,0.11, 0.0, 0.59,0.17, 0.0, 0.58,0.22, 0.0, 0.56,0.28, 0.0, 0.53,0.33, 0.0, 0.5,0.38, 0.0, 0.47,0.42, 0.0, 0.42,0.47, 0.0, 0.38,0.5, 0.0, 0.33,0.53, 0.0, 0.28,0.56, 0.0, 0.22,0.58, 0.0, 0.17,0.59, 0.0, 0.11,0.6, 0.0, 0.05,3.61, 0.0, 0.0,3.6, 0.0, 0.32,3.55, 0.0, 0.66,3.47, 0.0, 0.99,3.36, 0.0, 1.33,3.21, 0.0, 1.66,3.02, 0.0, 1.98,2.8, 0.0, 2.28,2.55, 0.0, 2.55,2.28, 0.0, 2.8,1.98, 0.0, 3.02,1.66, 0.0, 3.21,1.33, 0.0, 3.36,0.99, 0.0, 3.47,0.66, 0.0, 3.55,0.32, 0.0, 3.6,0.0, 0.0, 3.61,-0.32, 0.0, 3.6,-0.66, 0.0, 3.55,-0.99, 0.0, 3.47,-1.33, 0.0, 3.36,-1.66, 0.0, 3.21,-1.98, 0.0, 3.02,-2.28, 0.0, 2.8,-2.55, 0.0, 2.55,-2.8, 0.0, 2.28,-3.02, 0.0, 1.98,-3.21, 0.0, 1.66,-3.36, 0.0, 1.33,-3.47, 0.0, 0.99,-3.55, 0.0, 0.66,-3.6, 0.0, 0.32,-3.61, 0.0, 0.0,-3.6, 0.0, -0.32,-3.55, 0.0, -0.66,-3.47, 0.0, -0.99,-3.36, 0.0, -1.33,-3.21, 0.0, -1.66,-3.02, 0.0, -1.98,-2.8, 0.0, -2.28,-2.55, 0.0, -2.55,-2.28, 0.0, -2.8,-1.98, 0.0, -3.02,-1.66, 0.0, -3.21,-1.33, 0.0, -3.36,-0.99, 0.0, -3.47,-0.66, 0.0, -3.55,-0.32, 0.0, -3.6,0.0, 0.0, -3.61,0.32, 0.0, -3.6,0.66, 0.0, -3.55,0.99, 0.0, -3.47,1.33, 0.0, -3.36,1.66, 0.0, -3.21,1.98, 0.0, -3.02,2.28, 0.0, -2.8,2.55, 0.0, -2.55,2.8, 0.0, -2.28,3.02, 0.0, -1.98,3.21, 0.0, -1.66,3.36, 0.0, -1.33,3.47, 0.0, -0.99,3.55, 0.0, -0.66,3.6, 0.0, -0.32,2.59, 0.0, 0.0,2.58, 0.0, -0.23,2.55, 0.0, -0.47,2.49, 0.0, -0.71,2.41, 0.0, -0.95,2.3, 0.0, -1.19,2.17, 0.0, -1.42,2.01, 0.0, -1.63,1.83, 0.0, -1.83,1.63, 0.0, -2.01,1.42, 0.0, -2.17,1.19, 0.0, -2.3,0.95, 0.0, -2.41,0.71, 0.0, -2.49,0.47, 0.0, -2.55,0.23, 0.0, -2.58,0.0, 0.0, -2.59,-0.23, 0.0, -2.58,-0.47, 0.0, -2.55,-0.71, 0.0, -2.49,-0.95, 0.0, -2.41,-1.19, 0.0, -2.3,-1.42, 0.0, -2.17,-1.63, 0.0, -2.01,-1.83, 0.0, -1.83,-2.01, 0.0, -1.63,-2.17, 0.0, -1.42,-2.3, 0.0, -1.19,-2.41, 0.0, -0.95,-2.49, 0.0, -0.71,-2.55, 0.0, -0.47,-2.58, 0.0, -0.23,-2.59, 0.0, 0.0,-2.58, 0.0, 0.23,-2.55, 0.0, 0.47,-2.49, 0.0, 0.71,-2.41, 0.0, 0.95,-2.3, 0.0, 1.19,-2.17, 0.0, 1.42,-2.01, 0.0, 1.63,-1.83, 0.0, 1.83,-1.63, 0.0, 2.01,-1.42, 0.0, 2.17,-1.19, 0.0, 2.3,-0.95, 0.0, 2.41,-0.71, 0.0, 2.49,-0.47, 0.0, 2.55,-0.23, 0.0, 2.58,0.0, 0.0, 2.59,0.23, 0.0, 2.58,0.47, 0.0, 2.55,0.71, 0.0, 2.49,0.95, 0.0, 2.41,1.19, 0.0, 2.3,1.42, 0.0, 2.17,1.63, 0.0, 2.01,1.83, 0.0, 1.83,2.01, 0.0, 1.63,2.17, 0.0, 1.42,2.3, 0.0, 1.19,2.41, 0.0, 0.95,2.49, 0.0, 0.71,2.55, 0.0, 0.47,2.58, 0.0, 0.23
                    ],                    
            'indices': [
                        38,90,37,36,37,92,90,38,39,41,87,40,90,39,89,39,40,89,86,41,42,90,91,37,94,95,34,32,33,95,34,95,33,93,34,35,36,92,35,34,93,94,35,92,93,92,37,91,44,45,83,43,44,85,46,83,45,81,47,48,48,80,81,80,48,79,46,47,81,82,46,81,86,87,41,88,89,40,87,88,40,46,82,83,44,84,85,44,83,84,86,42,85,43,85,42,97,31,32,95,96,32,31,97,30,96,97,32,30,97,98,99,29,98,29,30,98,100,28,99,26,27,101,28,101,27,28,29,99,103,24,25,26,103,25,23,24,105,23,105,22,28,100,101,102,103,26,104,105,24,103,104,24,106,107,22,20,107,108,22,107,21,105,106,22,20,109,19,19,110,18,20,21,107,18,110,17,16,17,111,110,111,17,109,110,19,20,108,109,101,102,26,50,78,79,48,49,79,78,50,77,49,50,79,51,52,77,77,52,76,50,51,77,53,76,52,53,75,76,74,54,73,54,74,75,72,57,71,70,59,69,58,70,71,56,72,73,75,53,54,73,55,56,72,56,57,58,71,57,69,59,60,69,60,68,59,70,58,61,68,60,67,68,61,63,65,66,66,67,62,65,63,64,1,64,0,63,0,64,62,63,66,67,61,62,54,55,73,12,116,117,13,114,115,115,116,12,120,9,119,118,10,117,10,118,119,10,11,117,15,112,113,112,15,16,113,114,15,111,112,16,14,114,13,15,114,14,13,115,12,12,117,11,8,120,121,3,125,126,124,5,123,124,125,3,126,1,2,64,1,127,2,3,126,1,126,127,3,4,124,120,8,9,8,121,7,9,10,119,121,122,7,122,5,6,6,7,122,122,123,5,5,124,4,218,165,166,164,165,220,167,218,166,216,217,168,217,218,167,216,168,169,168,217,167,218,219,165,222,223,162,224,161,223,162,223,161,221,162,163,220,221,164,162,221,222,164,221,163,220,165,219,171,172,213,170,171,214,173,211,172,208,175,176,211,173,174,174,175,209,208,176,177,175,208,209,171,213,214,215,216,169,214,215,169,174,209,210,172,211,212,174,210,211,212,213,172,214,169,170,159,160,224,161,224,160,159,226,158,225,159,224,159,225,226,157,158,227,158,226,227,228,156,227,229,155,156,154,155,230,227,156,157,232,152,153,153,154,230,152,232,151,230,155,229,156,228,229,231,232,153,233,234,151,232,233,151,149,234,235,148,236,237,148,235,236,151,234,150,235,148,149,237,147,148,149,150,234,145,238,239,238,145,146,145,239,240,237,146,147,146,237,238,230,231,153,207,177,178,178,206,207,205,206,178,208,177,207,180,204,179,204,180,181,178,179,205,182,203,181,179,204,205,182,202,203,203,204,181,201,184,200,199,186,198,185,199,200,183,201,202,183,202,182,184,185,200,198,186,187,186,199,185,183,184,201,187,188,197,197,188,196,187,197,198,189,196,188,195,196,189,190,193,194,195,189,194,193,191,192,129,192,128,191,128,192,190,191,193,189,190,194,140,243,244,142,241,242,242,243,142,247,137,246,139,245,246,138,246,137,139,244,245,241,143,144,143,241,142,241,144,240,145,240,144,141,243,140,142,243,141,140,244,139,139,246,138,137,247,248,131,253,254,252,132,251,252,253,131,130,255,129,192,129,255,130,131,254,255,130,254,131,132,252,136,248,135,136,137,248,135,249,250,135,248,249,250,133,134,134,135,250,250,251,133,133,251,132
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