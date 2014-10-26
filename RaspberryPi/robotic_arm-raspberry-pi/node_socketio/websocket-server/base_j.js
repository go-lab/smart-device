/**
* Author: German Carro Fernandez
* DIEEC, UNED
*/

//Inicialization of variables
var fs = require('fs');
var file_pos_1=__dirname + '/../metadata/position/actuator_base.pos';
var valor_test;
var result;
var data1;
var valuefin=0;
var date = "Service waiting...";
var test_getClients="";
var test_getSensorMetadata="";
var test_sendActuatorData="";
var test_getSensorData="";
var test_getActuatorMetadata="";
var value="";
var act_pos1="";
var status ="";
var ini_value="";
var from_value="";
var new_value="";
var data_pos_1="";
var mov1="";
var i_mov1="";
var j_mov1="";
var number="";
var users=0;
var user=0;
var message="";
var client="";
var tokenauto="";
var value_mov1="0007";
var value_mov2="0008";
var value_get="";
var init="Waiting JSON function request";
var test_getClients="";
var date = new Date();
var current_hour = date.getHours();
var current_min = date.getMinutes();
var current_second = date.getSeconds();
var current_year = date.getFullYear();
var current_month = date.getMonth();
var current_day = date.getDate();
var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
    fs = require('fs'),
  sys = require('util');
//Configuring USB Raspberry Pi port
var serialPort = require("serialport").SerialPort
var serialPort = new serialPort('/dev/ttyACM0',
	{ baudrate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
});

//Launching server port
app.listen(8015);

