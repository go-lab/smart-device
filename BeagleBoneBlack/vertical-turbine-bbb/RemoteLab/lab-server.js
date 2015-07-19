//required ext libraries
var b = require('bonescript');
var fs = require('fs');

// class for create messages to transmit
var TxMsg = require("./TxMessage.js");
// class for voltage values processing functions
var VP = require('./ValueProcessor.js');

// instantiating websocket server at specific port
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer(
	{
		port: 8081
	}
);
var global_counter = 0;
all_active_conns = {};

//Pin info for reading voltage from turbine/source
voltageInputPin = "P9_36"	//ADC_IN 5
//Pin info for swtiching on/off wind source
windCtrlOutputPin = "P9_41"	//GPIO_20
b.pinMode(windCtrlOutputPin, b.OUTPUT);

// connection process for every connecting client
wss.on('connection', function(ws) {
	var voltageReadTask, voltageReadInt;

	// acknowledging a conn to client
	console.log('connected to a client');
	var txmsg0 = new TxMsg("genericMessage", "Lab connected!");
	ws.send(txmsg0.transmitString());

	// keeping track of connections
	// - in case needed for advanced client management in the future
	var id = global_counter++;
	all_active_conns[id] = wss;
	wss.id = id;

	// start listening for messages
	ws.on('message', function(message) {

		//start voltage readings
		if (message == 'startReadingVoltage') {
			voltageReadTask = setInterval(function() {
				//this function reads the voltage on the ADC pin every 3 ms
				//and stores the info in an array. This lasts for 2secs.

				// resetting the array to hold the values and the amplitude tracking
				var voltageValues = [];
				var amplitudeV = 0;

				voltageReadInt = setInterval(
					function() {
						try {
							b.analogRead(voltageInputPin, function(data) {
								var num_value = (data.value*1.8).toFixed(4);
								voltageValues.push(num_value);
								if(amplitudeV < num_value) amplitudeV = num_value;
							});
							
						} catch(Error) {
							// in case of errors reading the pin
							var errTxMsg = new TxMsg("errorMessage", "Error while reading voltage thru ADC pin!");
							console.log("Error while reading voltage thru ADC pin!");
							console.log(Error.stack);
							ws.send(errTxMsg.transmitString());
						}
					},
					3 	//	<- change the voltage reading interval here
				);

				setTimeout(
					function() { 

						// 	stopping the reading of pin
						clearInterval(voltageReadInt);

						//	processing of values to get relevant info
						var procValues = new VP(voltageValues);
						var noofvalues = procValues.getNumValues();
						var freqVoltage = procValues.getFrequency();

						//	create object to store data
						var payloadObj = {
							valuesArray: voltageValues,
							numOfValues: noofvalues,
							frequency: freqVoltage,
							amplitude: amplitudeV
						};

						// DEBUG: store values in BBB filesystem for debug purposes. 
						//        this needs a folder called Values to be present in the filesystem
						var dateDebug = ((new Date()).getTime());
						fs.writeFileSync('Values/voltagereadings'+dateDebug+'.txt', voltageValues.toString());

						// sending a JSON encoded string to client
						var txmsg1 = new TxMsg("voltageReading", payloadObj);
						ws.send(txmsg1.transmitString());
					},
					2000	//	<- change the sampling duration here
				);

			}, 2010); 	// giving 10ms buffer for the above 2 sec process to finish before triggering it again

			// after scheduling the task above, reply to client saying that voltage reading is in progress
			var txmsgrespond = new TxMsg("commandResponse", "voltageReadingInProgress")
			ws.send(txmsgrespond.transmitString());
		}

		//stop voltage readings
		else if(message == 'stopReadingVoltage') {
			// 	clear the interval task that was created above
			clearInterval(voltageReadTask);

			//	reply to client to acknowledge
			var txmsgrespond = new TxMsg("commandResponse", "voltageReadingNotInProgress")
			ws.send(txmsgrespond.transmitString());

			// ** possible error catching here to send a error reply to client incase of any errors **
		}
	
		//turn on wind source
		else if(message == 'turnOnWind') {			
			// 	switch on the relay to wind source
			b.digitalWrite(windCtrlOutputPin, b.HIGH);

			var txmsgrespond = new TxMsg("commandResponse", "windSourceOn")
			// 	send a broadcast of the above msg to all clients connected to this server
			wss.clients.forEach(function each(client) {
		    	client.send(txmsgrespond.transmitString());
		  	});

		  	// ** possible error catching here to send a error reply to client incase of any errors **
		}

		//turn off wind source
		else if(message == 'turnOffWind') {
			// 	switch off the relay to wind source
			b.digitalWrite(windCtrlOutputPin, b.LOW);

			var txmsgrespond = new TxMsg("commandResponse", "windSourceOff")
			// 	send a broadcast of the above msg to all clients connected to this server
			wss.clients.forEach(function each(client) {
		    	client.send(txmsgrespond.transmitString());
		  	});

		  	// ** possible error catching here to send a error reply to client incase of any errors **
		}	

		//some other message from a client
		else {
			var errTxMsg = new TxMsg("errorMessage", "Server received unknown request from client!");
			ws.send(errTxMsg.transmitString());
		}	
	});
	
	ws.on('close', function() {
		console.log('disconnected from client');
	});

});
