

let angle =0;



window.onload = function () {
    main();
}



function main(){
	let interval= setInterval(display,10);
}



function display(){
	c = document.getElementById("myCanvas");
	c.width = c.offsetWidth;
	c.height = c.offsetHeight;
	//finding the center of the canvas
	 xc=Math.round(c.width/2)
	 yc=Math.round(c.height/2)
	//finding the semi axis of rotation which is set to 75% of the canvas semi axis
	 a=Math.round(xc*1)
	 b=Math.round(yc*1)
	 // converting the angle from degree to radiant
	 let rangle = (Math.PI*angle)/180
	 // calculating the rudius of the ecllips orbit of rotation
	 r = (a*b)/Math.sqrt(((a**2)*(Math.sin(rangle)**2))+((b**2)*(Math.cos(rangle)**2)))
	r=Math.round(r);
	let height=c.height
	ctx = c.getContext("2d");
	//shift the origin of the  screen to the center of the screen so that it can rotate from the center
	ctx.translate(xc,yc+(yc*0.2))
	// drawing the sun and the moon in the opsite side of the x axis
	sun(height,ctx,-r,0);
	moon(height,ctx,r,0);
	ctx.rotate(rangle);
	if (angle === 359){
		angle =0;
	}
	else{
	angle +=0.1;
	}
	
}


function sun(size,ctx,x,y){
	ctx.beginPath();
	var sun_size=size * 0.30;
	let xo = x-(Math.round(sun_size/2));
	let yo = y-(Math.round(sun_size/2));
	base_image = new Image();
  	base_image.src = 'sun.png';
  	base_image.onload = function(){
	ctx.drawImage(base_image, xo, yo,sun_size,sun_size);
	}

	
}

function moon(size,ctx,x,y){
	ctx.beginPath();
	var moon_size=size* 0.30;
	let xo = x-(Math.round(moon_size/2));
	let yo = y-(Math.round(moon_size/2));
	moon_image = new Image();
	moon_image.src = 'moon.png';
	moon_image.onload = function(){
    ctx.drawImage(moon_image,xo,yo,moon_size,moon_size);
  	}
}