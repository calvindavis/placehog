var express = require("express");
var app = express();
var port = Number(process.env.PORT || 5000);

app.use(express.static("static"));

app.get("/json", function (req, res) {
	var result = {
		placehog: true
	};
	var message = JSON.stringify(result);
	
	res.set("Content-Type", "application/json");
	res.send(message);
});

app.listen(port);