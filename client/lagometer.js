// Let us know in console when we missed frames - Gadi
var lastTs = 0;
var threshold = ((1/60) + 0.005) * 1000;
var count = 0;
lagCheck = function(ts) {
	var diff = ts - lastTs;
	if (diff > threshold)
		count += Math.floor(diff / threshold);
	else if (count > 0) {
		console.log('Missed ' + count + ' frames around ' + Math.round(ts/1000) + 's');
		count = 0;
	}
	lastTs = ts;
	window.requestAnimationFrame(lagCheck);
}

FView.ready(function() {
	window.setTimeout(lagCheck, 1000);
});
