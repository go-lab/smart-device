Content and services description
================================
This is the main folder of the system. The "robotic_arm" folder contents the main files for server and client side, needed to use this source code with the laboratory.
Into this folder you can find:

- Server side: 
  The server side must be loaded into the Raspberry Pi OS (Raspbian).
  Into the "js" folder you can find the server.js. This file contents the source code to:
  1.- Open and manage the websocket channels to let the communication between client side and server side.
  2.- Open the USB serial port to send the data received by websockets channels to Arduino UNO R3 board.
  So, this file has the important mission fo translate the oreders of the users to the hardware laboratory.

- Client side:
  The client side files must be loaded into the Apache server of the PC desktop.
  Into the client side files you can find two sections:
  1.- Bootstrap and slider style libraries. Into the "style" folder you have the files needed to use the style libraries from Bootstrap and the style files developed for the slider. You can find these folders with the name "bootstrap-3.1.1-dist" and "slider".
  2.- The services files. On this folder you can find each of services available to use. All of them work with the same interface. You have to move a slider and when you have decided the position you have to clinck on the button to send the information to the websocket channel to Raspberry Pi. See the Wiki for more information (https://github.com/go-lab/smart-device/wiki/Robotic-Arm-Laboratory).
  A brief description of each service is offered below:
    a) base.html: let to control the base DC motor of Robotic Arm moving it to left or rigth.
    b) clamp.html: let to control the clamp of Robotic Arm closing or opening.
    c) elbow.html: let to control the elbow DC motor of Robotic Arm moving it to forward or backward.
    d) led.html: let to control the led of Robotic Arm tirn on or turn off.
    e) shoulder.html: let to control the shoulder DC motor of Robotic Arm moving it to forward or backward.
    f) wrist.html: let to control the wrist DC motor of Robotic Arm moving it to forward or backward.

Communication process
=====================
The structure of the communication process is:
  0.- Node.js server is open and USB serial port with Arduino board is open.
  1.- User access to the client side loaded into Apache server desktop PC, using a browser
  2.- User select the service and move the slider of the service to the desired position.
  3.- User click on button to launch to the server the desired position.
  4.- Server side into Rapsberry Pi received the petition of the client siede and open a wescoket channel to start the communication.
  5.- Client side received the opening statutos (socket.on) from the server side and launch for the channel the position of the service.
  6.- Server side received the position of the service and send the information to USB port towards Arduino board.
  7.- Arduino board received the postiion of the service and translate this data to chnage to HIGH/LOW level to Arduino pin connected to the Robotic Arm service.
  8.- Robotic arm service moves.
  9.- Server side from raspberry Pi send the new position to client side using the websockets channel opened previously.
  10.- Client side shows by screen the new value of the position launched on intervals of 10 seconds (is possibly customize the delay of the lectures if needed).
  11.- The process start again from point 5 because the websocket channel is opend until user close the browser.

The cycle is:
Browser->Raspberry Pi->Arduino->Robotic Arm
Robotic Arm->Arduino->Raspberry Pi->Browser 
