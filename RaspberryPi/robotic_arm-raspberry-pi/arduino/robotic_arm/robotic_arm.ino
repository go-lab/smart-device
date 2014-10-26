/***************************************************************/
/* Author: German Carro Fernandez                              */
/* DIEEC, UNED       											*/
/* GPLv3 License                                               */
/***************************************************************/


#define START_MOV_CHAR '^'
#define END_MOV_CHAR '$'
#define MOV_SIZE 8

int pinI1=2;//define I1 port 
int pinI2=3;//define I2 port
int pinI3=4;//define I3 port 
int pinI4=5;//define I4 port
int pinI5=6;//define I5 port 
int pinI6=7;//define I6 port
int pinI7=8;//define I7 port 
int pinI8=9;//define I8 port
int pinI9=10;//define I9 port 
int pinI10=11;//define I10 port 
int blueLed=12;//define Led port

char serialMessage[MOV_SIZE];
unsigned int readChar;
unsigned int count;
unsigned long mov;
boolean readingSerial;
int abase;
int ahombro;
int acodo;
int amuneca;
int apinza;

void setup() {
  Serial.begin(9600);
  readingSerial = false;
  pinMode(pinI1,OUTPUT);//define these ports as output 
  pinMode(pinI2,OUTPUT); 
  pinMode(pinI3,OUTPUT); 
  pinMode(pinI4,OUTPUT); 
  pinMode(pinI5,OUTPUT); 
  pinMode(pinI6,OUTPUT); 
  pinMode(pinI7,OUTPUT); 
  pinMode(pinI8,OUTPUT); 
  pinMode(pinI9,OUTPUT); 
  pinMode(pinI10,OUTPUT);
  pinMode(blueLed, OUTPUT); 
 
  digitalWrite(pinI1,LOW); //Load LOW value on ports as default value
  digitalWrite(pinI2,LOW);
  digitalWrite(pinI3,LOW);
  digitalWrite(pinI4,LOW);
  digitalWrite(pinI5,LOW);
  digitalWrite(pinI6,LOW);
  digitalWrite(pinI7,LOW);
  digitalWrite(pinI8,LOW); 
  digitalWrite(pinI9,LOW);
  digitalWrite(pinI10,LOW);
  digitalWrite(blueLed,LOW);
}

void loop() {
   
  if (Serial.available() > 0 && !readingSerial) {
    if (Serial.read() == START_MOV_CHAR) {
      serialReadMov();
    }
  }
}

void serialReadMov() {
  readingSerial = true;
  count = 0;
  iniReading:
  if (Serial.available() > 0) {
    readChar = Serial.read();

    if (readChar == END_MOV_CHAR || count == MOV_SIZE) {
      goto endReading;
    } else {
      serialMessage[count++] = readChar;
      goto iniReading;
    }
  }
  goto iniReading;
  endReading:
  readingSerial = false;
  serialMessage[count] = '\0';
  setMov(serialMessage);
   
}

void setMov(char* value)
{
  
int mov = atoi(value);
 
// Extract mov
  if (mov == 1 && amuneca<4) {
// amuneca+=1; //Only to limit the movements
 Serial.print (amuneca);
 digitalWrite(pinI1,HIGH);// DC motor rotates anticlockwise 
 digitalWrite(pinI2,LOW);
 delay(350); 
 digitalWrite(pinI2,LOW); 
 digitalWrite(pinI1,LOW); 
  }
  else  if (mov == 2 && amuneca>-4) {
//amuneca-=1;
 digitalWrite(pinI1,LOW);// DC motor rotates clockwise 
 digitalWrite(pinI2,HIGH);
 delay(350); 
 digitalWrite(pinI1,LOW);
 digitalWrite(pinI2,LOW);
  } 
 else  if (mov == 3 && acodo<4) {
//acodo+=1;
 digitalWrite(pinI3,HIGH);// DC motor rotates anticlockwise 
 digitalWrite(pinI4,LOW);
 delay(350); 
 digitalWrite(pinI3,LOW);
 digitalWrite(pinI4,LOW);
  } 
 else  if (mov == 4 && acodo>-4) {
 //acodo-=1;
 digitalWrite(pinI3,LOW);// DC motor rotates clockwise 
 digitalWrite(pinI4,HIGH);
 delay(350); 
 digitalWrite(pinI3,LOW);
 digitalWrite(pinI4,LOW);
  } 
 else  if (mov == 5 && ahombro<4) {
 //ahombro+=1;
 digitalWrite(pinI5,HIGH);// DC motor rotates anticlockwise 
 digitalWrite(pinI6,LOW);
 delay(350); 
 digitalWrite(pinI5,LOW);
 digitalWrite(pinI6,LOW);
  } 
 else  if (mov == 6 && ahombro>-4) {
 //ahombro-=1;
 digitalWrite(pinI5,LOW);// DC motor rotates clockwise 
 digitalWrite(pinI6,HIGH);
 delay(350); 
 digitalWrite(pinI5,LOW);
 digitalWrite(pinI6,LOW);
  } 
   else  if (mov == 7 && abase<4 ) {
 //abase+=1;
 digitalWrite(pinI7,HIGH);// DC motor rotates anticlockwise 
 digitalWrite(pinI8,LOW);
 delay(350); 
 digitalWrite(pinI7,LOW);
 digitalWrite(pinI8,LOW);
  } 
 else  if (mov == 8 && abase>-4) {
 //abase-=1;
 digitalWrite(pinI7,LOW);// DC motor rotates clockwise 
 digitalWrite(pinI8,HIGH);
 delay(350); 
 digitalWrite(pinI7,LOW);
 digitalWrite(pinI8,LOW);
  } 
 else  if (mov == 9 && apinza<4) {
 // apinza+=1;
 digitalWrite(pinI9,HIGH);// DC motor rotates anticlockwise 
 digitalWrite(pinI10,LOW);
 delay(350); 
 digitalWrite(pinI9,LOW);
 digitalWrite(pinI10,LOW);
  } 
 else  if (mov == 10 && apinza>-4) {
 //apinza-=1;
 digitalWrite(pinI9,LOW);// DC motor rotates anticlockwise 
 digitalWrite(pinI10,HIGH);
 delay(350); 
 digitalWrite(pinI9,LOW);
 digitalWrite(pinI10,LOW);
  } 
 else  if (mov == 11) {
 digitalWrite(blueLed,HIGH); //Turn on blue Led
  }
 else  if (mov == 12) {
 digitalWrite(blueLed,LOW); //Turn off blue Led
  }
}