/**
* Author: German Carro Fernandez
* DIEEC, UNED
*/

var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
    fs = require('fs'),
  sys = require('util');

var serialPort = require("serialport").SerialPort
var serialPort = new serialPort('/dev/ttyACM0',
	{ baudrate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
});
 

app.listen(8020);

function handler(req, res) {
    fs.readFile(__dirname+'/../index.html', function(err, data) {
        if (err) {

            console.log(err);
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

serialPort.on("open", function () {
console.log('port open');
});

var date = "Led RGB waiting...";
var value = "0";

io.sockets.on('connection', function(socket) {
	
 	setInterval(function(){
	socket.setMaxListeners(0);
	socket.on('clickon', function (value){
	setTimeout(led ,100);
	function led() {serialPort.write("^"+value+"$")};
	date = "Servo angle";
	console.log('Status color: ', value);
	});


socket.emit('dataled', date);
console.log('Status: ', date);
  }, 10000);	 
});
