<!--/**
* Author: German Carro Fernandez
* DIEEC, UNED
*/-->
<?php
error_reporting(0); 
$url= "http://62.204.201.171:80";
$contents = file_get_contents($url); 
$contents = utf8_encode($contents); 
$results = json_decode($contents, true); 
$contents = file_get_contents($url); 
$otro_json = $results["info"];
?>
<script>
	var headerItem;
	var funct;
	var header = $('#header');
	
	function send_fun_json_HTTP(){
	$(document).ready(function(){
    display('http_div');
	var header_HTTP = $('#header_HTTP');
	var Test_header = $('#Test_header_HTTP');
	var button = $('#onoff_HTTP');
	PHP_funct_HTTP='$contents = file_get_contents($url); $otro_json = $results["info"];';
	funct='<?php echo json_encode($otro_json);?>';
	jsonObj = funct;
			headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
			header_HTTP.append(headerItem);
			document.getElementById('header_HTTP').innerHTML = '<div>'+ funct+ '<br></div>';
			document.getElementById('Test_header_HTTP').innerHTML = '<div>'+PHP_funct_HTTP+ '<br></div>';
	});
	}
	
	function display(select){
	$(document).ready(function(){
	document.getElementById(select).style.display="block"; 
	});
	}
</script>