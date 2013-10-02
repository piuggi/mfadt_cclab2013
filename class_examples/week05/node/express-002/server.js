var express = require('express');
var app = express();
var port = 8080;

app.use(express.static(__dirname+'/public'));

app.listen(port);

console.log("Listening on Port "+port);


