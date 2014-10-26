/**
* Author: German Carro Fernandez
* DIEEC, UNED
*/
	var headerItem;
	var socket = io.connect();
	var movpas_w="0";
	var movact_w="0";
	var right = "0009"; 
	var left = "0010";
	var mov=" ";
	var funct;
	var status;
	var value;
	var header = $('#header');
	var cabecera_funct;
	var cierre_funct;
	var call="";
	var type_mov="Sending data with slider";
	var slots= ["-100", "-80", "-60", "-40", "-20", "0", "20", "40", "60", "80", "100"];
	
	function close_channel(){
	$(document).ready(function(){
	var button = $('#onoff_close');
	socket.emit('lock_channel', 'unlock');
	document.getElementById('onoff_open').disabled = false;
	socket = io.connect(); 
	});
	}
		
	function open_channel(){
	$(document).ready(function(){
	var button = $('#onoff_open');
	status="true";
	socket = io.connect('http://62.204.201.171:8019'); 
	socket.on('message', function(user){
	if (user!=0) {
	document.getElementById('warning').innerHTML = '<div>'+'Error 402: Too many users. Only one client is allowed. The channel is yet busy.'+ '<br></div>';
	socket.emit('lock_channel', 'lock', -1);
	document.getElementById("onoff_open").disabled = status; 
	socketi.io=connect();
	} else{
	socket.emit('lock_channel', 'lock', -1);
	document.getElementById("onoff_open").disabled = status;};
	});
	});
	}
	
	function send_move(){
	$(document).ready(function(){
	display('webs_sAD');
	movact_w=parseInt($("#ex1").val());
	
	if(movact_w>movpas_w) 
	{
	veces=(movact_w-movpas_w)/20;
	mov=right; 

	}else{
	veces=-(movact_w-movpas_w)/20;
	mov=left;
	}
	movpas_w=parseInt($("#ex1").val());
	
	if (socket==null) {document.getElementById('warning').innerHTML = '<div>'+'Error 401 Server is closed'+ '<br></div>';}
	
	socket.on('func_json3', function (answer_json) {
			socket.emit('get_request_auto', movact_w);
			jsonObj = answer_json;
			headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
			header.append(headerItem);
			document.getElementById('header').innerHTML = '<div>'+JSON.stringify(jsonObj)+ '<br></div>';
	});
	});
	};
	
	function getClients(){
	$(document).ready(function(){
    display('webs_gC');		
  	var header0 = $('#header0');
	var Test_header = $('#Test_header0');
	var button = $('#onoff0');
	var button = $('#off');
	var container = $('#container');
	cabecera_funct0='{"method": "getClients"';
	cierre_funct0='}';
	socket.on('func_json', function (answer_json) {
			socket.emit('get_request', cabecera_funct0 + cierre_funct0);
			var newItem = $('<div>Answer: ' + answer_json+ '.'+'<br></div>');
			container.append(newItem); 
			jsonObj = answer_json;
			headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
			header0.append(headerItem);
			document.getElementById('header0').innerHTML = '<div>'+JSON.stringify(jsonObj)+ '<br></div>';
			document.getElementById('Test_header0').innerHTML = '<div>'+cabecera_funct0 + cierre_funct0+ '<br></div>';
	});
	});
	}	

	function getSensorMetadata(){
	$(document).ready(function(){
    display('webs_gSM');		
  	var header00 = $('#header00');
	var Test_header = $('#Test_header00');
	var button = $('#onoff');
	var button = $('#off');
	var container = $('#container');
	cabecera_funct00='{"method": "getSensorMetadata"';
	cierre_funct00='}';
	socket.on('func_json2', function (answer_json) {
			socket.emit('get_request', cabecera_funct00 + cierre_funct00);
			var newItem = $('<div>Answer: ' + answer_json+ '.'+'<br></div>');
			container.append(newItem); 
			jsonObj = answer_json;
			headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
			header00.append(headerItem);
			document.getElementById('header00').innerHTML = '<div>'+JSON.stringify(jsonObj)+ '<br></div>';
			document.getElementById('Test_header00').innerHTML = '<div>'+cabecera_funct00 + cierre_funct00+ '<br></div>';
	});
	});
	}
	
	function sendActuatorData(){
	$(document).ready(function(){
	display('webs_sAD');	
    var date = new Date();
	var current_hour = date.getHours();
	var current_min = date.getMinutes();
	var current_second = date.getSeconds();
	var current_year = date.getFullYear();
	var current_month = date.getMonth();
	var current_day = date.getDate();	
  	var header = $('#header');
	var Test_header = $('#Test_header');
	var button = $('#onoff');
	var button = $('#off');
	var container = $('#container');
	usertoken = document.getElementById('new_token').value;
	if (slots.indexOf(usertoken) <0){
	document.getElementById('warning').innerHTML = '<div>'+'Error 403: Method not allowed. The requested method is not allowed whit this value.'+ '<br></div>'; return;
	}
	token=usertoken;
	if (token=="") {token='0';} else {token=usertoken;}
	cabecera_funct=' { '+
'    "method": "sendActuatorData",'+
'   "accessRole": "controller",'+
'        "actuatorId": "ref",'+
'        "valueNames": ["angularRef"],'+
'        "data": ['+token+']'+
'}';
	cierre_funct='}';
	
	if (socket==null) {document.getElementById('warning').innerHTML = '<div>'+'Error 401: Server is closed.'+ '<br></div>';}
	
	socket.on('func_json3', function (answer_json) {
			socket.emit('get_request_manual', cabecera_funct + cierre_funct, token);
			var newItem = $('<div>Answer: ' + answer_json+ '.'+'<br></div>');
			container.append(newItem); 
			jsonObj = answer_json;
			headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
			header.append(headerItem);
			document.getElementById('header').innerHTML = '<div>'+JSON.stringify(jsonObj)+ '<br></div>';
			document.getElementById('Test_header').innerHTML = '<div>'+cabecera_funct + cierre_funct+ '<br></div>';
	});
	});
	}
	
	function getActuatorMetadata(){
	$(document).ready(function(){
    display('webs_gAM');		
  	var header_met = $('#header_met');
	var Test_header = $('#Test_header_met');
	var button = $('#onoff');
	var button = $('#off');
	var container = $('#container');
	cabecera_funct00='{"method": "getActuatorMetadata"';
	cierre_funct00='}';
	socket.on('func_json5', function (answer_json) {
			socket.emit('get_request', cabecera_funct00 + cierre_funct00);
			var newItem = $('<div>Answer: ' + answer_json+ '.'+'<br></div>');
			container.append(newItem); 
			jsonObj = answer_json;
			headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
			header_met.append(headerItem);
			document.getElementById('header_met').innerHTML = '<div>'+JSON.stringify(jsonObj)+ '<br></div>';
			document.getElementById('Test_header_met').innerHTML = '<div>'+cabecera_funct00 + cierre_funct00+ '<br></div>';
	});
	});
	}
	
	function getSensorData(){
	$(document).ready(function(){
    display('webs_gSD');	
  	var header_dat = $('#header_dat');
	var Test_header = $('#Test_header_dat');
	var button = $('#onoff');
	var button = $('#off');
	var container = $('#container');
	cabecera_funct00='{"method": "getSensorData", "sensorId": "position", "accessRole": "controller"},';
	cierre_funct00='}';
	socket.on('func_json4', function (answer_json) {
			socket.emit('get_request', cabecera_funct00 + cierre_funct00);
			var newItem = $('<div>Answer: ' + answer_json+ '.'+'<br></div>');
			container.append(newItem); 
			jsonObj = answer_json;
			headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
			header_dat.append(headerItem);
			document.getElementById('header_dat').innerHTML = '<div>'+JSON.stringify(jsonObj)+ '<br></div>';
			document.getElementById('Test_header_dat').innerHTML = '<div>'+cabecera_funct00 + cierre_funct00+ '<br></div>';
	});
	});
	}
	
	function display(select){
	$(document).ready(function(){
	document.getElementById(select).style.display="block"; 
	});
	}