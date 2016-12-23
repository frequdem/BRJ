/**
 * Created by KX on 2016/8/17.
 */
require('../Core/PanoAJK.js');
require('../Core/Core.js');
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