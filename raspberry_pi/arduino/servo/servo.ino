/***************************************************************/
/* Author: German Carro Fernandez                                      */
/* DIEEC, UNED                                                                   */
/***************************************************************/


#define START_MOV_CHAR '^'
#define END_MOV_CHAR '$'
#define MOV_SIZE 8
#include <Servo.h>

char buffer[10];
Servo servo1;
int servoPin = 11;

void setup() {
  servo1.attach(11);
  digitalWrite(servoPin, LOW);  
  Serial.begin(9600);
  Serial.flush();
  servo1.write(0);
  Serial.println("Starting...");
  
}

void loop() {
   
  if (Serial.available() > 0 ){
    int index=0;
    delay(1000);
    int numChar = Serial.available();
    if (numChar>10) {
    numChar=10;
    }
    while (numChar--){
    buffer[index++] = Serial.read();
    }
    splitString(buffer);
  }
}

void splitString(char* data) {
  Serial.print("Data entered: ");
  Serial.println(data);
  char* parameter;
  parameter = strtok (data, " ,");
  while (parameter != NULL)
  {
  setServo(parameter);
  parameter = strtok (NULL, " ,");
  }
  for (int x=0; x<9; x++) {
  buffer[x]='\0';
  }
  
  Serial.flush();
}
  
void setServo(char* data) {
if ((data[0] == 'L')|| (data[0] == 'l')){
int firstVal = strtol(data+1, NULL, 10);
firstVal = constrain(firstVal,0,180);
servo1.write(firstVal);
Serial.print("Servo is set to: ");
Serial.print(firstVal);
}
} 