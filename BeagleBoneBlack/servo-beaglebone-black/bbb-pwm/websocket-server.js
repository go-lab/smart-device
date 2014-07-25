var WebSocketServer = require('ws').Server;
var bbbPWM = require("./bbb-pwm");

// Instantiate WebSocket server.
var wss = new WebSocketServer({
    port: 8080
});

// Instantiate bbbPWM object to control PWM device.  Pass in device path
// and the period to the constructor.
var pwm = new bbbPWM('/sys/devices/ocp.2/pwm_test_P8_13.10/', 5000000);

// Handle connections
wss.on('connection', function(ws) {

    // Send message to client that connection has been made.
    ws.send('BBB WebSocket Server Connected!!!');

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