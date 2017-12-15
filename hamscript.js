var canvas = new fabric.Canvas('ham-plane');
var dualCanvas = new fabric.Canvas('ham-plane-result');
canvas.centeredScaling = true;
dualCanvas.centeredScaling = true;
dualCanvas.selection = false;
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

		let colorName = 'blue';
		if (color == 0) {
			color = 1;
		}
		else if (color == 1) {
			colorName = 'red';
			color = 0;
		}


       	point = new fabric.Circle({radius: 3, fill:colorName, left: x, top: y, id: canvas.getObjects().length});
        
       	if (colorName == 'red') {
        redSet.add(point)
   		}
       
        else if (colorName == 'blue') {
        blueSet.add(point)
   		}
        point.selectable = false;


		let a = (point.left-(width/2.0))/50.0; // convert to more reasonable coordinates
		let b = ((height - point.top) - (height/2.0))/50.0;

		let x1 = 0;
		let y1 = (((-width/2.0)/50.0)*a + b )*50 + width/2.0
		let x2 = width;
		let y2 = (((width/2.0)/50.0)*a + b )*50 + width/2.0;
		//y = a*x - b; 

		line = new fabric.Line([x1, y1, x2, y2],{
			stroke: colorName,
			fill: colorName, 
			strokeWidth: 3,
			id: point.id
		})
		line.selectable = false;
		dualCanvas.add(line);

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
	canvas.drawingMode = true;
	canvas.clear();
	dualCanvas.clear();
	redSet = new Set();
	blueSet = new Set();
    $('#ham-calculator').text("Calculate Ham Sandwich Cut");
	$('#ham-calculator').attr("disabled", false);
})


$('#ham-calculator').click(function() {
	console.log(blueSet.size)
	console.log(redSet.size)
	if (blueSet.size == 0 || redSet.size == 0) {
		alert("At least 2 points need to be present in the primal plane in order to calculate the Ham Sandwich Cut.")
		return;
	}
	if (blueSet.size != redSet.size) { alert ("Add one more point please! You must have an even number of points to calculate the Ham Sandwich Cut.")}
	canvas.drawingMode = false;
	$('#ham-calculator').text("Calculation in progress...");
	$('#ham-calculator').attr("disabled", true);
}


)


