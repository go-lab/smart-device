//NO LONGER IN USE BECAUSE BONESCRIPT IS USED DIRECTLY IN lab-server.js

var fs = require('fs');
var b = require('bonescript');

function bbbADC(pinName) {
	this.pinName = pinName;
}

bbbADC.prototype.readADC = function() {

	var buffer;

	try {
		var val = -1;
		b.analogRead("P9_36", function(data) {
			val = data.value;
			console.log(val);
		});
		return val;
	} catch (dataErr) {
		console.log('readVoltage error: '+ dataErr);
		return dataErr;
	}
	
};

module.exports = bbbADC;
