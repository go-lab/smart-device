var WebSocketServer = require('ws').Server;
var bbbPWM = require("./bbb-pwm");
var json_getClients = require("../metadata/getClients.json");
var json_getSensorMetadata = require("../metadata/getSensorMetadata.json");
var json_getSensorData = require("../metadata/getSensorData.json");
var json_getActuatorMetadata = require("../metadata/getActuatorMetadata.json");
var json_sendActuatorData = require("../metadata/sendActuatorData.json");


//DRAFT ((18/480000)*(bbbPWM.POSITION))

// Instantiate WebSocket server for Lab
var wss = new WebSocketServer({
    port: 8080
});

// Instantiate bbbPWM object to control PWM device.  Pass in device path
// and the period to the constructor.
var pwm = new bbbPWM('/sys/devices/ocp.2/pwm_test_P8_13.10/', 5000000);

// Handle connections
wss.on('connection', function(ws) {

    // Send message to client that connection has been made.
    ws.send('BBB WebSocket Server for Lab Connected!!!');

    // Handle incoming messages.
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
            ws.send(JSON.stringify(json_getClients));
            }
        //send metadata: getSensorMetadata
        else if (message == 'getSensorMetadata'){
                ws.send(JSON.stringify(json_getSensorMetadata));
            }
        //send metadata: position
        else if (message == 'getSensorData'){
            ws.send(JSON.stringify(json_getSensorData));
            }
        //send metadata: getActuatorMetadata
        else if (message == 'getActuatorMetadata'){
            ws.send(JSON.stringify(json_getActuatorMetadata));
            }
        //send metadata: getActuatorData
        else if (message == 'sendActuatorData'){
            ws.send(JSON.stringify(json_sendActuatorData));
            }
        // set the duty cycle.
        else {
            pwm.setDuty(message);
        }
    });

     // When connection closes.
    ws.on('close', function() {
        console.log('stopping client interval');
    });

});