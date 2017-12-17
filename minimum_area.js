
function findTriangle(point1, point2) {
	var height = 1000000;
	var point3 = new customPointDataStructure();
	return [height, point1, point2, point3];
}


function getAllIntersections() {
	var lastID = null;
	for (let i = 0; i < totalSet.length; i++) {
		var lastID = null;
		for (let j = i+1; j < totalSet.length; j++) {
			if(i != j) {
				var dcelIndex = new dcelIndexStructure();
				dcelIndex.ID1 = totalSet[i].ID;
				dcelIndex.ID2 = totalSet[j].ID;

				var dcelValue = new dcelValueStructure();
				dcelValue.intersection = findIntersection(totalSet[i], totalSet[j]);
				dcelValue.lastID = lastID;
				dcelValue.nextID = null;

				if(lastID != null) {
					dcelIndex = new dcelIndexStructure();
					dcelIndex.ID1 = totalSet[i].ID;
					dcelIndex.ID2 = lastID;

					dcelValue = new dcelValueStructure();
					dcelValue = dcel.get(dcelIndex);
					dcelValue.nextID = totalSet[j].ID;
					dcel.set(dcelIndex, dcelValue);
				}

				dcel.set(dcelIndex, dcelValue);
			}
		}
	}
	console.log(intersectionSet);
}


function findIntersection(point1, point2)
{
	let a1 = point1.dualSlope;
	let b1 = point1.dualIntercept;
	let a2 = point2.dualSlope;
	let b2 = point2.dualIntercept;

	var intersectionA, intersectionB;

	if (point1.dualSlope - point2.dualSlope == 0) {
//	alert("Two of your lines are parallel and will never intersect. Please reset and try again.");
		return [null, null];
	}

	intersectionA = (b2-b1)/(a1-a2)
	intersectionB = a1 * intersectionA + b1;

	let interS = new intersection();
	fillIntersectionData(interS, point1, point2, intersectionA, intersectionB);
	[xA, yB] = scaleDualPointDataReverse(intersectionA, intersectionB)


	p = new fabric.Circle(	{
												radius: 5,
												fill: 'darkmagenta',
												left: xA - 5,
												top: yB - 5,
											});
	p.selectable=false;
	dualCanvas.add(p);
	interS.fabricPoint = p;
	intersectionSet.push(interS);

	return [intersectionA, intersectionB];
}

