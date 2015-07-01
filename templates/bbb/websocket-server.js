//modules
var WebSocketServer = require('ws').Server;
var jf = require('jsonfile');
var moment = require('moment');
var util = require('util');


//javascript files
var bbbProcess = require("./bbb-process");

//metadata files
var json_getClients = "./metadata/getClients.json";
var json_getSensorMetadata = "./metadata/getSensorMetadata.json";
var json_getSensorData = "./metadata/getSensorData.json";
var json_getActuatorMetadata = "./metadata/getActuatorMetadata.json";
var json_sendActuatorData = "./metadata/sendActuatorData.json";

// Instantiate WebSocket server for Lab
var wss = new WebSocketServer({
    port: 8080
});

// Instantiate bbbProcess object to control Process device.  Pass in device path
// and the param (value) to the constructor.
var process = new bbbProcess('/sys/devices/XXXX', paramValue);

// Handle connections
wss.on('connection', function(ws) {

    // Send message to client that connection has been made
    ws.send('Lab Connected!');

    // Handle incoming messages
    ws.on('message', function(message) {

        // set run to 0.
        if (message == 'processOff') {
            process.turnOff();
            ws.send('Process OFF');
        }
        // set run to 1.
        else if (message == 'processOn') {
            process.turnOn();
            ws.send('Process On');
        }
        //send metadata: getClients
        else if (message == 'getClients'){
            ws.send(util.inspect(jf.readFileSync(json_getClients)));
            }
        //send metadata: getSensorMetadata
        else if (message == 'getSensorMetadata'){
            ws.send(util.inspect(jf.readFileSync(json_getSensorMetadata)));
            }
        //send metadata: getSensorData
        else if (message == 'getSensorData'){
            ws.send(util.inspect(jf.readFileSync(json_getSensorData)));
            }
        //send metadata: getActuatorMetadata
        else if (message == 'getActuatorMetadata'){
            ws.send(util.inspect(jf.readFileSync(json_getActuatorMetadata)));
            }
        //send metadata: getActuatorData
        else if (message == 'sendActuatorData'){
            ws.send(util.inspect(jf.readFileSync(json_sendActuatorData)));
            }
        //send metadata: getMetadata
        else if (message == 'sendActuatorData'){
            ws.send(util.inspect(jf.readFileSync(json_sendActuatorData)));
            }
        // set the param.
        else {
            process.setProcess(message);
            var data = bbbProcess.PARAM;
            console.log("Saving new value to getSensorData and sendActuatorMetadata");
            var date = moment();
            var new_getSensorData = {
                "method": "getSensorData",
                "sensorId": "sensor",
                "accessRole": "controller",
                "responseData": {
                    "valueNames": ["paramValue"],
                    "data": [data],
                    "lastMeasured": [date]
                    }
                };
            var new_sendActuatorData = {
                "method": "sendActuatorData",
                "lastMeasured": date,
                "accessRole": "controller",
                "payload": {
                    "actuatorId": "actuatorId",
                    "valueNames": ["paramValue"],
                    "data": [data]
                    }
                };
            
            jf.writeFile(json_getSensorData, new_getSensorData);
            jf.writeFile(json_sendActuatorData, new_sendActuatorData);            
        }
    });

     // When connection closes.
    ws.on('close', function() {
        console.log('Stopping client interval');
    });

});