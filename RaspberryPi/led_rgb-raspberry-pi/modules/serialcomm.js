//Este archivo gestiona la apertura del puerto que necesita ser ejecutada en el servidor. Es necesario meterlo en esta carpeta o bien escribir un archivo JSON que lo redireccione porque sino no funcionará la apertura del puerto

var serialPort0 = require("serialport").SerialPort;
//He usado una variable diferente aunque se podría usar la misma variable. De esta manera al ser independiente funciona como servicio independiente

var serialPort0 = new serialPort0('/dev/ttyACM0',
	{ baudrate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
});
serialPort0.on("open", function () {
console.log('port open');
//serialPort.on('data', function(data) {
});
