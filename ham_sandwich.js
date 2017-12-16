function calculateHamSandwich()
{
	sortBySlope(totalSet);
	var median = Math.floor(totalSet.length / 2);
	changePointColor(totalSet[median], 'green');
}

function sortBySlope(dataSet)
{
	dataSet.sort(function(pointData1, pointData2) {
			return pointData1.a - pointData2.a;
	});
}