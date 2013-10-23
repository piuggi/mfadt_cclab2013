/*

   >>>>>>>>>    The circuit    <<<<<<<<<<
 * potentiometers attached to analog inputs 0 and 1 
 * pushbutton attached to digital I/O 2
 
 -- UPLOAD THIS CODE AND THEN QUIT ARDUINO! --
 
 Serial Call and Response
 Language: Wiring/Arduino
 
 This program sends an ASCII A (byte of value 65) on startup
 and repeats that until it gets some data in.
 Then it waits for a byte in the serial port, and 
 sends three sensor values whenever it gets a byte in.
 
 Thanks to Greg Shakar and Scott Fitzgerald for the improvements
 
 Created 26 Sept. 2005
 by Tom Igoe
 Modified 4 Sep 2010
 by Tom Igoe and Scott Fitzgerald

 This example code is in the public domain.

 http://www.arduino.cc/en/Tutorial/SerialCallResponse

 */

int firstSensor = 0;    // first analog sensor value
int secondSensor = 0;   // second analog sensor value
int thirdSensor = 0;    // digital sensor value
int inByte = 0;         // incoming serial byte

void setup()
{
  // start serial port at 9600 bps:
  Serial.begin(9600);
  pinMode(2, INPUT);   // digital sensor is on digital pin 2
  establishContact();  // send a byte to establish contact until receiver responds 
}

void loop()
{
  // if we get a valid byte, read analog ins:
  if (Serial.available() > 0) {
    // get incoming byte:
    inByte = Serial.read();
    // read first analog input, divide by 4 to make the range 0-255:
    firstSensor = analogRead(A0);
    firstSensor = firstSensor/4;
    // delay 10ms to let the ADC recover:
    delay(10);
    // read second analog input, divide by 4 to make the range 0-255:
    secondSensor = analogRead(1);
    secondSensor = secondSensor/4;
    // read  switch, map it to 0 or 255L
    thirdSensor = digitalRead(2);
    thirdSensor = map(thirdSensor, 0, 1, 0, 255);  
    // send sensor values:
    Serial.print(firstSensor, BYTE);
    Serial.print(secondSensor, BYTE);
    Serial.print(thirdSensor, BYTE);               
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    Serial.print('A', BYTE);   // send a capital A
    delay(300);
  }
}
