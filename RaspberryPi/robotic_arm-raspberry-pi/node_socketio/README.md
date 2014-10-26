Content and services description
================================
This is the main folder of the system. These folders contents the files for server and the files for client side.<br>

Note: you should change the IP and PORTs, for your Raspberry Pi IP and PORTs, into websocket reference of the files *.*js and *.*html.<br> 

This folder contains:

The "websocket_server" directory:<br>
This directory must be loaded into the Raspberry Pi Operative System (Raspbian). Recommendable use the path folder "/var/www/".<br>
In this folder, you can find the *.*js files for the server side. This files contain the source code to:<br>
1.- Open and manage the websocket channels to let the communication between client side and server side.<br>
2.- Open the USB serial port to send the data received by websockets channels to Arduino UNO R3 board.<br>
So, these files have the important mission to translate the orders from the users to the hardware laboratory.<br>
If you need to use the "modules" folder you'll have to load it into the Raspberry Pi, too. Respect the path of this repository or be careful if you want to use another path.<br>

The "websocket-client" folder, style/css and html files<br>
This directory and files must be loaded in the Apache server.<br>
1.- The subfolder "css" contains the Bootstrap and slider style libraries. They contain the styles needed by html files. <br>
2.- The html files. These files work with the same interface. You move a slider and when you have decided the position you have to click on the button to send the information to the websocket channel from Raspberry Pi. See the Wiki for more information (https://github.com/go-lab/smart-device/wiki/Robotic-Arm-Laboratory). These files have the functions related on D 4.1 to use the information of streaming JSON data format. A brief description of each service is offered below:<br>
a) base_j.html: let to control the base DC motor of Robotic Arm moving it to left or rigth.<br>
b) clamp_j.html: let to control the clamp of Robotic Arm closing or opening.<br>
c) elbow_j.html: let to control the elbow DC motor of Robotic Arm moving it to forward or backward.<br>
d) led_j.html: let to control the led of Robotic Arm turn on or turn off.<br>
e) shoulder_j.html: let to control the shoulder DC motor of Robotic Arm moving it to forward or backward.<br>
f) wrist_j.html: let to control the wrist DC motor of Robotic Arm moving it to forward or backward.<br>

The "http_server" folder<br>
This folder contents the file "http_server.js". This file has to be into server side in Rapsberry Pi and open the channel with HTTP protocol to launch the content of static JSON file using the port "80".<br>

The "metadata" folder<br>
This folder contents the static JSON file "metadata.json". The others JSON data are embebed into the *.*js files of the server side. They are used as streaming dynamic JSON data. This folder contents, too, a subfolder "position". This subfolder content an static files specific, only, for this laboratory. The files into this folder store the last position of each actuator into a *.*pos files. This content is launched on real time, every second, using the *.*js files from server side using websockets channels.<br>

Websockets Metadata functions
=============================
Metadata functions are defined on extented in D 4.1 deliverable. The files related are examples to use a streaming JSON data format with the specifications defined. All of the functions: "sendActuatorData()", "getClients()", "getSensorMetadata()", "getActuatorMetadata()"; "getSensorData()", have values that are changed all time (for example the date and hour, or the position of the actuator on real time. This information is being updated every second using websockets channel. So clicking on each button you send a JSON request from client side and receive a JSON answer from server side.<br>
To make this posible, every actuator use a single websocket channel, so on this way only one information is processed for each websocket channel.<br>
As example you can even send the new movement of the actuator entering the new value directly using "sendActuatorMetadata()".<br>
As owner of a laboratory you can reply these functions and adapt them to your hardware/sensors/actuators devices.<br>

HTTP Metadata function
======================
As is related in D 4.1 exits a static JSON file ("metadata.json") that works using HTTP protocol. The folder "php" contents the file that manage the call to this file. This call uses an example request but, of course, you can change this example to request other information from "metadata.json" file if needed.<br>

Communication process
=====================
The structure of the communication process is:<br>
  0.- Node.js server is open and USB serial port with Arduino board is open.<br>
  1.- User accesses to the client side loaded into Raspberry Pi (or into another external server as Apache server desktop PC), using a browser<br>
  2.- User selects the service, open the websocket channel clicking on "Open Websockets Channel" button and move the slider of the service to the desired position.<br>
  3.- User clicks on button "Apply Service..." to launch to the server the desired position.<br>
  4.- Server side into Rapsberry Pi received the petition of the client side and open a websocket channel to start the communication.<br>
  5.- Client side receives the opening status (socket.on) from the server side and launchs for the channel the position of the service.<br>
  6.- Server side receives the position of the service and sends the information to USB port towards Arduino board.<br>
  7.- Arduino board receives the postiion of the service and translates this data to chnage to HIGH/LOW level to Arduino pin connected to the Robotic Arm service.<br>
  8.- Robotic arm service moves.<br>
  9.- Server side from raspberry Pi sends the new position to client side using the websockets channel opened previously.<br>
  10.- Client side shows by screen the new value of the position launched on intervals of one second (is possibly customize the delay of the lectures if needed).<br>
  11.- The process start again from point 5 because the websocket channel is open until user close the browser (or user stop the communication clicking on button "Close Websockets Channel").<br>

The cycle is:<br>
Browser->Raspberry Pi->Arduino->Robotic Arm<br>
Robotic Arm->Arduino->Raspberry Pi->Browser <br>

Features of this version
========================
-Button to open websockets channel. The button is disabled when the channel is open.<br>
-Button to close websocket channel. Enable again the open websockets button.<br>
-Managing of max users connected. Due the type of laboratory only one client can be connected at same time, so if the laboratory es busy the client received a "Error 402" warning of it and blocking the button to open websocket channel until the laboratory be free.<br>
-Manage of "Errors":<br>
Error 401: "Server is closed." This error is launched when the server side is down and the conection is not possible.<br> 
Error 402: "Too many users. Only one client is allowed. The channel is yet busy." This error is launched when de channel is busy for this actuator.<br>
Error 403: "Method not allowed. The requested method is not allowed with this value." This error is launched when the slots use on "sendActuatorData()" are out of range.<br>
-Option to use the slider (automatic method), or enter the new position using "sendActuatorData()" function (manual method).<br>