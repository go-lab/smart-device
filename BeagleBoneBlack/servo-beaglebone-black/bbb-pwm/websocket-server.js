//modules
var WebSocketServer = require('ws').Server;
var jf = require('jsonfile');
var moment = require('moment');
var util = require('util');


//javascript files
var bbbPWM = require("./bbb-pwm");

//metadata files
var json_getClients = "../metadata/getClients.json";
var json_getSensorMetadata = "../metadata/getSensorMetadata.json";
var json_getSensorData = "../metadata/getSensorData.json";
var json_getActuatorMetadata = "../metadata/getActuatorMetadata.json";
var json_sendActuatorData = "../metadata/sendActuatorData.json";

// Instantiate WebSocket server for Lab
var wss = new WebSocketServer({
    port: 8080
});

// Instantiate bbbPWM object to control PWM device.  Pass in device path
// and the period to the constructor.
var pwm = new bbbPWM('/sys/devices/ocp.2/pwm_test_P8_13.10/', 5000000);

// Handle connections
wss.on('connection', function(ws) {

    // Send message to client that connection has been made
    ws.send('Lab Connected!!!');

    // Handle incoming messages
    ws.on('message', function(message) {

        // set run to 0.
        if (message == 'servoOff') {
            pwm.turnOff();
            ws.send('PWM OFF');
        }
        // set run to 1.
        else if (message == 'servoOn') {
            pwm.turnOn();
            ws.send('PWM On');
        }
        //send metadata: getClients
        else if (message == 'getClients'){
            ws.send(util.inspect(jf.readFileSync(json_getClients)));
            }
        //send metadata: getSensorMetadata
        else if (message == 'getSensorMetadata'){
            ws.send(util.inspect(jf.readFileSync(json_getSensorMetadata)));
            }
        //send metadata: position
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
        // set the duty cycle.
        else {
            pwm.setDuty(message);
            var data = ((3/80000)*(bbbPWM.POSITION));
            console.log("Saving new value to getSensorData and sendActuatorMetadata");
            var date = moment();
            var new_getSensorData = {
                "method": "getSensorData",
                "sensorId": "position",
                "accessRole": "controller",
                "responseData": {
                    "valueNames": ["angularPosition"],
                    "data": [data],
                    "lastMeasured": [date]
                    }
                };
            var new_sendActuatorData = {
                "method": "sendActuatorData",
                "lastMeasured": date,
                "accessRole": "controller",
                "payload": {
                    "actuatorId": "ref",
                    "valueNames": ["angularRef"],
                    "data": [data]
                    }
                };
            
            jf.writeFile(json_getSensorData, new_getSensorData);
            jf.writeFile(json_sendActuatorData, new_sendActuatorData);            
        }
    });

     // When connection closes.
    ws.on('close', function() {
        console.log('stopping client interval');
    });

});