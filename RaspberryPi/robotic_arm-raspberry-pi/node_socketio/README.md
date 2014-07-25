Content and services description
================================
This is the main folder of the system. The "robotic_arm" folder contents the files for server and the files for the client side.<br>

Note: you should change the IP and PORT from websocket of the files server.js and xxx.html. <br>

this folder contains:

- JS diretory:<br> 
  This directory must be loaded into the Raspberry Pi Operative System (Raspbian). Recommendable use the path folder "/var/www/".<br>
  In the "js" folder, you can find the server.js. This file contents the source code to:<br>
  1.- Open and manage the websocket channels to let the communication between client side and server side.<br>
  2.- Open the USB serial port to send the data received by websockets channels to Arduino UNO R3 board.<br>
  So, this file has the important mission fo translate the oreders of the users to the hardware laboratory.<br>
  
If you need to use the "modules" folder you'll have to load it into the Raspberry Pi, too. Respect the path of this repository or be careful if you want to use another path.<br>

- Style folder and html files<br>
  This directory and files must be loaded in the Apache server.<br>
   1.- The folder style contains the Bootstrap and slider style libraries. They contain the styles needed by html files. <br>
  2.- The html files. These files work with the same interface. You move a slider and when you have decided the position you have to click on the button to send the information to the websocket channel from Raspberry Pi. See the Wiki for more information (https://github.com/go-lab/smart-device/wiki/Robotic-Arm-Laboratory). A brief description of each service is offered below:<br>
      a) base.html: let to control the base DC motor of Robotic Arm moving it to left or rigth.<br>
      b) clamp.html: let to control the clamp of Robotic Arm closing or opening.<br>
      c) elbow.html: let to control the elbow DC motor of Robotic Arm moving it to forward or backward.<br>
      d) led.html: let to control the led of Robotic Arm tirn on or turn off.<br>
      e) shoulder.html: let to control the shoulder DC motor of Robotic Arm moving it to forward or backward.<br>
      f) wrist.html: let to control the wrist DC motor of Robotic Arm moving it to forward or backward.<br>


