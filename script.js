

function removeOverlay(){
	
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

function display(){
	var c = document.getElementById("myCanvas");
	c.width = c.offsetWidth;
	c.height = c.offsetHeight;
	var ctx = c.getContext("2d");

	sun(c.height,ctx,100,100);
	moon(c.height,ctx,700,200);

}


function sun(size,ctx,x,y){
	ctx.beginPath();
	var sun_size=size * 0.30;
	base_image = new Image();
  	base_image.src = 'sun.png';
  	base_image.onload = function(){
	ctx.drawImage(base_image, x, y,sun_size,sun_size);
	}

	
}

function moon(size,ctx,x,y){
	ctx.beginPath();
	var moon_size=size* 0.10;
	moon_image = new Image();
	moon_image.src = 'moon.png';
	moon_image.onload = function(){
    ctx.drawImage(moon_image,x,y,moon_size,moon_size);
  	}
}