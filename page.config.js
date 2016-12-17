var outputPath = __dirname + "/public/javascripts/";
console.log(__dirname);
var data = {
	"login/login": "login/login.js",
	"index/index": "index/index.js",
	"list/list": "list/list.js",
	"single/single": "single/single.js",
	"pano/pano": "pano/pano.js",
	"backend/houseInfo": "backend/houseInfo.js",
	"login/myInfo": "login/myInfo.js",
	"login/myCollect": "login/myCollect.js",
	"login/myMessage": "login/myMessage.js"
}
var dataExport = {};
for(var key in data) {
	dataExport["/public/javascripts/js/" + key] = outputPath + "jsentry/" + data[key];
}
module.exports = dataExport;