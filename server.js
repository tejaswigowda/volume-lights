var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;
var Client = require('node-rest-client').Client;

var converter = require('hsl-to-rgb-for-reals');
 


app.get("/sendNote", function (req, res) {
	console.log(req.query);
	var h = parseInt(req.query.n)*30%360
	var s = 1 - (parseInt(req.query.n/12)*1/7);
	var v = parseInt(req.query.v)/100;
	v = .6;
	var x = converter(h,s,v);
	var y = "https://foxden.xyz/updateColor?id=5c_cf_7f_13_37_19&r=" + x[0] + "&g=" + x[1] + "&b=" + x[2]
	console.log(h,s,v, y);
	var client = new Client();
	client.get(y, function (data, response) {console.log(data)}); 
	res.send(0);

});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
