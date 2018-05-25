var windowHeight = window.innerHeight;
var grassHeight = $("#grass").css("height");
grassHeight = parseFloat(grassHeight.slice(0, grassHeight.length - 2));
var caps = [];
var averageHeight = 0;
var range = null;
$(document).ready(function() {
	for (var i = 0; i < 2; i++) {
		var info = generateInfo();
		info.number = i;
		caps.push(new cap(info));
	}
})
function generateInfo() {
	var info = {};
	info.size = Math.random() * 50 + 200;
	info.x = Math.random() * (window.innerWidth - info.size) + info.size / 2;
	info.height = Math.random() * (windowHeight - grassHeight - info.size) + grassHeight + info.size / 2;
	info.spin = Math.floor(Math.random() * 6) - 3;
	info.angle = Math.random() * 90;
	
	return info;
	
}

function setAverage() {
	averageHeight = 0;
	for (var i = 0 ; i < caps.length; i++) {
		averageHeight += caps[i].height;
	}
	averageHeight /= caps.length;
}

function throwCap() {
	requestAnimationFrame(spin);
}

function upwards() {
	   
	for (var i = 0; i < caps.length; i++) {
		var cap = caps[i];
		var ratio = calcRatio(cap.height, 1000, range);
	
		cap.incrementTime();
		cap.moveCap(range);
		cap.adjustSize(ratio);
		cap.spinCap();
		
	}
	
	$("#grass").css({height: grassHeight - range.lower});
	
}

function spin() {
	setAverage();
	range = getRange(averageHeight, 1000);
	upwards();
	
	if (averageHeight > grassHeight) {
		requestAnimationFrame(spin);
	}
}

function changeCapSize(size) {
	var center = getCenter();
	$("#cap").css({width: size, height: size});
	var circle = 8 * size / 125;
	var margin = (size - circle) / 2;
	$(".circle-container").css({height: circle, width: circle, top: margin, left: margin});
	$("#circle").css({height: circle, width: circle, 'border-radius': circle / 2});
	var ropeWidth = circle / 4;
	$("#tassle").css({height: (size / 2) * 1.1, width: ropeWidth, top: circle / 2, left: (circle - ropeWidth) / 2});
	$("#rope").css({top: (size / 2) * 1.1, height: circle, width: circle, left: 0, 'border-radius': circle / 2});
	$("#cap").css({top: center.y - (1 + size / 2), left: center.x - (1 + size / 2)})
	
}


function getCenter() {
	var rect = document.getElementById("cap").getBoundingClientRect();
	return {x: rect.x + (rect.width / 2 - 1), y: rect.y + (rect.height / 2 - 1)}
}

function getMaxHeight(grav, velocity) {
	
	return velocity * velocity / (grav * 2);
}

function calcRatio(height, distance, range) {
	return (range.upper - range.lower) / windowHeight;
}

function getRange(height, distance) {
	if (height < windowHeight) {
		return {lower: 0, upper: windowHeight};
	}
	var initialCameraAngle = Math.atan2(windowHeight, distance);
	var tilt = getTilt(height, distance);
	var range = {lower: Math.tan(tilt) * distance, upper: Math.tan(initialCameraAngle + tilt) * distance};
	return range;
}

function getTilt(height, distance) {
	var initialCameraAngle = Math.atan2(windowHeight, distance);
	var newAngle = Math.atan2(height, distance);
	var tilt = newAngle - initialCameraAngle;
	return tilt;
}