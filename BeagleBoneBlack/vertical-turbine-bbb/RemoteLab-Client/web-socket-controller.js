'use strict';

function WebSocketController($scope) {

    //$scope.servoValue = 1500;

    // BBB static IP on the Internet
    // var host = '0.0.0.0';
    
    //localhost
    //var host = '127.0.0.1';

    //BBB static IP on the EPFL network
    //var host = '128.178.5.173';

    //BBB static IP on the local network created with the connected machine
    //var host = '192.168.7.2';
    
    $scope.infoMsg = true;
    $scope.errorMsg = false;
    $scope.labStatus = false;
    $scope.voltageReadingStatus = false;
    $scope.windSourceStatus = false;
    $scope.activateGraph = false;

    // for cycling through the graphs
    var cyclicPlotBuffer = [];
    var elements = 0;
    var currentPointer = -1;

    // Establish WebSocket connection with BBB.
    $scope.connectToLab = function(host) {
        var port = '8081';

        var ws = new WebSocket('ws://' + host + ':' + port);

        ws.onerror = function(event) {
          $scope.labStatus = false;
          $scope.infoMsg = true;
          $scope.errorMsg = false;
        }

        // Receive incoming messages from the WS connection with Lab and display.
        ws.onmessage = function (event) {
            $scope.$apply(function () {
                // convert to object
                var msg = JSON.parse(event.data);

                // voltage payload
                if(msg.messageType == "voltageReading") {

                    // set the numeric values
                    $scope.voltageAmplitudeValue = msg.payload.amplitude;
                    $scope.voltageFrequency = msg.payload.frequency;
                    $scope.numSamples = msg.payload.numOfValues;

                    // render the graph
                    var jqp = $.jqplot('chartdiv', [msg.payload.valuesArray], {});
                    jqp.destroy();  // destroy the previous plot or else, it would keep overwriting
                    $.jqplot('chartdiv', [msg.payload.valuesArray], {
                        redraw: true,
                        title: 'Voltage waveform as at: '+msg.dateValid,
                        axes: { yaxis:{min:0, max:1.8}, 
                                xaxis:{ min: 0, 
                                        max: msg.payload.numOfValues, 
                                        show: false, 
                                        showTicks: false, 
                                        showTickMarks: false}},
                        series:[{color:'#5FAB78', showMarker: false}]
                    });
                    // activate the buttons for cycling
                    $scope.activateGraph = true;

                    // max of 20 graphs in buffer
                    if(elements != 20) {
                        cyclicPlotBuffer.push({
                            payloadData: msg.payload,
                            dataDate: msg.dateValid
                        });
                        elements++;
                        currentPointer = (++currentPointer) % elements;
                    } else {
                        cyclicPlotBuffer.shift();
                        cyclicPlotBuffer.push({
                            payloadData: msg.payload,
                            dataDate: msg.dateValid
                        });
                    }

                }

                else if(msg.messageType == "genericMessage") {
                    if(msg.payload == "Lab connected!")
                        $scope.labStatus = true;
                    $scope.infoMsg = true;
                    $scope.errorMsg = false;
                }

                else if(msg.messageType == "errorMessage") {
                    $scope.errMessage = msg.payload;
                    $scope.infoMsg = false;
                    $scope.errorMsg = true;
                }

                else if(msg.messageType == "commandResponse") {
                    if(msg.payload == "voltageReadingInProgress") {
                        $scope.voltageReadingStatus = true;
                    } else if(msg.payload == "voltageReadingNotInProgress") {
                        $scope.voltageReadingStatus = false;
                    } else if(msg.payload == "windSourceOn") {
                        $scope.windSourceStatus = true;
                    } else if(msg.payload == "windSourceOff") {
                        $scope.windSourceStatus = false;
                    }
                    $scope.infoMsg = true;
                    $scope.errorMsg = false;
                }
                
                // for unknown message types
                else {
                    $scope.errMessage = "Unknown message received: "+event.data;
                    $scope.infoMsg = false;
                    $scope.errorMsg = true;
                }
            })
        };

        // Run button click.
        $scope.runReading = function () {
            ws.send("startReadingVoltage");
        };

        // Stop button click.
        $scope.stopReading = function () {
            ws.send("stopReadingVoltage");

        }

        //Turn On button click for wind source
        $scope.turnOnWind = function () {
            ws.send("turnOnWind");
        }

        //Turn Off button click for wind source
        $scope.turnOffWind = function () {
            ws.send("turnOffWind");
        }
    }

    $scope.graphScrollLeft = function () {
        if(currentPointer == 0) {
            currentPointer = elements-1;
        } else {
            currentPointer--;
        }

        $scope.voltageAmplitudeValue = cyclicPlotBuffer[currentPointer].payloadData.amplitude;
        $scope.voltageFrequency = cyclicPlotBuffer[currentPointer].payloadData.frequency;
        $scope.numSamples = cyclicPlotBuffer[currentPointer].payloadData.numOfValues;
        var jqp = $.jqplot('chartdiv', [cyclicPlotBuffer[currentPointer].payloadData.valuesArray], {});
        jqp.destroy();
        $.jqplot('chartdiv', [cyclicPlotBuffer[currentPointer].payloadData.valuesArray], {
            redraw: true,
            title: 'Voltage waveform as at: '+cyclicPlotBuffer[currentPointer].dataDate,
            axes: { yaxis:{min:0, max:1.8}, 
                    xaxis:{ min: 0, 
                            max: cyclicPlotBuffer[currentPointer].payloadData.numOfValues, 
                            show: false, 
                            showTicks: false, 
                            showTickMarks: false}},
            series:[{color:'#5FAB78', showMarker: false}]
        });
    }

    $scope.graphScrollRight = function () {
        currentPointer = (++currentPointer) % elements;

        $scope.voltageAmplitudeValue = cyclicPlotBuffer[currentPointer].payloadData.amplitude;
        $scope.voltageFrequency = cyclicPlotBuffer[currentPointer].payloadData.frequency;
        $scope.numSamples = cyclicPlotBuffer[currentPointer].payloadData.numOfValues;
        var jqp = $.jqplot('chartdiv', [cyclicPlotBuffer[currentPointer].payloadData.valuesArray], {});
        jqp.destroy();
        $.jqplot('chartdiv', [cyclicPlotBuffer[currentPointer].payloadData.valuesArray], {
            redraw: true,
            title: 'Voltage waveform as at: '+cyclicPlotBuffer[currentPointer].dataDate,
            axes: { yaxis:{min:0, max:1.8}, 
                    xaxis:{ min: 0, 
                            max: cyclicPlotBuffer[currentPointer].payloadData.numOfValues, 
                            show: false, 
                            showTicks: false, 
                            showTickMarks: false}},
            series:[{color:'#5FAB78', showMarker: false}]
        });
    }
}