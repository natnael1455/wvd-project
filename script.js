

let angle =0;
let SIZE = 0;
let w;
let h;



window.onload = function () {
    main();
}



function main(){
	
	let interval= setInterval(animation,80);
	tree_display();
	
}

function animation(){
	sun_rotation();
	
	
}

function display(){
	let canvas = document.getElementById("myCanvas1");
	canvas.width=canvas.offsetWidth;
	canvas.height=canvas.offsetHeight;
	let height= canvas.height
	let ctx = canvas.getContext("2d");
	moon(height,ctx,70,70);
}
function house(size,ctx,x,y){
	
	ctx.beginPath();
	var house_size=size* 0.50;
	house_image = new Image();
	house_image.src = 'house.png';
	house_image.onload = function(){
    ctx.drawImage(house_image,x,y,house_size,house_size);
  	}
}

function tree_display(){
	let canvas = document.getElementById("myCanvas1");
	let ctx = canvas.getContext("2d");

	canvas.width=canvas.offsetWidth;
	canvas.height=canvas.offsetHeight;
	//canvas.style.background = "rgb(0,0,0,0)"
	w=canvas.width;
	h=canvas.height;
	house(h+70,ctx,w/10,h-150);
	drawTree(ctx,'summer',[canvas.width*0.75,canvas.height-10],'green', canvas.height/6, 0, 20);
	console.log(canvas.height)
	}



function sun_rotation(){
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
	angle +=0.10;
	}
	console.log(angle)
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

function drawTree(ctx,season,loc,color,height, angle, thick){
	
	ctx.beginPath();
	ctx.save();
	ctx.strokeStyle = 'rgb(145,94,47)';
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgb(145,94,47)';
	ctx.lineWidth = thick;
	ctx.translate(loc[0],loc[1]);
	ctx.rotate(angle*Math.PI/180);
	ctx.moveTo(0,0);
	ctx.lineTo(0,-height);
	ctx.stroke();
	//console.log(height)
	
	if (height<(h/90)){
		ctx.beginPath();
		if (season==='autumn'){
			var grd = ctx.createLinearGradient(0, -height, -height+4, -height+4);
			grd.addColorStop(0, "red");
			grd.addColorStop(0.5, "orange");
			ctx.fillStyle = grd;
			ctx.shadowColor = 'brown';
		}
		else{
			ctx.fillStyle = color;
			ctx.shadowColor = color;
		}
        ctx.shadowBlur = 20;
		ctx.arc(0,-height,15,0,Math.PI/2.5);
		ctx.fill();
		ctx.restore();
		
		return;
	}
	
	
	drawTree(ctx,season,[0,-height],color,height*0.75, angle+10, thick*0.6);
	drawTree(ctx,season,[0,-height],color,height*0.75,angle-10, thick*0.6);
	
	
	ctx.restore();
	
}