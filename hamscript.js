var canvas = new fabric.Canvas('ham-plane');
var otherCanvas = new fabric.Canvas('ham-plane-result');
canvas.centeredScaling = true;
otherCanvas.centeredScaling = true;
otherCanvas.selection = false;
var point;
var drawingMode = true;
var width = canvas.width;
var height = canvas.height;
var color = 0;
var redSet = new Set();
var blueSet = new Set();

canvas.on('mouse:down', function (event) {
	if (drawingMode) {
		canvas.selection = false;
		var offset = $('#ham-plane').offset();
		var x = event.e.clientX - offset.left;
		var y = event.e.clientY - offset.top;
		if (color == 0) {
            point = new fabric.Circle({radius: 3, fill:'blue', left: x, top: y});
            blueSet.add(point)
            color = 1;
        }
        else {
        	point = new fabric.Circle({radius: 3, fill:'red', left: x, top: y});
        	redSet.add(point)
            color = 0;
        }
        point.selectable = false;
    }
    });

canvas.on('mouse:up', function (event) {
	if (drawingMode) {
		canvas.selection = true;
	  	canvas.add(point)
	}
    });

canvas.on('object:selected', function(){
    drawingMode = false;         
});
canvas.on('selection:cleared', function(){  
    drawingMode = true;      
});

$('#reset').click(function () {
	canvas.clear();
	otherCanvas.clear();
	redSet = new Set();
	blueSet = new Set();
})


$('#dual-plane-conversion').click(function() {
	otherCanvas.clear();
	//console.log(blueSet);
	// (a,b) --> ax + b
	for (let p of blueSet) {
		let a = (p.left-(width/2.0))/25.0; // convert to more reasonable coordinates
		let b = ((height - p.top) - (height/2.0))/25.0;

		let x1 = 0;
		let y1 = (((-width/2.0)/25.0)*a + b )*25 + width/2.0
		let x2 = width;
		let y2 = (((width/2.0)/25.0)*a + b )*25 + width/2.0;
		//y = a*x - b; 

		line = new fabric.Line([x1, y1, x2, y2],{
			stroke: 'blue',
			fill: 'blue', 
			strokeWidth: 3
		})
		line.selection = false;
		otherCanvas.add(line);

	}
	for (let p2 of redSet) {
		let a = (p2.left-(width/2.0))/25.0;
		let b = ((height - p2.top) - (height/2.0))/25.0 ;

		console.log("a: " + a + " b: "+ b);

		let x1 = 0;
		let y1 = (((-width/2.0)/25.0)*a + b )*25 + width/2.0
		let x2 = width;
		let y2 = (((width/2.0)/25.0)*a + b )*25 + width/2.0;
		//y = a*x - b; 

		line = new fabric.Line([x1, y1, x2, y2],{
			stroke: 'red',
			fill: 'red', 
			strokeWidth: 3
		})
		line.selection = false;
		//line.selection = false; 
		otherCanvas.add(line);

	}

})


