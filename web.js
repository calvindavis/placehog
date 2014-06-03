var express = require("express");
var fs = require("fs");
var gm = require("gm");
var im = gm.subClass({ imageMagick: true });

var app = express();
var port = Number(process.env.PORT || 5000);

app.use(express.static("static"));

var getImageName = (function () {
	var imageNames = [
		"image-1",
		"image-2",
		"image-3"
	];
	
	return function (width, height) {
		var size = width + height;
		var index = size % imageNames.length;
		var imageName = imageNames[index];
		
		return imageName;
	};
})();

var requestHandler = function (req, res) {
	var params = req.params;
	var width = Number(params.width) || 100;
	var height = Number(params.height) || width;
	var name = getImageName(width, height);
	var path = __dirname + "/images/" + name + ".jpg";
	var image = im(path);
	
	image.resize(width, height, "!");
	image.stream(function (err, stdout, stderr) {
		res.set("Content-Type", "image/jpeg");
		stdout.pipe(res);
	});
};

app.get("/:width", requestHandler);
app.get("/:width/:height", requestHandler);

app.listen(port);