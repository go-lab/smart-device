/**
* Author: German Carro Fernandez
* DIEEC, UNED
*/
var http = require('http');
var fs = require('fs');
var file =__dirname + '/metadata/metadata.json';
http.createServer(function (req,res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	fs.readFile(__dirname+'/metadata.json', function(err, data) {
       if (err) {

            console.log(err);
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(80, '62.204.201.171');
console.log('Server running'+JSON.stringify(file));