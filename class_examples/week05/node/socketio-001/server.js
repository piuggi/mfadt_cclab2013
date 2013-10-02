var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 8080;

server.listen(port);

app.use(express.static(__dirname+'/public'));



io.sockets.on('connection', function(socket){
	
	socket.emit('news', {hello: 'world'});
	socket.on('mouse event', function(data){
		
		console.log(data);
		
	});
	
});