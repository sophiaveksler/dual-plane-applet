var canvas = new fabric.Canvas('ham-plane');
var point;
var drawingMode = true;

var color = 0;

canvas.on('mouse:down', function (event) {
	if (drawingMode) {
		canvas.selection = false;
		var x = event.e.clientX;
		var y = event.e.clientY;
		if (color == 0) {
            point = new fabric.Circle({radius: 3, fill:'blue', left: x, top: y});
            color = 1;
        }
        else {
        	point = new fabric.Circle({radius: 3, fill:'red', left: x, top: y});
            color = 0;
        }
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

