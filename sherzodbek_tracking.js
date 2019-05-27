/*
1 add event
2 add size variables
3	add object
4 add function
5 rename all properties
*/

//document.getElementsByTagName("BODY")[0].addEventListener("mousemove", trackMouseMovement);
window.addEventListener("click", trackMouseClick);
window.addEventListener("mousemove", trackMouseMovement);
window.addEventListener("wheel", trackWheel);
window.addEventListener("resize", trackResize);

var clickSize = 50; // the max lenght of object
var mousemoveSize = 100;
var wheelSize = 100;
var resizeSize = 100;

var mouseClickCoordinates = {type:"click",date:getDate(),coordinates:[]}
var mouseMoveCoordinates = {type:"mousemove",date:getDate(),coordinates:[]}
var wheelCoordinates = {type:"wheel",date:getDate(),coordinates:[]}
var resizeProperties = {type:"resize",date:getDate(),size:[]}

function trackMouseClick(event) {
	var x = event.clientX;
  var y = event.clientY; 
	var coordinates = { "x" : x.toString(), "y" : y.toString(), "time" : getEventTime() };

	mouseClickCoordinates["coordinates"].push(coordinates);

	if (mouseClickCoordinates["coordinates"].length >= clickSize){
		var recordJson = JSON.stringify(mouseClickCoordinates);
		sendReord(recordJson);
		mouseClickCoordinates["coordinates"].length = 0;
	}

	console.log(coordinates);
}

function trackMouseMovement(event) {
  var x = event.clientX;
  var y = event.clientY;
	var coordinates = { 'x' : x.toString(), 'y' : y.toString(), 'time': getEventTime() };

	mouseMoveCoordinates["coordinates"].push(coordinates);

	if (mouseMoveCoordinates["coordinates"].length >= mousemoveSize){
		var recordJson = JSON.stringify(mouseMoveCoordinates);
		sendReord(recordJson);
		mouseMoveCoordinates["coordinates"].length = 0;
	}

	console.log(coordinates);
}

function trackWheel(event) {
  var x = event.deltaX;
  var y = event.deltaY;
  var z = event.deltaZ;

	var coordinates = { 'x' : x.toString(), 'y' : y.toString()/*, 'z' : z.toString()*/, 'time': getEventTime()};

	wheelCoordinates["coordinates"].push(coordinates);

	if (wheelCoordinates["coordinates"].length >= wheelSize){
		var recordJson = JSON.stringify(wheelCoordinates);
		sendReord(recordJson);
		wheelCoordinates["coordinates"].length = 0;
	}

	console.log(coordinates);
}

function trackResize() {
 	var width = window.innerWidth;
 	var height = window.innerHeight;

	var size = { 'width' : width.toString(), 'height' : height.toString(), 'time': getEventTime() };

	resizeProperties["size"].push(size);

	if (resizeProperties["size"].length >= resizeSize){
		var recordJson = JSON.stringify(resizeProperties);
		sendReord(recordJson);
		resizeProperties["size"].length = 0;
	}

	console.log(size);
}

function sendReord(recordJson){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:3000",true);
	xmlhttp.setRequestHeader("Content-Type", "text/plain");//"text/plain" is for avoiding preflight request
	xmlhttp.onload = function() {
	  if (xmlhttp.status == 200) {
	    console.log('Data sent successfully: ' + xmlhttp.responseText);
	  }else if (xhr.status !== 200) {
	    console.log('Request failed: ' + xmlhttp.status);
	  }
	};
	xmlhttp.send(recordJson);
}

function getEventTime() {
	var date = new Date();
  var mil = date.getMilliseconds();
  var sec = date.getSeconds();
  var min = date.getMinutes();  
  var hou = date.getHours();  
	
	return hou + "" + min +  "" + sec + "" + mil;
}

function getDate() {
	var date = new Date();
  var yea = date.getFullYear();
  var mon = date.getMonth();
  var day = date.getDate();  
		
	return yea + "" + mon +  "" + day;
}