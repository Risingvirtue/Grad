var angle = 0;
const grav = -9.8;
var velocity = 10;
var t = 0;
$(document).ready(function() {
	console.log('hi');
})




function throwCap() {
	setInterval(spin, 0);
}

function moveUp() {
	
	
	t = t + 0.01;
	
}
function spin() {
	moveUp();
	angle += 1;
	$("#cap").css({'transform': 'rotate(' + angle + 'deg)'});
	var lesserAngle = angle % 45;
	console.log(lesserAngle);
	$(".circle-container").css({'transform': 'rotate(-'  + (angle) + 'deg)'})
	
}

