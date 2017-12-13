var canvas = new fabric.Canvas('ham-plane');
var point;
var drawingMode = true;

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

