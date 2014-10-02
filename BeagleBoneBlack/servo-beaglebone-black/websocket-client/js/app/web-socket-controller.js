'use strict';

function WebSocketController($scope) {

    $scope.servoValue = 1500;

    // BBB IP on the network
    var host = '192.168.7.2';
    var port = '8080';

    // Establish WebSocket connection with BBB.
    var ws= new WebSocket('ws://' + host + ':' + port);


    // Receive incoming messages from the WS connection with Lab and display.
    ws.onmessage = function (event) {
        $scope.$apply(function () {
            $scope.message = event.data;
        })
    };

    // Setup listener for slider events.
    $('.slider').slider().on('slide', function (event) {

        // Update the UI for current slider value.
        $scope.$apply($scope.servoValue = event.value);

        // Send the value over the WS connection.
        if (ws.readyState === 1)
            ws.send(event.value);
    });

    // Servo On button click.
    $scope.servoOn = function () {
        ws.send('servoOn');
    };

    // Servo Off button click.
    $scope.servoOff = function () {
        ws.send('servoOff');
    };

    // getClients on button click.
    $scope.getClients = function () {
        ws.send('getClients');
    };

    // Get Position button click.
    $scope.getSensorData = function () {
        ws.send('getSensorData');
    };

    //getSensorMetadata
    $scope.getSensorMetadata = function () {
        ws.send('getSensorMetadata');
    };

    //getActuatorMetadata
    $scope.getActuatorMetadata = function () {
        ws.send('getActuatorMetadata');
    };

    //sendActuatorData
    $scope.sendActuatorData = function () {
        ws.send('sendActuatorData');
    };
}