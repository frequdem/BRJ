/**
 * Created by KX on 2016/8/9.
 */
require('./PanoAJK.js');
require('../WebGL/math.js');
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