Content and services description
================================
This is the main folder of the system. The "robotic_arm" folder contents the main files for server and client side, needed to use this source code with the laboratory.
Into this folder you can find:

- Server side:<br> 
  The server side must be loaded into the Raspberry Pi OS (Raspbian).<br>
  Into the "js" folder you can find the server.js. This file contents the source code to:<br>
  1.- Open and manage the websocket channels to let the communication between client side and server side.<br>
  2.- Open the USB serial port to send the data received by websockets channels to Arduino UNO R3 board.<br>
  So, this file has the important mission fo translate the oreders of the users to the hardware laboratory.<br>

- Client side:<br>
  The client side files must be loaded into the Apache server of the PC desktop.<br>
  Into the client side files you can find two sections:<br>
  1.- Bootstrap and slider style libraries. Into the "style" folder you have the files needed to use the style libraries from Bootstrap and the style files developed for the slider. You can find these folders with the name "bootstrap-3.1.1-dist" and "slider".<br>
  2.- The services files. On this folder you can find each of services available to use. All of them work with the same interface. You have to move a slider and when you have decided the position you have to clinck on the button to send the information to the websocket channel to Raspberry Pi. See the Wiki for more information (https://github.com/go-lab/smart-device/wiki/Robotic-Arm-Laboratory). A brief description of each service is offered below:<br>
      a) base.html: let to control the base DC motor of Robotic Arm moving it to left or rigth.<br>
      b) clamp.html: let to control the clamp of Robotic Arm closing or opening.<br>
      c) elbow.html: let to control the elbow DC motor of Robotic Arm moving it to forward or backward.<br>
      d) led.html: let to control the led of Robotic Arm tirn on or turn off.<br>
      e) shoulder.html: let to control the shoulder DC motor of Robotic Arm moving it to forward or backward.<br>
      f) wrist.html: let to control the wrist DC motor of Robotic Arm moving it to forward or backward.<br>

Communication process
=====================
The structure of the communication process is:<br>
  0.- Node.js server is open and USB serial port with Arduino board is open.<br>
  1.- User access to the client side loaded into Apache server desktop PC, using a browser<br>
  2.- User select the service and move the slider of the service to the desired position.<br>
  3.- User click on button to launch to the server the desired position.<br>
  4.- Server side into Rapsberry Pi received the petition of the client siede and open a wescoket channel to start the communication.<br>
  5.- Client side received the opening statutos (socket.on) from the server side and launch for the channel the position of the service.<br>
  6.- Server side received the position of the service and send the information to USB port towards Arduino board.<br>
  7.- Arduino board received the postiion of the service and translate this data to chnage to HIGH/LOW level to Arduino pin connected to the Robotic Arm service.<br>
  8.- Robotic arm service moves.<br>
  9.- Server side from raspberry Pi send the new position to client side using the websockets channel opened previously.<br>
  10.- Client side shows by screen the new value of the position launched on intervals of 10 seconds (is possibly customize the delay of the lectures if needed).<br>
  11.- The process start again from point 5 because the websocket channel is opend until user close the browser.<br>

The cycle is:<br>
Browser->Raspberry Pi->Arduino->Robotic Arm<br>
Robotic Arm->Arduino->Raspberry Pi->Browser <br>
