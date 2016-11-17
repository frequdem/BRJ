var outputPath = __dirname + "/public/javascripts/";
var data = {
	"login/login": "login/login.js",
	"index/index": "index/index.js"
}
var dataExport = {};
for(var key in data) {
	dataExport["/public/javascripts/js/" + key] = outputPath + "jsentry/" + data[key];
}
module.exports = dataExport;