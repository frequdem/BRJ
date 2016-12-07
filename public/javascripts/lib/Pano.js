/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by KX on 2016/8/17.
	 */
	__webpack_require__(1);
	__webpack_require__(2);
	PanoAJK.Init = function(settings){

	    var settings_GI = $.extend({
	        resizable: false,
	        pts : {},
	        projection: 60,
	        smoothSwitch: false
	    },settings.GI || {});
	    this.Core = new PanoAJK.Main.Core(settings_GI);

	    var settings_CTR = $.extend({
	        GI: this.Core,
	        rotatesp: 20,//旋转速度
	        rotInertiasp: 0.90//惯性
	    },settings.controller || {});
	    this.Controller = new PanoAJK.Main.Controller(settings_CTR);
	    this.Component = [];

	};
	PanoAJK.Init.prototype = {
	    draw: function () {
	        var _this = this;
	        this.Core.refresh(this.Controller);
	        if(_this.Component.length!=0){
	            for(var i = 0; i<_this.Component.length; i++){
	                _this.Component[i].update();
	            }
	        }
	        requestAnimationFrame(arguments.callee.bind(_this));
	    },
	    changeTo: function(src){
	        this.Core.objsToDraw.skybox.updateTexture(src,true);
	    },
	    getLoadProgress: function(){
	        return this.Core.sys.imageLoadedCount[this.Core.sys.currentPath]/6;
	    },
	    getDirHorizon : function(){
	        return this.Controller.getDirHorizon();
	    },
	    addComponent : function(cmp){
	        this.Component.push(cmp);
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by KX on 2016/8/9.
	 * 玲珑眼  前端代码第二版
	 */
	window.PanoAJK = {
	    Component: {},
	    Main: {},
	    Math : {},
	    Init : {}
	};




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Created by KX on 2016/8/9.
	 */
	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(5);
	(function($){
	    var _this;
	    PanoAJK.Main.Core = function(args){
	        _this = this;
	        _this.sys = {
	            WebGLContext : new PanoAJK.Main.WebGLContext(),
	            //canvasObject : new PanoAJK.Main.Canvas(args.canvas),
	            //canvas : this,
	            pts : args.pts || {},
	            imageList : {},//存储全景图的img对象；
	            imageLoadingList : [],//存储正在被加载的全景图 url 地址;
	            imagePreloadedCount : {},////存储当前正在预加载的全景图已加载的张数；
	            imageLoadedCount : {},//存储当前正在加载的全景图已加载的张数；
	            imageLoadedList : [],//存储被加载过的全景图 url 地址；
	            firstPath :args.firstPath,
	            currentPath : args.firstPath,
	            wanderBool : args.smoothSwitch || false,
	            projectionAngle : args.projection || 60
	        };
	        _this.sys.canvasObject = new PanoAJK.Main.Canvas(args.canvas);
	        _this.sys.canvas = _this.sys.canvasObject.core;
	        if(args.resizable){
	            $(window).resize(function(){_this.sys.canvasObject.resize(_this)});
	        }
	        _this.objsToDraw = {};

	        //选中相邻点的id
	        _this.selId = -1;
	        //_this.wanderBool = args.smoothSwitch;
	        _this.init();
	    };

	    PanoAJK.Main.Core.prototype = {
	        constructor : PanoAJK.Main.Core,

	        //初始化
	        init : function(){
	            var gl = _this.sys.canvas.getContext("webgl");
	            if (!gl) {
	                gl = _this.sys.canvas.getContext("experimental-webgl");
	            }
	            if (!gl) {
	                throw "Could not create WebGL context.";
	            }
	            _this.sys.gl = gl;
	            _this.sys.projection = new PanoAJK.Math.Matrix4().setPerspective(_this.sys.projectionAngle,_this.sys.canvas.width/_this.sys.canvas.height,10,3000);//投影矩阵导入webgl系统
	            gl.enable(gl.BLEND);
	            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	            gl.clearColor(0, 0, 0, 1);
	            //_this.sys.gl = WebGLDebugUtils.makeDebugContext(gl, throwOnGLError, logAndValidate);

	            var skyboxArgs = {
	                GIcontext : _this,  //PanoAJK.Main.Core实例
	                cubeData : new _this.sys.WebGLContext.cube(200),    //skybox的模型数据
	                firstPath : _this.sys.firstPath   //起始路径
	            };
	            _this.objsToDraw.skybox = new PanoAJK.Main.Skybox(skyboxArgs);
	            if(_this.sys.wanderBool){
	                _this.objsToDraw.neighPts = new PanoAJK.Main.NeighPts(_this);
	            }
	        },

	        //刷新
	        refresh : function(controller){
	            controller.update();

	            //平滑漫游流程控制
	            if(_this.sys.wanderBool){
	                _this.checkMouseOverNeighpt(controller);
	                controller.moveToNextpt();
	            }
	            //不需要平滑漫游，需要什么操作？
	            else{
	            }
	            _this.sys.gl.clear(_this.sys.gl.COLOR_BUFFER_BIT | _this.sys.gl.DEPTH_BUFFER_BIT);
	            _this.objsToDraw.skybox.render(controller);
	            if(_this.objsToDraw.neighPts){
	                _this.objsToDraw.neighPts.render(controller);
	            }
	        },

	        //检查鼠标是否在相邻点上
	        checkMouseOverNeighpt : function(controllerTemp){
	            _this.selId = -1;
	            var controller = controllerTemp;
	            var dirs = _this.objsToDraw.neighPts.neighPtData.positions;

	            for(var i = 0 ;i < dirs.length; i++){
	                var dirPt = new PanoAJK.Math.Matrix4().set(_this.sys.projection).multiply(controller.vmMat4).multiplyVector4(new PanoAJK.Math.Vector4([dirs[i][0],dirs[i][1],dirs[i][2],1]));
	                var t = [dirPt.elements[0]/dirPt.elements[3],dirPt.elements[1]/dirPt.elements[3]];

	                if(Math.abs(t[0]-controller.mouse[0])+Math.abs(t[1]-controller.mouse[1])<0.12){
	                    _this.selId = i;

	                    break;
	                }
	            }
	        }
	    };
	})(window.jQuery || window.Zepto);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by KX on 2016/8/9.
	 */
	__webpack_require__(1);
	(function ($) {
	    PanoAJK.Main.WebGLContext = function () {

	    };
	    PanoAJK.Main.WebGLContext.prototype = {
	        constructor : PanoAJK.Main.WebGLContext,

	        // 创建着色器程序
	        createProgram: function (gl, vertexShaderSource, fragmentShaderSource) {
	            var vsh = gl.createShader(gl.VERTEX_SHADER);//创建顶点着色器
	            gl.shaderSource(vsh, vertexShaderSource);
	            gl.compileShader(vsh);//编译顶点着色器
	            if (!gl.getShaderParameter(vsh, gl.COMPILE_STATUS)) {
	                throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
	            }
	            var fsh = gl.createShader(gl.FRAGMENT_SHADER);//创建片元着色器
	            gl.shaderSource(fsh, fragmentShaderSource);
	            gl.compileShader(fsh);//编译片元着色器
	            if (!gl.getShaderParameter(fsh, gl.COMPILE_STATUS)) {
	                throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
	            }
	            var program = gl.createProgram();//创建程序
	            gl.attachShader(program, vsh);//绑定着色器
	            gl.attachShader(program, fsh);
	            gl.linkProgram(program);//链接着色器
	            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	                throw "Link error in program:  " + gl.getProgramInfoLog(program);
	            }

	            return program;
	        },

	        // 获取着色器代码文本
	        getTextContent: function (domID) {

	            var element = document.getElementById(domID);
	            var node = element.firstChild;
	            var sourceCode = "";
	            while (node) {
	                if (node.nodeType == 3) {
	                    sourceCode += (node.textContent);
	                    node = node.nextSibling;
	                }
	            }

	            return sourceCode;
	        },

	        //创建着色器程序
	        createProgramComplete: function (gl, vShaderId, fShaderId) {
	            var vertexShaderSource = this.getTextContent(vShaderId);//读取着色器源代码
	            var fragmentShaderSource = this.getTextContent(fShaderId);
	            var program = this.createProgram(gl, vertexShaderSource, fragmentShaderSource);//创建着色器程序
	            return program;

	        },

	        //创建天空盒结构
	        cube : function(sideLength){
	            var s = (sideLength || 1) / 2;
	            var coords = [];        //        TODO:可以写死
	            var indices = [];
	            var faceCorners = [[-s, -s, s, s, -s, s, s, s, s, -s, s, s],
	                [-s, -s, -s, -s, s, -s, s, s, -s, s, -s, -s],
	                [-s, s, -s, -s, s, s, s, s, s, s, s, -s],
	                [-s, -s, -s, s, -s, -s, s, -s, s, -s, -s, s],
	                [s, -s, -s, s, s, -s, s, s, s, s, -s, s],
	                [-s, -s, -s, -s, -s, s, -s, s, s, -s, s, -s]
	            ];
	            var face = function(xyz){
	                var start = coords.length / 3;
	                var i;
	                for (i = 0; i < 12; i++) {
	                    coords.push(xyz[i]);
	                }
	                indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
	            };

	            for(var i = 0; i < 6; i++){
	                face(faceCorners[i]);
	            }

	            this.vertexPositions = new Float32Array(coords);
	            this.indices = new Uint8Array(indices);
	        }

	    }
	})(window.jQuery || window.Zepto);



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by KX on 2016/8/10.
	 */
	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(5);
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
	            for(var item in pts[urlId]){
	                if($.inArray(pts[urlId][item]['path'],GI.sys.imageLoadedList) == -1){
	                    _this.preloadTexture(pts[urlId][item]['path']);
	                }
	            }
	        }
	    };
	})(window.jQuery || window.Zepto);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// cuon-matrix.js (c) 2012 kanda and matsuda
	// 为LLY项目进行了一定的修改

	__webpack_require__(1);
	var Matrix4 = PanoAJK.Math.Matrix4 = function(opt_src) {
	  var i, s, d;
	  if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
	    s = opt_src.elements;
	    d = new Float32Array(16);
	    for (i = 0; i < 16; ++i) {
	      d[i] = s[i];
	    }
	    this.elements = d;
	  } else {
	    this.elements = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
	  }
	};

	Matrix4.prototype.set = function(src) {
	  var i, s, d;

	  s = src.elements;
	  d = this.elements;

	  if (s === d) {
	    return;
	  }
	    
	  for (i = 0; i < 16; ++i) {
	    d[i] = s[i];
	  }

	  return this;
	};

	Matrix4.prototype.concat = function(other) {
	  var i, e, a, b, ai0, ai1, ai2, ai3;
	  
	  // e = a * b を計算する
	  e = this.elements;
	  a = this.elements;
	  b = other.elements;
	  
	  // eとbが同じ場合、bの内容を一時的な配列にコピーする
	  if (e === b) {
	    b = new Float32Array(16);
	    for (i = 0; i < 16; ++i) {
	      b[i] = e[i];
	    }
	  }
	  
	  for (i = 0; i < 4; i++) {
	    ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
	    e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
	    e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
	    e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
	    e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
	  }
	  
	  return this;
	};
	Matrix4.prototype.multiply = Matrix4.prototype.concat;

	Matrix4.prototype.multiplyVector3 = function(pos) {
	  var e = this.elements;
	  var p = pos.elements;
	  var v = new Vector3();
	  var result = v.elements;

	  result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[ 8] + e[12];
	  result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[ 9] + e[13];
	  result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[14];

	  return v;
	};

	Matrix4.prototype.multiplyVector4 = function(pos) {
	  var e = this.elements;
	  var p = pos.elements;
	  var v = new Vector4();
	  var result = v.elements;

	  result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[ 8] + p[3] * e[12];
	  result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[ 9] + p[3] * e[13];
	  result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
	  result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

	  return v;
	};

	Matrix4.prototype.setInverseOf = function(other) {
	  var i, s, d, inv, det;

	  s = other.elements;
	  d = this.elements;
	  inv = new Float32Array(16);

	  inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
	            + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
	  inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
	            - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
	  inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
	            + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
	  inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
	            - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];

	  inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
	            - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
	  inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
	            + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
	  inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
	            - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
	  inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
	            + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];

	  inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
	            + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
	  inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
	            - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
	  inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
	            + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
	  inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
	            - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];

	  inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
	            - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
	  inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
	            + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
	  inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
	            - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
	  inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
	            + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];

	  det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
	  if (det === 0) {
	    return this;
	  }

	  det = 1 / det;
	  for (i = 0; i < 16; i++) {
	    d[i] = inv[i] * det;
	  }

	  return this;
	};

	Matrix4.prototype.invert = function() {
	  return this.setInverseOf(this);
	};

	Matrix4.prototype.setOrtho = function(left, right, bottom, top, near, far) {
	  var e, rw, rh, rd;

	  if (left === right || bottom === top || near === far) {
	    throw 'null frustum';
	  }

	  rw = 1 / (right - left);
	  rh = 1 / (top - bottom);
	  rd = 1 / (far - near);

	  e = this.elements;

	  e[0]  = 2 * rw;
	  e[1]  = 0;
	  e[2]  = 0;
	  e[3]  = 0;

	  e[4]  = 0;
	  e[5]  = 2 * rh;
	  e[6]  = 0;
	  e[7]  = 0;

	  e[8]  = 0;
	  e[9]  = 0;
	  e[10] = -2 * rd;
	  e[11] = 0;

	  e[12] = -(right + left) * rw;
	  e[13] = -(top + bottom) * rh;
	  e[14] = -(far + near) * rd;
	  e[15] = 1;

	  return this;
	};

	Matrix4.prototype.setFrustum = function(left, right, bottom, top, near, far) {
	  var e, rw, rh, rd;

	  if (left === right || top === bottom || near === far) {
	    throw 'null frustum';
	  }
	  if (near <= 0) {
	    throw 'near <= 0';
	  }
	  if (far <= 0) {
	    throw 'far <= 0';
	  }

	  rw = 1 / (right - left);
	  rh = 1 / (top - bottom);
	  rd = 1 / (far - near);

	  e = this.elements;

	  e[ 0] = 2 * near * rw;
	  e[ 1] = 0;
	  e[ 2] = 0;
	  e[ 3] = 0;

	  e[ 4] = 0;
	  e[ 5] = 2 * near * rh;
	  e[ 6] = 0;
	  e[ 7] = 0;

	  e[ 8] = (right + left) * rw;
	  e[ 9] = (top + bottom) * rh;
	  e[10] = -(far + near) * rd;
	  e[11] = -1;

	  e[12] = 0;
	  e[13] = 0;
	  e[14] = -2 * near * far * rd;
	  e[15] = 0;

	  return this;
	};

	Matrix4.prototype.frustum = function(left, right, bottom, top, near, far) {
	  return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
	};

	Matrix4.prototype.setPerspective = function(fovy, aspect, near, far) {
	  var e, rd, s, ct;

	  if (near === far || aspect === 0) {
	    throw 'null frustum';
	  }
	  if (near <= 0) {
	    throw 'near <= 0';
	  }
	  if (far <= 0) {
	    throw 'far <= 0';
	  }

	  fovy = Math.PI * fovy / 180 / 2;
	  s = Math.sin(fovy);
	  if (s === 0) {
	    throw 'null frustum';
	  }

	  rd = 1 / (far - near);
	  ct = Math.cos(fovy) / s;

	  e = this.elements;

	  e[0]  = ct / aspect;
	  e[1]  = 0;
	  e[2]  = 0;
	  e[3]  = 0;

	  e[4]  = 0;
	  e[5]  = ct;
	  e[6]  = 0;
	  e[7]  = 0;

	  e[8]  = 0;
	  e[9]  = 0;
	  e[10] = -(far + near) * rd;
	  e[11] = -1;

	  e[12] = 0;
	  e[13] = 0;
	  e[14] = -2 * near * far * rd;
	  e[15] = 0;

	  return this;
	};

	Matrix4.prototype.perspective = function(fovy, aspect, near, far) {
	  return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
	};

	Matrix4.prototype.scale = function(x, y, z) {
	  var e = this.elements;
	  e[0] *= x;  e[4] *= y;  e[8]  *= z;
	  e[1] *= x;  e[5] *= y;  e[9]  *= z;
	  e[2] *= x;  e[6] *= y;  e[10] *= z;
	  e[3] *= x;  e[7] *= y;  e[11] *= z;
	  return this;
	};

	Matrix4.prototype.setTranslate = function(x, y, z) {
	  var e = this.elements;
	  e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
	  e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
	  e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
	  e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
	  return this;
	};

	Matrix4.prototype.translate = function(x, y, z) {
	  var e = this.elements;
	  e[12] += e[0] * x + e[4] * y + e[8]  * z;
	  e[13] += e[1] * x + e[5] * y + e[9]  * z;
	  e[14] += e[2] * x + e[6] * y + e[10] * z;
	  e[15] += e[3] * x + e[7] * y + e[11] * z;
	  return this;
	};

	Matrix4.prototype.setRotate = function(angle, x, y, z) {
	  var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

	  angle = Math.PI * angle / 180;
	  e = this.elements;

	  s = Math.sin(angle);
	  c = Math.cos(angle);

	  if (0 !== x && 0 === y && 0 === z) {
	    // X軸まわりの回転
	    if (x < 0) {
	      s = -s;
	    }
	    e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
	    e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
	    e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
	    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
	  } else if (0 === x && 0 !== y && 0 === z) {
	    // Y軸まわりの回転
	    if (y < 0) {
	      s = -s;
	    }
	    e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
	    e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
	    e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
	    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
	  } else if (0 === x && 0 === y && 0 !== z) {
	    // Z軸まわりの回転
	    if (z < 0) {
	      s = -s;
	    }
	    e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
	    e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
	    e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
	    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
	  } else {
	    // その他の任意軸まわりの回転
	    len = Math.sqrt(x*x + y*y + z*z);
	    if (len !== 1) {
	      rlen = 1 / len;
	      x *= rlen;
	      y *= rlen;
	      z *= rlen;
	    }
	    nc = 1 - c;
	    xy = x * y;
	    yz = y * z;
	    zx = z * x;
	    xs = x * s;
	    ys = y * s;
	    zs = z * s;

	    e[ 0] = x*x*nc +  c;
	    e[ 1] = xy *nc + zs;
	    e[ 2] = zx *nc - ys;
	    e[ 3] = 0;

	    e[ 4] = xy *nc - zs;
	    e[ 5] = y*y*nc +  c;
	    e[ 6] = yz *nc + xs;
	    e[ 7] = 0;

	    e[ 8] = zx *nc + ys;
	    e[ 9] = yz *nc - xs;
	    e[10] = z*z*nc +  c;
	    e[11] = 0;

	    e[12] = 0;
	    e[13] = 0;
	    e[14] = 0;
	    e[15] = 1;
	  }

	  return this;
	};

	Matrix4.prototype.setRotateKe = function(s, c, x, y, z) {
	    var e,len, rlen, nc, xy, yz, zx, xs, ys, zs;


	    e = this.elements;
	    if (0 !== x && 0 === y && 0 === z) {
	        // X軸まわりの回転
	        if (x < 0) {
	            s = -s;
	        }
	        e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
	        e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
	        e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
	        e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
	    } else if (0 === x && 0 !== y && 0 === z) {
	        // Y軸まわりの回転
	        if (y < 0) {
	            s = -s;
	        }
	        e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
	        e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
	        e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
	        e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
	    } else if (0 === x && 0 === y && 0 !== z) {
	        // Z軸まわりの回転
	        if (z < 0) {
	            s = -s;
	        }
	        e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
	        e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
	        e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
	        e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
	    } else {
	        // その他の任意軸まわりの回転
	        len = Math.sqrt(x*x + y*y + z*z);
	        if (len !== 1) {
	            rlen = 1 / len;
	            x *= rlen;
	            y *= rlen;
	            z *= rlen;
	        }
	        nc = 1 - c;
	        xy = x * y;
	        yz = y * z;
	        zx = z * x;
	        xs = x * s;
	        ys = y * s;
	        zs = z * s;

	        e[ 0] = x*x*nc +  c;
	        e[ 1] = xy *nc + zs;
	        e[ 2] = zx *nc - ys;
	        e[ 3] = 0;

	        e[ 4] = xy *nc - zs;
	        e[ 5] = y*y*nc +  c;
	        e[ 6] = yz *nc + xs;
	        e[ 7] = 0;

	        e[ 8] = zx *nc + ys;
	        e[ 9] = yz *nc - xs;
	        e[10] = z*z*nc +  c;
	        e[11] = 0;

	        e[12] = 0;
	        e[13] = 0;
	        e[14] = 0;
	        e[15] = 1;
	    }

	    return this;
	};

	Matrix4.prototype.rotate = function(angle, x, y, z) {
	  return this.concat(new Matrix4().setRotate(angle, x, y, z));
	};

	Matrix4.prototype.setLookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
	  var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

	  fx = centerX - eyeX;
	  fy = centerY - eyeY;
	  fz = centerZ - eyeZ;

	  // fを正規化する
	  rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
	  fx *= rlf;
	  fy *= rlf;
	  fz *= rlf;

	  // fとupの外積を求める
	  sx = fy * upZ - fz * upY;
	  sy = fz * upX - fx * upZ;
	  sz = fx * upY - fy * upX;

	  // sを正規化する
	  rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
	  sx *= rls;
	  sy *= rls;
	  sz *= rls;

	  // sとfの外積を求める
	  ux = sy * fz - sz * fy;
	  uy = sz * fx - sx * fz;
	  uz = sx * fy - sy * fx;

	  // 代入する
	  e = this.elements;
	  e[0] = sx;
	  e[1] = ux;
	  e[2] = -fx;
	  e[3] = 0;

	  e[4] = sy;
	  e[5] = uy;
	  e[6] = -fy;
	  e[7] = 0;

	  e[8] = sz;
	  e[9] = uz;
	  e[10] = -fz;
	  e[11] = 0;

	  e[12] = 0;
	  e[13] = 0;
	  e[14] = 0;
	  e[15] = 1;

	  // 平行移動する
	  return this.translate(-eyeX, -eyeY, -eyeZ);
	};

	Matrix4.prototype.dropShadow = function(plane, light) {
	  var mat = new Matrix4();
	  var e = mat.elements;

	  var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];

	  e[ 0] = dot - light[0] * plane[0];
	  e[ 1] =     - light[1] * plane[0];
	  e[ 2] =     - light[2] * plane[0];
	  e[ 3] =     - light[3] * plane[0];

	  e[ 4] =     - light[0] * plane[1];
	  e[ 5] = dot - light[1] * plane[1];
	  e[ 6] =     - light[2] * plane[1];
	  e[ 7] =     - light[3] * plane[1];

	  e[ 8] =     - light[0] * plane[2];
	  e[ 9] =     - light[1] * plane[2];
	  e[10] = dot - light[2] * plane[2];
	  e[11] =     - light[3] * plane[2];

	  e[12] =     - light[0] * plane[3];
	  e[13] =     - light[1] * plane[3];
	  e[14] =     - light[2] * plane[3];
	  e[15] = dot - light[3] * plane[3];

	  return this.concat(mat);
	};

	var Vector3 = PanoAJK.Math.Vector3 = function(opt_src) {
	  var v = new Float32Array(3);
	  if (opt_src && typeof opt_src === 'object') {
	    v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2];
	  } 
	  this.elements = v;
	};

	Vector3.prototype.length = function(){
	    return Math.sqrt(Math.pow(this.elements[0],2)+Math.pow(this.elements[1],2)+Math.pow(this.elements[2],2))
	};

	Vector3.prototype.dot = function(t){
	    var v = this.elements;
	    var w = t.elements;
	    return v[0]*w[0]+v[1]*w[1]+v[2]*w[2];
	};

	Vector3.prototype.cross = function(v){
	    var b = this.elements;
	    var c = v.elements;
	    var x = b[0], y = b[1], z = b[2];

	    b[0] = y * c[2] - z * c[1];
	    b[1] = z * c[0] - x * c[2];
	    b[2] = x * c[1] - y * c[0];
	    return this;
	};

	Vector3.prototype.setLength = function(t){
	    var length = this.length()/t;
	    if(length==0){
	        this.elements[0] = 0;
	        this.elements[1] = 0;
	        this.elements[2] = 0;
	    }else {
	        this.elements[0] = this.elements[0] / length;
	        this.elements[1] = this.elements[1] / length;
	        this.elements[2] = this.elements[2] / length;
	    }
	        return this;
	};

	Vector3.prototype.add = function(t) {
	    var a = t.elements;
	    this.elements[0] = this.elements[0] + a[0];
	    this.elements[1] = this.elements[1] + a[1];
	    this.elements[2] = this.elements[2] + a[2];
	   return this;
	};

	Vector3.prototype.subtract = function(t) {
	    var a = t.elements;
	    this.elements[0] = this.elements[0] - a[0];
	    this.elements[1] = this.elements[1] - a[1];
	    this.elements[2] = this.elements[2] - a[2];
	    return this;
	};

	Vector3.prototype.normalize = function() {
	    var v = this.elements;
	    var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c*c+d*d+e*e);
	    if(g){
	        if(g == 1)
	            return this;
	    } else {
	        v[0] = 0; v[1] = 0; v[2] = 0;
	        return this;
	    }
	    g = 1/g;
	    v[0] = c*g; v[1] = d*g; v[2] = e*g;
	    return this;
	};

	Vector3.prototype.scale = function(num){
	  var v = this.elements;
	    v[0] = num*v[0];
	    v[1] = num*v[1];
	    v[2] = num*v[2];
	    return this;
	};

	Vector3.prototype.copy = function(t){
	  var v = this.elements;
	  var tt = t.elements;
	  v[0] = tt[0];
	    v[1] = tt[1];
	    v[2] = tt[2];
	    return this;
	};

	Vector3.prototype.applyQuat = function(q){
	  var v = this.elements;
	  var x = v[0], y = v[1], z = v[2],
	      qx = q[0], qy = q[1], qz = q[2], qw = q[3],
	  // 计算乘积
	      ix = qw * x + qy * z - qz * y,
	      iy = qw * y + qz * x - qx * z,
	      iz = qw * z + qx * y - qy * x,
	      iw = -qx * x - qy * y - qz * z;

	  v[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	  v[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	  v[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	};

	Vector3.prototype.reverse = function(){
	  var v = this.elements;
	  v[0] = -v[0];
	  v[1] = -v[1];
	  v[2] = -v[2];
	};

	var Vector4 = PanoAJK.Math.Vector4 = function(opt_src) {
	  var v = new Float32Array(4);
	  if (opt_src && typeof opt_src === 'object') {
	    v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2]; v[3] = opt_src[3];
	  } 
	  this.elements = v;
	};

	var Quat = PanoAJK.Math.Quat = function() {

	  this[0] = 0;
	  this[1] = 0;
	  this[2] = 0;
	  this[3] = 1;
	};

	Quat.prototype.setFromAxisAngle = function(axis, rad) {
	  rad = rad * 0.5;
	  var s = Math.sin(rad);
	  this[0] = s * axis[0];
	  this[1] = s * axis[1];
	  this[2] = s * axis[2];
	  this[3] = Math.cos(rad);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by KX on 2016/8/10.
	 */
	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(5);
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
	        _this.alpha = 0.1;
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

	            if(GI.selId != -1){
	                _this.brighten();
	            }else if(GI.selId == -1){
	                _this.darken();
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by KX on 2016/8/9.
	 */
	__webpack_require__(1);

	(function($){
	    var heightWidthRatio,
	        canvasBodyWidthRatio;

	    PanoAJK.Main.Canvas = function(cavDom,hwRadio){ //传入canvas的Dom元素
	        var jqCanvasDom = $(cavDom);
	        jqCanvasDom.attr({'width':jqCanvasDom.width()});
	        if(hwRadio){
	            heightWidthRatio = hwRadio;
	        }else{
	            heightWidthRatio = jqCanvasDom.height()/jqCanvasDom.width();
	        }
	        jqCanvasDom.attr({'height':jqCanvasDom.width()*heightWidthRatio});
	        this.core = cavDom;
	        this.halfDiagonal = Math.sqrt(this.core.width*this.core.width + this.core.height*this.core.height)*10;
	        canvasBodyWidthRatio = jqCanvasDom.width()/$('body').width();
	    };

	    PanoAJK.Main.Canvas.prototype = {
	        constructor : PanoAJK.Main.Canvas,

	        width : function(){
	            return this.core.width;
	        },

	        height : function(){
	            return this.core.height;
	        },

	        //更新渲染视口
	        resizeViewport : function(GI){
	            GI.sys.gl.viewport(0, 0, GI.sys.canvas.width, GI.sys.canvas.height);
	        },

	        resize : function(GIcontext){
	            var bodyWidCurrent = $('body').width();
	            //更改canvas 行间样式的宽高
	            var jqCanvasDom = $(this.core);
	            jqCanvasDom.attr({'width':bodyWidCurrent*canvasBodyWidthRatio});
	            jqCanvasDom.css({'width':jqCanvasDom.attr('width')+'px'});
	            jqCanvasDom.attr({'height':jqCanvasDom.width()*heightWidthRatio});
	            jqCanvasDom.css({'height':jqCanvasDom.attr('height')+'px'});

	            //更新canvas 的对角线长度
	            this.halfDiagonal = Math.sqrt(this.core.width*this.core.width + this.core.height*this.core.height)*10;

	            if(GIcontext){
	                this.resizeViewport(GIcontext);
	            }
	        }

	    };
	})(window.jQuery || window.Zepto);



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by KX on 2016/8/9.
	 */
	__webpack_require__(1);
	__webpack_require__(5);
	(function($){

	    PanoAJK.Main.Camera = function(loc,tar,up,limitUp,limitLow){
	        var _this = this;
	        _this.loc = loc || new PanoAJK.Math.Vector3();
	        _this.tar = tar || new PanoAJK.Math.Vector3([0,0,-1]);
	        _this.up = up || new PanoAJK.Math.Vector3([0,1,0]);
	        _this.upperLimit = limitUp || 1.0;
	        _this.lowerLimit = limitLow || -1.0;
	        _this.dir = new PanoAJK.Math.Vector3().copy(_this.tar).subtract(_this.loc);
	    };

	})(window.jQuery || window.Zepto);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by KX on 2016/8/9.
	 */
	__webpack_require__(1);
	__webpack_require__(5);
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
	                }
	                //更新全景相邻点位
	                GI.objsToDraw.neighPts.updateDate();

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
	                        _this.mouse = [(event.changedTouches[0].clientX - cavsBound.left) * 2 / canvas.width - 1, 1 - (event.changedTouches[0].clientY - cavsBound.top) * 2 / canvas.height];
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



/***/ }
/******/ ]);