//In terminal - run: 

//**IMPORTANT**//

//npm install ntwitter  - to download the necessary modules

//reference here:: https://github.com/AvianFlu/ntwitter



//node server.js - to run the server file in node.


var twitter = require('ntwitter'); //connect to the twitter module

//twitter authentication
//make your twitter application and get your keys to your app
//https://dev.twitter.com/apps

var twit = new twitter({
  		consumer_key: 'your info',
  		consumer_secret: 'your info',
  		access_token_key: 'your info',
  		access_token_secret: 'your info'
});


//create a real-time connection with twitter tracking a phrase
//see all the data for the statuses/filter here:
//https://dev.twitter.com/docs/api/1.1/post/statuses/filter

twit.stream('statuses/filter', {track: 'wtf'}, function(stream){

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

		var tweet_text = data.text;
		var timestamp = data.created_at;
		var username = data.user.screen_name;
		var numberFollowers = data.user.followers_count;
		var profileImg = data.user.profile_image_url;

		console.log("*****************************");

		console.log("username: "+username);
		console.log("tweet: "+tweet_text);
		console.log("time: "+timestamp);
		console.log("user_image: "+profileImg);
		console.log("Followers: "+numberFollowers);

		console.log("");


	} );

});