
//------------------ Serial Variables --------------------
//this is a library we are importing into this sketch
import processing.serial.*;
Serial myPort;                       // The serial port
int[] serialInArray = new int[3];    // Where we'll put what we receive
int serialCount = 0;                 // A count of how many bytes we receive
boolean firstContact = false;        // Whether we've heard from the microcontroller
int sensor1, sensor2, button1;       // Our Incoming Sensor variables
//-------------------------------------------------------

//your variables!
int myBallX = 255;
int myBallX_2 = 255;
int myBallSize = 50;
int myRedColor = 255;
int myBlueColor = 0;

void setup() {
  //----------------- Serial Setup --------------------
  println(Serial.list());
  String portName = Serial.list()[0];
  myPort = new Serial(this, portName, 9600);
  //---------------------------------------------------

  size(500, 500); //all you now! change to whatever you want.
  background(0);
  smooth();
}

void draw() { 

  myBallX = sensor1 * 2;   //I want myBallX to go from 0 - 512. Multiply * 2 !
  myBallX_2 = sensor2 * 2;  //same for myBallX_2 coordinate!

  myRedColor = sensor1;
  myBlueColor = 255-sensor1;

  fill(myRedColor, 120, myBlueColor);
  ellipse(myBallX, 150, myBallSize, myBallSize);
  ellipse(myBallX_2, 350, myBallSize, myBallSize);

  if (button1 == 255) {
    background(random(255), random(255), random(255));
  }

  println("sensor1: " + sensor1 + "\t" + "sensor2: " + sensor2 + "\t" + "button1: " + button1);
}


void myFunction() {

  //could do something awesome here with sensor1....
}





//----------------------------- DON'T TOUCH ANYTHING BELOW THIS LINE  ----------------------------
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

    // If we have 3 bytes:
    if (serialCount > 2 ) {
      sensor1 = serialInArray[0];
      sensor2 = serialInArray[1];
      button1 = serialInArray[2];
      // Send a capital A to request new sensor readings:
      myPort.write('A');
      // Reset serialCount:
      serialCount = 0;
    }
  }
}
//---------------------------------------------------------------------------------------

