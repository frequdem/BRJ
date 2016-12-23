/**
 * Created by KX on 2016/7/8.
 */
PanoAJK.Component.SceneSwitch = function(args){
    var _this = this;
    var rootDom = args.dom;
    var GI = _this.GI =  args.GI;
    var pts = GI.sys.pts;
    var imgWidth = args.imgWidth || 150;
    var imgHeight = args.imgHeight || 150;
    var imgMarginWidth = args.margin || 10;
    _this.virtualDom = document.createElement('div');

    var roomNames = [];

    for(var item in pts){

        for(var i = 0;i < pts[item].length;i++){
            var name = pts[item][i].name;

            if($.inArray(name,roomNames) == -1 ){
                roomNames.push(name);
                var path = pts[item][i]['path'];
                var img = new Image();

                img.src = path+"_cover.jpg";
                var imgId = document.createAttribute('id');
                imgId.nodeValue = path;
                img.setAttributeNode(imgId);

                var imgWidthAttr = document.createAttribute('width');
                imgWidthAttr.nodeValue = imgWidth;
                img.setAttributeNode(imgWidthAttr);
                var imgHeightAttr = document.createAttribute('height');
                imgHeightAttr.nodeValue = imgHeight;
                img.setAttributeNode(imgHeightAttr);
                img.onclick = function(){

                    GI.sys.currentPath = $(this).attr('id');
                    GI.objsToDraw.skybox.updateTexture(GI.sys.currentPath,true);

                    if(GI.sys.wanderBool) {
                        GI.objsToDraw.neighPts.updateDate();
                        GI.objsToDraw.neighPts.render(args.controller);
                    }
                };

                var roomnameP = document.createElement('p');
                var roomnameText = document.createTextNode(name);
                roomnameP.appendChild(roomnameText);

                var block= document.createElement('div');
                var blockStyle = document.createAttribute('style');
                blockStyle.nodeValue = "float:left;margin-right:"+imgMarginWidth+"px";
                var blockClass = document.createAttribute('class');
                blockClass.nodeValue = "imgBlock";
                block.setAttributeNode(blockStyle);
                block.setAttributeNode(blockClass);
                _this.virtualDom.appendChild(block);
                block.appendChild(img);
                block.appendChild(roomnameP);

            }
        }
    }
    var virtualId = document.createAttribute('style');
    virtualId.nodeValue = 'width:'+((imgWidth + imgMarginWidth)* roomNames.length) +'px;height:100%;';
    _this.virtualDom.setAttributeNode(virtualId);
    rootDom.appendChild(_this.virtualDom);

    $('.imgBlock').hover(function(){
        $(this).css({'cursor':'pointer'});
    })

};
