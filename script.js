function removeOverlay(){
	let element = document.getElementById("overlay")
	element.style.display="none";

	var c = document.getElementById("myCanvas");
	c.width = c.offsetWidth;
	c.height = c.offsetHeight;
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(200, 200, 100, 0, 2 * Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.beginPath();
	ctx.strokeStyle = 'red';
	ctx.moveTo(100, 200);
	ctx.quadraticCurveTo(150,350,286,150);
	ctx.moveTo(100, 200);
	ctx.quadraticCurveTo(150,280,286,150);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(100, 200);
	ctx.bezierCurveTo(100, 400, 300, 400, 300, 200);
	ctx.strokeStyle = 'Green';
	ctx.stroke();
}