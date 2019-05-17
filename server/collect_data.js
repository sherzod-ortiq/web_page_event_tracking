var http = require('http');
var fileSystem = require('fs');
var querystring = require('querystring');

http.createServer(function (request, response) {

	if(request.method == 'POST') {
	  var body = '';

 		console.log("Request method is: " + request.method)
 
    request.on('error', function(error){
      if(error) {
        response.writeHead(500, {'Content-Type': 'text/html','Access-Control-Allow-Origin':'*'});
        response.write('An error occurred');
        response.end();
      }
    });

	  request.on('data', function(chunk){
	    body += chunk.toString();
	  });

	  request.on('end', function() {
			var json_object = JSON.parse(body);
	    console.log(json_object);	    
	    appendJson(findFileName(json_object.type), body)
	    response.writeHead(200, {'Content-Type': 'text/html','Access-Control-Allow-Origin':'*'});
	    response.end('Server response: ok');
	  });
	}else{
	  response.writeHead(200, {'Content-Type': 'text/html','Access-Control-Allow-Origin':'*'});
	  response.end('Request method is not POST');		
	}

}).listen(3000, 'localhost');


function findFileName(type){
	switch(type) {
  case "mousemove":
  	return "mouse_move.json"
    break;
  case "click":
  	return "click.json"
    break;
  case "wheel":
  	return "wheel.json"
    break;    
  case "resize":
  	return "resize.json"
    break;
  //default:
    	//code block
	} 
}

function appendJson(fileName, content){
	fileSystem.exists(fileName, function(exists) { 
	  if (exists) {
	  	if (fileSystem.statSync(fileName).size > 0)
				fileSystem.appendFile(fileName,", " + content, function (error) {
				  if (error) throw error;
				  console.log('Appended to ' + fileName);
				});
			else{
				fileSystem.appendFile(fileName, content, function (error) {
				  if (error) throw error;
				  console.log('Appended to ' + fileName);
				});				
			}
	  } else{
			fileSystem.writeFile(fileName, content, function (error) {
			  if (error) throw error;
			  console.log('Written to ' + fileName);
			}); 	  	
	  } 
	});	
}