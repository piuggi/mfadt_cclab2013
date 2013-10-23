/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.
 
  This example code is in the public domain.
 */
 
// Pin 13 has an LED connected on most Arduino boards.
// give it a name:
int leds[] = { 13, 12 };
int numLEDS = 2;
// the setup routine runs once when you press reset:
void setup() {                
  // initialize the digital pin as an output.
  //pinMode(led, OUTPUT); 

  for(int i =0; i<numLEDS; i++){
      pinMode(leds[i],OUTPUT);   
  }  
}

// the loop routine runs over and over again forever:
void loop() {
  //turn on and off one LED and then the other
  for(int i =0; i<numLEDS; i++){
     digitalWrite(leds[i],HIGH); 
     delay(1000);
     digitalWrite(leds[i],LOW);
     delay(1000);   
  }
  
  //turn on both LEDS
  for(int i=0; i<numLEDS; i++){
    digitalWrite(leds[i],HIGH);
    delay(500);
  }
  
  //turn off both LEDS
  //go backwards through our array
  
  for(int i=numLEDS-1; i> -1 ;i--){
   digitalWrite(leds[i],LOW);
   delay(500); 
  }
  
  //digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
  //delay(1000);               // wait for a second
  //digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
  //delay(1000);               // wait for a second
}