//Launching position file content (hardware security)
function handler(req, res) {
fs.readFile(__dirname+'/../metadata/position/actuator_base.pos', function(err, data) {
       if (err) {
	    console.log(err);
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
};
var getClients_json="";
var sendActuatorData_json="";
var getActuatorMetadata_json="";
var getSensorData_json="";
var getSensorMetadata_json="";

//Reading position file content (hardware security)
fs.readFile(file_pos_1, 'utf8', function (err, data_pos_1) {
	if (err){
	console.log('Error: '+err);
	return;
	}
	ini_value=data_pos_1;
	from_value=ini_value;
	new_value=from_value;
	});

//Open websockets via Socket.io library
tokenaout='first';
io.sockets.on('connection', function(socket) {
	//Managing dinamic JSON format streaming data not changed by client (only read)
	
	socket.emit('message', user);
	console.log (user);
	socket.on('lock_channel', function(status, users){
	user=users;
	if (status=="lock"){
	console.log ("Channel locked: One user active");
	}
	else
	{
	console.log ("Channel free: None user active");
	}
	});

	setInterval(function(){
	socket.setMaxListeners(0);
	//socket.broadcast.emit('message', 'Another client has just connected');
	
	socket.on('get_request', function (value_get){
	if (act_pos1=='null' || from_value==""){act_pos1='0'} else {act_pos1=from_value};
	date = "Service position";
	});
	//Managing dinamic JSON format streaming data changed by client (read and write)
	//Automatic movement using the slider
	socket.on('get_request_auto', function (act_pos){
	act_pos1=act_pos; 
	if (act_pos1=='null'){act_pos1=from_value};
	new_value=act_pos1;
	if (act_pos1>-101 && act_pos1!=from_value){
	mov1=((new_value-from_value)/20);
	//Launching movement to Arduino using USB port
	if (mov1>0 && act_pos1!=from_value){
	for (i_mov1=0; i_mov1<mov1; i_mov1++){
	serialPort.write("^"+value_mov1+"$")
	console.log(value_mov1);
		}
		}
	else if (mov1<=0 && act_pos1!=from_value){
	for (j_mov1=0; j_mov1>mov1; j_mov1--){
	serialPort.write("^"+value_mov2+"$")
	console.log(value_mov2);
		}
		}
	}
	//Updating the position value content dinamically	
	from_value=new_value; 
	});
	
	//Manually movement entering the new position directly
	socket.on('get_request_manual', function (value_man, act_pos_man){
	act_pos1=act_pos_man; 
	if (act_pos1=='null'){act_pos1=from_value};
	new_value=act_pos1;
	if (act_pos1>-101 && act_pos1!=from_value){
	mov1=((new_value-from_value)/20);
	if (mov1>0 && act_pos1!=from_value){
	for (i_mov1=0; i_mov1<mov1; i_mov1++){
	serialPort.write("^"+value_mov1+"$")
	console.log(value_mov1);
		}
		}
	else if (mov1<=0 && act_pos1!=from_value){
	for (j_mov1=0; j_mov1>mov1; j_mov1--){
	serialPort.write("^"+value_mov2+"$")
	console.log(value_mov2);
		}
		}
	}
	//Updating the position value content dinamically
	from_value=new_value;
	});

//Updating date values
date = new Date();
current_hour = date.getHours();
current_min = date.getMinutes();
current_second = date.getSeconds();
current_year = date.getFullYear();
current_month = date.getMonth()+1;
current_day = date.getDate();

getClients_json='{"method": "getClients","clients": [{'+
'                    "type": "OpenSocial gadget",'+
'                    "url": "http://62.204.201.213/German/Raspbery_Pi/node_socketio/robotic_arm/production/xml/camera.xml"'+
'                },'+
'                {'+
'                    "type": "OpenSocial gadget",'+
'                    "url": "http://62.204.201.213/German/Raspbery_Pi/node_socketio/robotic_arm/production/xml/base_j.xml"'+
'                },'+ 
' 		{'+
'		"type": "Web Space into Graasp Portal",'+
'                    "url": "http://graasp.epfl.ch/#item=space_19178"'+
'                }'+
'               ]'+
'    }';

getActuatorMetadata_json='{"method": "getActuatorMetadata",'+
'        "actuators": ['+
'            {'+
'                "actuatorId": "base",'+
'                "fullName": "base_position",'+
'                "description": "Sets the base position",'+
'                "webSocketType": "text",'+
'                "produces": "application/json",'+
'                "consumes": "application/json",'+
'                "values": ['+
'                    {'+
'                        "name": "realRef",'+
'                        "unit": "slot",'+
'                        "rangeMinimum": -100,'+
'                        "rangeMaximum": 100'+
'                    }'+
'                ],'+
'                "accessMode": {'+
'                    "type": "push",'+
'                    "nominalSlotInterval": 20,'+
'                    "userModifiableFrequency": false'+
'                }'+
'            }'+
'        ]'+
'}'

getSensorData_json='{ "method": "getSensorData",'+
'    "sensorId": "position",'+
'    "accessRole": "controller",'+
'    "responseData": {'+
'        "valueNames": ["realPosition"],'+
'        "data": ['+act_pos1+'],'+
'        "lastMeasured": ["'+current_hour+":"+current_min+":"+current_second+", "+current_day+"-"+current_month+"-"+current_year+'"]'+
'    }'+
'}'
getSensorMetadata_json= '{"method": "getSensorMetadata",'+
'        "sensors": ['+
'           {'+
'                "sensorId": "DC motor",'+
'                "fullName": "DC motor base",'+
'                "description": "the real position of the actuator",'+
'                "webSocketType": "text",'+
'                "singleWebSocketRecommended": true,'+
'                "produces": "application/json",'+
'                "values": ['+
'                    {'+
'                        "name": "realPosition",'+
'                        "unit": "slot",'+
'                        "lastMeasured": "'+current_hour+":"+current_min+":"+current_second+", "+current_day+"-"+current_month+"-"+current_year+'",'+
'                        "rangeMinimum": -100,'+
'                        "rangeMaximum": 100,'+
'                        "slot": 20'+
'                    }'+
'                ],'+
'                "accessMode": {'+
'                    "type": "push",'+
'                    "nominalUpdateInterval": 100,'+
'                    "userModificableSlot": false'+
'                }'+
'            },'+
'            {'+
'                "sensorId": "camera",'+
'                "fullName": "video feed",'+
'                "description": "front camera video stream",'+
'                "webSocketType": "binary",'+
'                "singleWebSocketRecommended": true,'+
'                "produces": "image/jpeg",'+
'                "values": ['+
'                    {'+
'                        "name": "video",'+
'                        "lastMeasured": "'+current_hour+":"+current_min+":"+current_second+", "+current_day+"-"+current_month+"-"+current_year+'",'+
'                        "updateFrequency": 10'+
'                    }'+
'                ],'+
'                "accessMode": {'+
'                    "type": "push",'+
'                    "nominalUpdateInterval": 100,'+
'                    "userModifiableFrequency": false'+
'                }'+
'            }'+
'        ]'+
'    }'

sendActuatorData_json= '{ '+
'    "method": "sendActuatorData",'+
'        "lastMeasured": "'+current_hour+":"+current_min+":"+current_second+", "+current_day+"-"+current_month+"-"+current_year+'",'+
'    "accessRole": "controller",'+
'    "payload": {'+
'        "actuatorId": "base",'+
'        "valueNames": ["basePosition"],'+
'        "data": ['+act_pos1+']'+
'	}'+
'}';
data1 = JSON.parse(getClients_json);
data2 = JSON.parse(getSensorMetadata_json);
data3 = JSON.parse(sendActuatorData_json);
data4 = JSON.parse(getSensorData_json);
data5 = JSON.parse(getActuatorMetadata_json);
test_getClients= (data1);
test_getSensorMetadata= (data2);
test_sendActuatorData= (data3);
test_getSensorData= (data4);
test_getActuatorMetadata= (data5);
socket.emit('func_json', test_getClients);
socket.emit('func_json2', test_getSensorMetadata);
socket.emit('func_json3', test_sendActuatorData);
socket.emit('func_json4', test_getSensorData);
socket.emit('func_json5', test_getActuatorMetadata);

fs.writeFile(file_pos_1, new_value, 'utf8'); //Update the position file
  }, 1000); //Read the status and update the information every second.
console.log('Status: ', init);
socket.on('disconnect', function (){
if (user>0) {
user-=1;}else {user=0;}
console.log("Client disconnected");
console.log(user);
});

});	 