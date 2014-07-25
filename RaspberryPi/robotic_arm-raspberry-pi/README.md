Folder structure
================
Into this folder you can find different files and subfolders. <br>
Read the README file content into each one.<br>
Here you can read a brief description of each one.<br>

The "arduino" folder
====================
This folder contents the programm in Arduino which controls the movements of the robotic arm. This file is named robotic_arm.ino and is contained in the subfolder named robotic_arm.
<br>
This file has to be upload to Arduino Board. Following the requirements of Arduino board you have to copy the sobfolder included into it to let the Arduino IDE can manage the source code (robotic_arm.ino file) correctly.<br>

The "modules" folder
====================
The folder named modules is a clone of the lybraries suh as socket.io or serialport.<br>

As you read on the Wiki link (https://github.com/go-lab/smart-device/wiki/How-to-use-Node.js-and-Socket.io-labratories-with-Raspberry-Pi-and-Arduino) these libraries are needed to manage the hardware and software of the laboratory.<br>

This folder provides the libraries that we have used in our development. So, if you have any problems to download or intall these libraries you can use them form this folder and compile them, using the Raspbian kernel.<br>

The "node_socketio" folder
==========================
This folder content the source code of the server side and the client side (including the libraries needed to use bootstrap and slider theme of it) needed to use this laboratory.


