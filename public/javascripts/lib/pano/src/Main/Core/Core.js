
/**
 * Created by KX on 2016/8/9.
 */
require('./PanoAJK.js');
require('../WebGL/WebGLContext.js');
require('./Skybox.js');
require('./NeighPts.js');
require('./Canvas.js');
require('./Camera.js');
require('./Controller.js');
require('../WebGL/math.js');
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