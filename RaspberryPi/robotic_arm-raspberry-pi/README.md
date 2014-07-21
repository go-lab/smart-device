Folder structure
================
Into this folder you can find different files and subfolders. 
Read the README file content into each one.
Here you can read a brief description of each one.

The "arduino" folder
====================
This folder content a subfolder contents the source code to load into Arduino UNO R3 board.
Following the requirements of Arduino board you have to copy the sobfolder included into it to let the Arduino IDE can manage the source code (robotic_arm.ino file) correctly.

The "modules" folder
====================
The modules folder is a clone of the lybraries folder installed on Raspberry Pi into the original laboratory.
As you can see on the Wiki link (https://github.com/go-lab/smart-device/wiki/How-to-use-Node.js-and-Socket.io-labratories-with-Raspberry-Pi-and-Arduino) it is needed that you install NOde.js with other libraries (as Socket.io and serialport library) to manage the hardware and software of the laboraotry.
This folder hacve these libraries displayed. So, if you have any problems to download or intall these libraries you can use them form this folder to compile using the Raspbian kernel if needed.

The "node_socketio" folder
==========================
This folder content the source code of the server side and the client side (including the librearies needed to use bootstrap and slider theme of it) needed to use this laboratory.

