var express = require("express");
var app = express();
var port = Number(process.env.PORT || 5000);

app.get("/", function (req, res) {
	var result = {
		foo: 1,
		bar: true,
		baz: "Testing!",
		qux: function () {}
	};
	var message = JSON.stringify(result);
	
	res.set("Content-Type", "application/json");
	res.send(message");
});

app.listen(port);