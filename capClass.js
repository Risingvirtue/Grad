function cap(size, x, height, number) {
	this.size = size;
	this.x = x;
	this.height= height;
	this.number = number;

	this.init = function() {
		var contents = '<div class="cap" id="cap' + this.number +'">' +
							'<div class="circle-container" id="circle-container' + this.number +'">' +
							'<div class="circle" id="circle' + this.number +'"></div>' +
							'<div class="tassle" id="tassle' + + this.number +'"></div>' +
							'<div class="rope" id="rope' + this.number +'"></div>' +
							'<div class="strings' + this.number +'">' +
								'<div class="string1' + + this.number +'"></div>' +
								'<div class="string2' + + this.number +'"></div>' +
								'<div class="string3' + + this.number +'"></div>' +
							'</div>' +
						'</div>';
		var oldContents = $("#container").html();
		$("#container").html(oldContents + contents);
		$("#cap" + this.number).css({top: window.innerHeight - this.height, left: this.x})
		this.changeCapSize(this.size);
	}
	
	
	this.changeCapSize = function(size) {
		var center = this.getCenter();
		$("#cap" + this.number).css({width: size, height: size});
		var circle = 8 * size / 125;
		var margin = (size - circle) / 2;
		$("#circle-container" + this.number).css({height: circle, width: circle, top: margin, left: margin});
		$("#circle" + this.number).css({height: circle, width: circle, 'border-radius': circle / 2});
		var ropeWidth = circle / 4;
		$("#tassle"+ this.number).css({height: (size / 2) * 1.1, width: ropeWidth, top: circle / 2, left: (circle - ropeWidth) / 2});
		$("#rope"+ this.number).css({top: (size / 2) * 1.1, height: circle, width: circle, left: 0, 'border-radius': circle / 2});
		$("#cap"+ this.number).css({top: center.y - (1 + size / 2), left: center.x - (1 + size / 2)});
	}
	
	this.getCenter = function() {
		var rect = document.getElementById("cap" + this.number).getBoundingClientRect();
		return {x: rect.x + (rect.width / 2 - 1), y: rect.y + (rect.height / 2 - 1)};
	}
	this.init();
	
	
}