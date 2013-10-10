
//In terminal - run: 

//npm install  - to download the necessary modules.
//node server.js - to run the server file in node.

var express = require('express'); //connect to the express module(external located in node_modules folder after npm install)
var http = require('http'); //connect to the http module (native to node)
var socketio = require('socket.io'); //connect to the socket.io module, this allows us to use websockets - so we can stream real time data to the server and clients.

var app = express(); //instantiate object of express as app

var server = http.createServer(app); //create our webserver using http, but pass it our express application this allows express to handle traffic and websockets to work through http
var io = socketio.listen(server); //create our io object which has access to the server & express.
var port = 8080; //set our port

//include twitter
var twitter = require('ntwitter');
var twit = new twitter({

	  	consumer_key: 'consumer_key',
  		consumer_secret: 'consumer_secret',
  		access_token_key: 'access_token_key',
  		access_token_secret: 'access_token_secret'
});




app.use(express.static(__dirname+'/public')); //allow us to serve up the public folder for html files

server.listen(port);//start listening for traffic on our port

console.log("Listening on Port "+port+", press control-C to quit");

//socket event listener.
//this function sits and listens websocket traffic
//when it gets traffics it calls a function which it passes the socket
//for every socket event this gets called.
io.sockets.on('connection', function(socket){
	
	//when we recieve a connection - we send a hello message
	//the browser will see this right away
	//be sure to check the public folder for the response code
	socket.emit('news', {hello: 'world'});
	
});


twit.stream('statuses/filter', {track: 'wtf,goverment,#awesome',follow: '371351910'}, function(stream){

	//stream on gets called when twitter sends a new event - 
	//in this case something that matches what were tracking

	stream.on('data', function(data){

		//data contains the whole tweet object -
		//print out this whole object (data) to see what it contains

		//console.log(data);


		//here is a list of some things we are interested in from that object:
			//tweet
			//timestamp
			//person/username
			//number of followers
			//profile image

			//var tweet_text = data.text;
			//var timestamp = data.created_at;
			//var username = data.user.screen_name;
			//var numberFollowers = data.user.followers_count;
			//var profileImg = data.user.profile_image_url;

			//console.log("*****************************");

			//console.log("username: "+username);
			//console.log("tweet: "+tweet_text);
			//console.log("time: "+timestamp);
			//console.log("user_image: "+profileImg);
			//console.log("Followers: "+numberFollowers);

			//console.log("");
		
		io.sockets.emit('twitter',data);

	} );

});








