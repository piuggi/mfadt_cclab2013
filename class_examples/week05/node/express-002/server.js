
//In terminal - run: 

//npm install  - to download the necessary modules.
//node server.js - to run the server file in node.

var express = require('express'); //connect to the express module
var app = express(); //instantiate object of express as app
var port = 8080; //select a port


//use a folder to serve content out of (quickest way to get a webserver)
//all files in /public will be served up /visible to our server. 
//Meaning that we can connect to them with data.
//try adding your own html and css files to the public folder

app.use(express.static(__dirname+'/public')); 

//start listening on our port of 8080
//visit localhost:8080/your_file.ext to view your work
app.listen(port);

console.log("Listening on Port "+port+", press control-C to quit");


