/**
 * Created by KX on 2016/8/9.
 */
require("../Core/PanoAJK.js");
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

