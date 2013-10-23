
// This example code is in the public domain.

import processing.serial.*;

int bgcolor;			     // Background color
int fgcolor;			     // Fill color

int xpos, ypos;

Serial myPort;                       // The serial port
int[] serialInArray = new int[5];    // Where we'll put what we receive
int serialCount = 0;                 // A count of how many bytes we receive
boolean firstContact = false;        // Whether we've heard from the microcontroller

int digital_1;
int digital_2;
int digital_3;
int analog_1;
int analog_2;


void setup() {
  size(256, 256);  // Stage size
  noStroke();      // No border on the next thing drawn

  // Set the starting position of the ball (middle of the stage)
  xpos = width/2;
  ypos = height/2;

  // Print a list of the serial ports, for debugging purposes:
  println(Serial.list());

  // I know that the first port in the serial list on my mac
  // is always my  FTDI adaptor, so I open Serial.list()[0].
  // On Windows machines, this generally opens COM1.
  // Open whatever port is the one you're using.
  String portName = Serial.list()[0];
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  background(bgcolor);
  //fill(fgcolor);
  // Draw the shape
  //ellipse(xpos, ypos, 20, 20);
}

void serialEvent(Serial myPort) {
  // read a byte from the serial port:
  int inByte = myPort.read();
  // if this is the first byte received, and it's an A,
  // clear the serial buffer and note that you've
  // had first contact from the microcontroller. 
  // Otherwise, add the incoming byte to the array:
  if (firstContact == false) {
    if (inByte == 'A') { 
      myPort.clear();          // clear the serial port buffer
      firstContact = true;     // you've had first contact from the microcontroller
      myPort.write('A');       // ask for more
    } 
  } 
  else {
    // Add the latest byte from the serial port to array:
    serialInArray[serialCount] = inByte;
    serialCount++;
    
    // If we have 5 bytes:
    if (serialCount > 4 ) {
      digital_1 = serialInArray[0];
      digital_2 = serialInArray[1];
      digital_3 = serialInArray[2];
      analog_1 = serialInArray[3];
      analog_2 = serialInArray[4];

      // print the values (for debugging purposes only):
      println(digital_1 + "\t" + digital_2 + "\t" + digital_3 + "\t" + analog_1 + "\t" + analog_2 + "\t");

      // Send a capital A to request new sensor readings:
      myPort.write('A');
      // Reset serialCount:
      serialCount = 0;
    }
  }
}





