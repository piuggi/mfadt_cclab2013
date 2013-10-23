/*
  Serial Call and Response
 Language: Wiring/Arduino
 
 This program sends an ASCII A (byte of value 65) on startup
 and repeats that until it gets some data in.
 Then it waits for a byte in the serial port, and 
 sends five sensor values whenever it gets a byte in.
 
 The circuit:
 * potentiometers/analog sensors attached to analog inputs 0 and 1 
 * pushbuttons/digital sensors attached to digital pins 2, 3 and 4
 
 Based on code by
 by Tom Igoe

 jmsaavedra 2011
 */

int digital_1 = 0; // first digital sensor value
int digital_2 = 0; // second digital sensor value
int digital_3 = 0; // thirddigital sensor value
int analog_1 = 0;  //first analog sensor value
int analog_2 = 0;  //second analog sensor value
int inByte = 0;    // incoming serial byte

void setup()
{
  // start serial port at 9600 bps:
  Serial.begin(9600);
  pinMode(2, INPUT);   // digital sensor is on digital pin 2
  pinMode(3, INPUT);  // digital sensor (button) on dPin 3
  pinMode(4, INPUT);  // button on dPin 4
  establishContact();  // send a byte to establish contact until receiver responds 
}

void loop() {
  // if we get a valid byte, read analog ins:
  if (Serial.available() > 0) {
    // get incoming byte:
    inByte = Serial.read();
    
    // read digital pin 2:
    digital_1 = digitalRead(2);
    // read digital pin 3:
    digital_2 = digitalRead(3);
    // read digital pin 4:
    digital_3 = digitalRead(4);

    // read first analog input
    analog_1 = analogRead(0);
    // delay 10ms to let the ADC recover:
    delay(10);
    // read second analog input
    analog_2 = analogRead(1);
    // delay 10ms to let the ADC recover:
    delay(10);
    
    // send sensor values:
    Serial.print(digital_1, BYTE);
    Serial.print(digital_2, BYTE);
    Serial.print(digital_3, BYTE);
    Serial.print(analog_1, BYTE); 
    Serial.print(analog_2, BYTE);  
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    Serial.print('A', BYTE);   // send a capital A
    delay(300);
  }
}
