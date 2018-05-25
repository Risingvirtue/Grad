function cap(size, x, height, number) {
	this.size = size;
	this.x = x;
	this.height = height;
	this.number = number;
	this.init = function() {
		var contents = "<div id='cap" + this.number + "'>"  +
							"<div id='circle-container'" + this.number + "'>" + 
								"<div id='circle" + this.number + "'></div>" +
								"<div id='tassle" + this.number + "'></div>" +
								"<div id='rope" + this.number + "'></div>" +
								"<div id='strings" + this.number + "'>" +
									"<div id='string1" + this.number + "'></div>" +
									"<div id='string2" + this.number + "'></div>" +
									"<div id='string2" + this.number + "'></div>" +
								"</div>" +
							"</div>"
									
	}
	init();
}