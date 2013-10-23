void setup(){
  Serial.begin(9600);
}

void loop(){

  Serial.println("Stuff");
  delay(3000);
  
  // Listen for Incoming Serial Messages
  //uncomment for serial messages  
//  while(Serial.available()>0){
//    char i = Serial.read();
//    Serial.print(i); 
//  }
}
