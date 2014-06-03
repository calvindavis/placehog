var express = require("express");
var fs = require("fs");
var gm = require("gm");
var im = gm.subClass({ imageMagick: true });

var app = express();
var port = Number(process.env.PORT || 5000);

app.use(express.static("static"));

var getImageName = (function () {
	var images = [
		["image-1", 948, 532],
		["image-2", 2560, 1600],
		["image-3", 615, 409],
		["image-4", 446, 594],
		["image-5", 400, 400]
	];
	
	return function (width, height) {
		var ratio = width / height;
		var diff = Infinity;
		var name = null;
		
		images.forEach(function (image) {
			var thisName = image[0];
			var thisWidth = image[1];
			var thisHeight = image[2];
			var thisRatio = thisWidth / thisHeight;
			var thisDiff = Math.abs(thisRatio - ratio);
			
			if (thisDiff < diff) {
				diff = thisDiff;
				name = thisName;
			}
		});
		
		return name;
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