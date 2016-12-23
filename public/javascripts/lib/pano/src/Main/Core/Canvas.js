/**
 * Created by KX on 2016/8/9.
 */
require('./PanoAJK.js');

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

