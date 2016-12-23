/**
 * Created by KX on 2016/7/8.
 */

(function($){
    PanoAJK.RoomPlan = function(GIcontext,planDom,ctrller){ //三个参数分别代表GI核心程序，展示平面图的DOM元素，相机控制器
        var _this = this;
        _this.PANOPOINT = true;
        _this.PANOPOINT_CLICKABLE = true;

        var rootDom = planDom;
        var GI = _this.GI = GIcontext;
        _this.ctrller = ctrller;
        var pts = GIcontext.sys.pts;

        //存储方位点的信息
        var dir = _this.ctrller.dir.elements;
        _this.dir = [dir[0],dir[2]];
        _this.panoPath = GI.sys.currentPath;

        _this.panoList = {};
        var roomNames = [];
        for(var item in pts){


            for(var i = 0;i < pts[item].length;i++){
                var name = pts[item][i].name;
                if($.inArray(name,roomNames) == -1 ){
                    roomNames.push(name);
                    _this.panoList[pts[item][i].path] = {planPt:pts[item][i].planPt};
                }
            }
        }

        _this.virtualDom = document.createElement('div');

        //加入平面图
        var planImg = new Image();
        var pathSegs = GI.sys.firstPath.split('/');
        planImg.src = pathSegs[0]+'/'+pathSegs[1]+'/'+'roomPlan.png';
        var planCss = document.createAttribute('style');
        planCss.nodeValue = 'width:100%;' /* min-width:200px; max-width:400px*/ ;
        planImg.setAttributeNode(planCss);
        _this.virtualDom.appendChild(planImg);


        //加入全景点位
        //是否加入全景点位
        if(_this.PANOPOINT){
            for(var key in _this.panoList){
                var planPtImg = new Image();

                planPtImg.src = pathSegs[0]+'/'+'common/placePoint.png';
                var planImgCss = document.createAttribute('style');
                planImgCss.nodeValue = 'position:absolute;top:'+_this.panoList[key]['planPt'][0]+'%;left:'+ _this.panoList[key]['planPt'][1] +'%;';
                planPtImg.setAttributeNode(planImgCss);

                //是否平面图中的点位允许点击。
                if(_this.PANOPOINT_CLICKABLE){
                    var planPtUrl = document.createAttribute('data-url');
                    planPtUrl.nodeValue = key;
                    planPtImg.setAttributeNode(planPtUrl);
                    planPtImg.onclick = function(){
                        GI.sys.currentPath = $(this).data('url');
                        GI.objsToDraw.skybox.updateTexture(GI.sys.currentPath,true);
                        if(GI.sys.wanderBool) {
                            GI.objsToDraw.neighPts.updateDate();
                            GI.objsToDraw.neighPts.render(_this.ctrller);
                        }
                    };
                    $(planPtImg).mouseover(function(){
                        $(this).css({'cursor':'pointer'});
                        this.src = pathSegs[0]+'/'+'common/placePointHover.png';
                    }).mouseout(function(){
                        $(this).css({'cursor':'default'});
                        this.src = pathSegs[0]+'/'+'common/placePoint.png';
                    });
                }
                _this.virtualDom.appendChild(planPtImg);
            }
        }

        //加入平面指针
        var pointerImg = new Image();
        _this.pointerImg = $(pointerImg);//保存DOM元素，避免内存泄漏

        pointerImg.src = pathSegs[0]+'/'+'common/dirPointer.png';

        var pointerCss = document.createAttribute('style');


        //第一个全景点在平面图上的位置
        var locOfFirstPt = _this.panoList[GI.sys.firstPath]['planPt'];
        pointerCss.nodeValue = 'position: absolute;top:' + locOfFirstPt[0] + '%;left: ' + locOfFirstPt[1] +'%;Z-index: 10';
        pointerImg.setAttributeNode(pointerCss);
        _this.virtualDom.appendChild(pointerImg);


        var virtualCss = document.createAttribute('style');
        virtualCss.nodeValue = 'position: relative;';
        _this.virtualDom.setAttributeNode(virtualCss);
        rootDom.appendChild(_this.virtualDom);

    };

    PanoAJK.RoomPlan.prototype.update = function(){
        var _this = this;

        //更新方向
        var dir = _this.ctrller.dir.elements;

        if(!(dir[0]== _this.dir[0] && dir[2] == _this.dir[2])){

            if(dir[0]>=0){
                _this.pointerImg.css({'transform':'rotate(-'+Math.acos(_this.ctrller.dirHorizontal.elements[2])*57.3+'deg)'});
            }
            else{
                _this.pointerImg.css({'transform':'rotate('+Math.acos(_this.ctrller.dirHorizontal.elements[2])*57.3+'deg)'});
            }
            _this.dir = [dir[0],dir[2]];
        }

        //更新位置
        if(_this.panoPath != _this.GI.sys.currentPath) {

            _this.panoPath = _this.GI.sys.currentPath;

            _this.pointerImg.css({'top':_this.panoList[_this.panoPath]['planPt'][0]+'%','left':_this.panoList[_this.panoPath]['planPt'][1]+'%'});

        }

    };
})(window.jQuery || window.Zepto);

