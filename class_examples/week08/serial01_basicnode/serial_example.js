/*		Node.js Basic Serial Port
 *		-------------------------
 *		
 *		Installation:		
 *		npm install serialport
 *	
 *		Reference Page:
 *		https://github.com/voodootikigod/node-serialport
 *
 *		MAC OSX Download XCODE Commandline tools: (if you don't have XCODE you need to sign up for an apple developer account)
 *		
 *		Download the DMG for your OS here:
 *			https://developer.apple.com/downloads/index.action
 *
 *		If you do have xcode follow these instructions: 
 * 			http://docwiki.embarcadero.com/RADStudio/XE4/en/Installing_the_Xcode_Command_Line_Tools_on_a_Mac
 *
 *
 *		WINDOWS/Linux Follow instructions on Reference Page
 */

var serialport = require("serialport");

//go into arduino and find your devices port. Make sure you type it out exactly
var myPort = "/dev/tty.usbmodem1a1231";

var arduino = new serialport.SerialPort(myPort, {
  baudrate: 9600,	//the baud rate of our device
  parser: serialport.parsers.readline('\r\n') //parse for carriage return & newlines not just anything on the port
});


arduino.on('open',function(){ //once the connection opens
	console.log('Open');
	arduino.on('data',function(data){
		console.log('Received: '+data );
		//do something interesting with the data here

		//arduino.write('Hello');//Uncomment this line to write to the Serial Device
	});
	arduino.on('error',function(data){
		console.log('Error: '+data);
	})
});