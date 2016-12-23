/**
 * Created by KX on 2016/7/15.
 */
(function($){
    var _this;
    var ctPrev = 0;

    PanoAJK.Loading = function(GIcontext,dom){
        _this = this;
        _this.rootDom = dom;
        _this.GI = GIcontext;

        //为了在刷新时，减少dom操作。
        var LoadingCss = document.createAttribute('style');
        LoadingCss.nodeValue = 'position:absolute;bottom:1%;left:0;width:100%;';
        _this.rootDom.setAttributeNode(LoadingCss);

        _this.railDom = document.createElement('div');
        var railCss = document.createAttribute('style');
        railCss.nodeValue = 'width:100%;height:9px;background:#000;';
        _this.railDom.setAttributeNode(railCss);

        _this.scheduleDom = document.createElement('span');
        var scheduleCss = document.createAttribute('style');
        scheduleCss.nodeValue = 'width:0;height:3px;margin:3px 0;background:#ff6600;position:absolute;box-shadow:0px 0px 10px 2px rgba(255,102,0,0.7);';
        _this.scheduleDom.setAttributeNode(scheduleCss);
        _this.railDom.appendChild(_this.scheduleDom);

        _this.rootDom.appendChild(_this.railDom);

        _this.rootdomJq = $(_this.rootDom);
        _this.scheduledomJq = $(_this.scheduleDom);

    };
    PanoAJK.Loading.prototype.update = function(){
        var ct = _this.GI.sys.imageLoadedCount[_this.GI.sys.currentPath];
        if( ct != 6){
            if(ct!=ctPrev){
                _this.scheduledomJq.animate({'width':(ct+1)/6*100+'%'},'fast');
                ctPrev = ct;
            }
            if(_this.rootdomJq.is(":hidden")){
                _this.rootdomJq.show();
            }
        }else{
            if(_this.rootdomJq.is(":visible")){
                _this.rootdomJq.hide();
                _this.scheduledomJq.css({'width':'0%'});
            }
        }
    };
})(window.jQuery || window.Zepto);

