var outputPath = __dirname + "/public/javascripts/";
console.log(__dirname);
var data = {
	"login/login": "login/login.js",
	"index/index": "index/index.js",
	"list/list": "list/list.js"
}
var dataExport = {};
for(var key in data) {
	dataExport["/public/javascripts/js/" + key] = outputPath + "jsentry/" + data[key];
}
module.exports = dataExport;