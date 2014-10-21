Content
=======
This folder contains the compilation used to the Robotic Arm Laboratory for the Raspberry Pi.<br>
If you do not have any problem during the installation of node.js, socket.io and serialport packages. You do not need to download this folder to your raspberry pi. Wiki: https://github.com/go-lab/smart-device/wiki/How-to-use-Node.js-and-Socket.io-labratories-with-Raspberry-Pi-and-Arduino#install-nodejs-socketsio-and-libraries-in-raspberry-pi<br>

This folder contains the libraries needed to complement the Node.js server functions.

The main libraries needed to use with this laboratory are:

-Socket.io library: Let use Websockets as communication transport protocol between client side and server side.

-Serialport library provides the communication between Raspberry Pi and Arduino by USB port.

-Xml2json library is only needed if you want to use JSON/XML services with the laboratory.

The "node" folder
=================
This folder includes the compilation of Node.js to the Raspberry Pi (model, kernel and firmware) used to built this laboratory.

Warning
=======
You should have advanced knowledges the linux systems (Raspbian/Debian) to compile kernel files. These libraries will only be useful if you have problems to find, download or install these libraries.
