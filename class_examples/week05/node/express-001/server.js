
//In terminal - run: 

//npm install  - to download the necessary modules.
//node server.js - to run the server file in node.


var express = require('express'); //connect to the express module
var app = express(); //instantiate object of express as app


//listen for the index page
app.get('/',function(req, res){ 
	//req - is the request from the browser (an event)
	//res - is the response you send back

	//in this case we send back the text to the browser - a nice welcome message
	res.send('Welcome to the the best page ever');

});
//listen for a file called hello.txt
app.get('/hello.txt', function(req,res){ 

	//this response populates the page hello.txt when you visit
	res.send('Hello World');

});

//set the port we want to listen on -
//once we set this node will keep running until we quit it, control-C
//to visit these pages go to localhost:8080 in your browser
app.listen(8080);
console.log('Listening on port 8080, press control-C to quit');
