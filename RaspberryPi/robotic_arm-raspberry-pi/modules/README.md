Content
=======
This folder content the compilation used to the Robotic Arm Laboratory for the Raspberry Pi.
This folder is included here because you can find on it the libraries needed to complement the Node.js server functions.
Not all these libraries are needed (only the main libraries are), but the other one could be useful for other functions, interfaces, or communications methods on future developments.
Please, read more information and links about the main libraries on the Wiki: https://github.com/go-lab/smart-device/wiki/How-to-use-Node.js-and-Socket.io-labratories-with-Raspberry-Pi-and-Arduino#install-nodejs-socketsio-and-libraries-in-raspberry-pi

Main libraries
==============
The main libraries needed to use with this laboratory are:
-Socket.io library: Let use Websockets as communication transport protocol between client side and server side. It has the characteristics that let use not only Websockets but
Websocket, Flash Socket, AJAX long-polling, AJAX multipart streaming, IFrame, JSONP polling (http://davidwalsh.name/websocket).
-Serialport library: Let connect Raspberry Pi to Arduino using USB port.
-Xml2json library: It is only needed if you want to use JSON/XML services with the laboratory.

The "node" folder
=================
This folder include the compilation of Node.js to the Raspberry Pi (model, kernel and firmware) used to built this laboratory.

Warning
=======
As I advised you previously you can have advanced knowledges to use linux systems (Raspbian/Debian) to compile into your kernel this files, but they can be useful if you have problems to find, download or install the libraries cited.
