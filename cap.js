var angle = 0;
const grav = 9.8;
var t = 0.01;
var velocity = 20;
var original = $("#cap").css("top");
var size = 250;
var height = 0;
var cameraHeight = 0;
var maxHeight = 0;
var currT = 0;
var maxT = 0;
original = original.slice(0, original.length -2);
$(document).ready(function() {

})




function throwCap() {
	maxHeight = getMaxHeight(grav, velocity) / t;
	maxT = 100 * velocity / grav;
	requestAnimationFrame(spin);
}

function upwards() {
	
	var top = $("#cap").css("top");
	top = top.slice(0,top.length - 2);
	
	//top -= velocity;
	height += velocity;
	velocity = velocity - t * grav;
	cameraHeight += maxHeight / maxT;
	console.log(cameraHeight);
	$("#cap").css("top", (original - cameraHeight) + "px");
	

}

function spin() {
	
	upwards();
	
	var ratio = calcRatio(height, 500);
	
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
	var length = Math.sqrt(distance*distance + height * height);
	return length / distance;
}