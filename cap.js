var angle = 0;
const grav = 9.8;
var t = 0.01;
var velocity = 30;
var original = $("#cap").css("top");
var size = 250;
var height = 0;
var cameraHeight = 0;
var maxHeight = 0;
var currT = 0;
var maxT = 0;
original = original.slice(0, original.length - 2);
var windowHeight = window.innerHeight;
var grassHeight = $("#grass").css("height");
$(document).ready(function() {

})




function throwCap() {
	maxHeight = getMaxHeight(grav, velocity) / t;
	maxT = 100 * velocity / grav;
	requestAnimationFrame(spin);
}

function upwards() {

	height += velocity;
	velocity = velocity - t * grav;
	cameraHeight += maxHeight / maxT;

	//$("#cap").css("top", top + "px");
	
	if (original < height * 1.1) {
		var range = getRange(height* 1.1, 1000);
	
		var topPercent = (range.upper - height) / (range.upper - range.lower);
		topPercent *= 100;
		$("#cap").css("top", topPercent + "%");
		$("#grass").css({"top": "70%"});
	} else {
		$("#cap").css("top", parseFloat(original) - height);
		$("#grass").css({"top": "70%"});
		
	}
}

function spin() {
	
	upwards();
	
	var ratio = calcRatio(height, 500);
	//console.log(ratio);
	changeCapSize(size / ratio);
	
	angle += 1;
	angle = angle % 360;
	$("#cap").css({'transform': 'rotate(' + angle + 'deg)'});
	
	$(".circle-container").css({'transform': 'rotate(-'  + (angle) + 'deg)'})
	
	if (height >= 0) {
		requestAnimationFrame(spin);
	}
	currT++;
	
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

function calcRatio(height, distance) {
	
	height = height + 400;
	if (height < windowHeight) {
		return 1;
	}
	var initialRatio = size / windowHeight;
	var range = getRange(height, distance);
	
	return (range.upper - range.lower) / windowHeight;
}

function getRange(height, distance) {
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