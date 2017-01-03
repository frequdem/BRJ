/**
 * Created by KX on 2016/8/10.
 */
require('./PanoAJK.js');
require('../WebGL/WebGLContext.js');
require('../WebGL/math.js');
(function($){
    //对象变量
    var _this;

    //着色器变量
    var aCoords,
        uModelview,
        uProjection;

    //WebGL系统变量
    var GI,
        gl,
        program;
    PanoAJK.Main.Skybox = function(args) {
        GI = args.GIcontext;
        this.modelData = args.cubeData;
        this.count =   this.modelData.indices.length;

        gl = GI.sys.gl;
        _this = this;

        var shaderDates = {
            vShaderId : 'vshader',
            fShaderId : 'fshader'
        };
        program = GI.sys.cubeProgram  = GI.sys.WebGLContext.createProgramComplete(gl,shaderDates.vShaderId,shaderDates.fShaderId);
        program.switchRatio = 0.0;
        gl.useProgram(program);//使用着色器程序

        aCoords = gl.getAttribLocation(program, "coords");//获取着色器中各变量的Location
        uModelview = gl.getUniformLocation(program, "modelview");
        uProjection = gl.getUniformLocation(program, "projection");
        program.uCubeSamplerCurLoc = gl.getUniformLocation(program, "uCubeSamplerCur");
        program.uSwitchRatioLoc = gl.getUniformLocation(program, "uSwitchRatio");

        gl.enableVertexAttribArray(aCoords);
        gl.enable(gl.DEPTH_TEST);
        gl.uniformMatrix4fv(uProjection, false, GI.sys.projection.elements);


        _this.coordsBuffer = gl.createBuffer();
        _this.indexBuffer = gl.createBuffer();

        _this.updateTexture(args.firstPath,true);

    };

    PanoAJK.Main.Skybox.prototype = {
        constructor : PanoAJK.Main.Skybox,

        //每帧渲染方法
        render : function (cam) { //每帧渲染的时候，执行函数操作
            var modelData = _this.modelData;
            gl.useProgram(program);
            gl.bindBuffer(gl.ARRAY_BUFFER, _this.coordsBuffer); //坐标导入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
            gl.vertexAttribPointer(aCoords, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aCoords);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _this.indexBuffer);//索引导入缓冲区
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);

            gl.uniformMatrix4fv(uModelview, false, cam.vmMat4.elements);

            gl.uniform1f(program.uSwitchRatioLoc,program.switchRatio);

            gl.drawElements(gl.TRIANGLES, _this.count, gl.UNSIGNED_BYTE, 0);
        },

        //主动加载贴图
        updateTexture : function(currentPath,applyBool) {
            if ($.inArray(currentPath, GI.sys.imageLoadedList) != -1) {
                if (applyBool) {
                    _this.applyTexture(currentPath);
                } else {
                    _this.imgLoadedBool = true;
                }
            } else if ($.inArray(currentPath, GI.sys.imageLoadingList) != -1) {

                var imgs = GI.sys.imageList[currentPath] = new Array(6);
                _this.urls = [        //全景图链接(顺序必须一致)
                    currentPath + "_right.jpg", currentPath + "_left.jpg",
                    currentPath + "_top.jpg", currentPath + "_bottom.jpg",
                    currentPath + "_front.jpg", currentPath + "_back.jpg"
                ];
                var ct = 0;
                _this.imgLoadedBool = false;
                for (var i = 0; i < 6; i++) {
                    imgs[i] = new Image();
                    imgs[i].crossOrigin = 'annoymous'; //处理跨域访问文理
                    imgs[i].onload = function () {
                        ct++;
                        if (ct == 6) {
                            if (applyBool) {
                                _this.applyTexture(currentPath);

                            } else {
                                _this.imgLoadedBool = true;
                            }
                        }
                    };
                    imgs[i].src = _this.urls[i];
                }
            }else{
                var imgs = GI.sys.imageList[currentPath] = new Array(6);
                _this.urls = [        //全景图链接(顺序必须一致)
                    currentPath + "_right.jpg", currentPath + "_left.jpg",
                    currentPath + "_top.jpg", currentPath + "_bottom.jpg",
                    currentPath + "_front.jpg", currentPath + "_back.jpg"
                ];
                GI.sys.imageLoadedCount[currentPath] = 0;
                _this.imgLoadedBool = false;
                GI.sys.imageLoadingList.push(currentPath);

                for (var j = 0; j < 6; j++) {
                    imgs[j] = new Image();
                    imgs[j].crossOrigin = 'annoymous'; //处理跨域访问文理
                    imgs[j].onload = function () {
                        GI.sys.imageLoadedCount[currentPath]++;
                        if (GI.sys.imageLoadedCount[currentPath] == 6) {
                            //每加载完一个场景，就告诉全局这个全景资源已经在内存里。
                            GI.sys.imageLoadedList.push(currentPath);
                            GI.sys.imageLoadingList.splice($.inArray(currentPath,GI.sys.imageLoadingList),1);

                            if (applyBool) {
                                _this.applyTexture(currentPath);
                            } else {
                                _this.imgLoadedBool = true;
                            }
                        }
                    };
                    imgs[j].src = _this.urls[j];
                }
            }
        },

        //全景图预加载
        preloadTexture : function(url){
            if($.inArray(url,GI.sys.imageLoadedList) == -1){
                var urls = [        //全景图链接(顺序必须一致)
                    url+"_right.jpg", url+"_left.jpg",
                    url+"_top.jpg", url+"_bottom.jpg",
                    url+"_front.jpg", url+"_back.jpg"
                ];
                GI.sys.imagePreloadedCount[url] = 0;
                var imgs = GI.sys.imageList[url] = new Array(6);
                GI.sys.imageLoadingList.push(url);

                for (var i = 0; i < 6; i++) {
                    imgs[i] = new Image();
                    imgs[i].crossOrigin = 'annoymous'; //处理跨域访问文理
                    imgs[i].onload = function () {
                        GI.sys.imagePreloadedCount[url]++;
                        GI.sys.imageLoadedCount[url] = GI.sys.imagePreloadedCount[url];
                        if (GI.sys.imagePreloadedCount[url] == 6) {
                            //每加载完一个场景，就告诉全局这个全景资源已经在内存里。
                            GI.sys.imageLoadedList.push(url);
                            GI.sys.imageLoadingList.splice($.inArray(url,GI.sys.imageLoadingList),1);
                        }
                    };
                    imgs[i].src = urls[i];
                }
            }
        },

        //全景图映射到skybox上
        applyTexture : function(url){
            var imgs = GI.sys.imageList[url];
            var texID = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texID);
            var targets = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
            ];
            for (var j = 0; j < 6; j++) {
                gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgs[j]);
//                            TODO:下面两行代码没有实际作用
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
            }
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP); //全景放大缩小的时候，起作用。

            //进行预加载
            var urlId = url.split('/')[2];
            var pts = GI.sys.pts;
            var preloadUrl;
            for(var item in pts[urlId].neighs){
                var preloadUrl = url.replace(/\/[A-Za-z]\//, '/' + item + '/');
                if($.inArray(preloadUrl,GI.sys.imageLoadedList) == -1){
                    _this.preloadTexture(preloadUrl);
                }
            }
        }
    };
})(window.jQuery || window.Zepto);
