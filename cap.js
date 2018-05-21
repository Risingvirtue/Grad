var angle = 0;

$(document).ready(function() {
	console.log('hi');
})




function throwCap() {
	setInterval(spin, 0);
}

function spin() {
	angle += 1;
	$("#cap").css({'transform': 'rotate(' + angle + 'deg)'});
	var lesserAngle = angle % 90;
	console.log(lesserAngle);
	$(".circle-container").css({'transform': 'rotate(-'  + (angle  - lesserAngle) + 'deg)'})
	
}

