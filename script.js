

let angle =0;
let SIZE = 1000;
let w;
let h;
let order = 0;
let leaves = [];
let alpha = 255;
let canvas1;
let canvas2;
let grn = 255;

let time = 0;

window.onload = function () {
    main();
}



function main(){
	canvas1 = initializeCanvas("myCanvas_tree");
	canvas2 = initializeCanvas("myCanvas_leaves");
	let canvas3 = initializeCanvas("myCanvas_house");
	canvas3.width=window.innerWidth;
	canvas3.height=window.innerHeight;
	let ctx = canvas3.getContext("2d");
	house(window.innerHeight,ctx,window.innerWidth/10,window.innerHeight/2-40);
	tree_display(canvas1,canvas2);

	setInterval(animation,50);
	
	
	//setInterval(changeSeason,3000,canvas1)
}
function initializeCanvas(canvasName){
	canvas = document.getElementById(canvasName);
	return canvas;
}


function animation(){
	sun_rotation();
	if (time >=0 && time< 300000){
		// summer here
		
		//grn = grn*0.9
		let color = [0,grn,0,255]
		drawLeaves(canvas2,color);
	}
	
	else if (time >=300000 && time<600000){
		// autumn here
		color = [200,200,0,255]
		drawLeaves(canvas2,color);
	}
	
	else if (time >=600000 && time< 900000){
		// winter here
	}
	
	else if (time >=900000 && time< 1200000){
		// spring here
	}

	else{
		//start animation over again
		time = 0
	}
	time = time+50;
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

function tree_display(canvas1,canvas2){

	canvas = canvas1;

	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	canvas2.width=window.innerWidth;
	canvas2.height=window.innerHeight;
	let ctx = canvas.getContext("2d");
	let ctx1 = canvas2.getContext("2d");

	w=canvas.width;
	h=canvas.height;
	//house(h,ctx,w/10,canvas.height/2+40);
	drawTree(ctx,ctx1,'summer',[canvas.width*0.75,canvas.height-10],'green', canvas.height/6+10, 0, 20,255);
	
	}



function sun_rotation(){
	c = document.getElementById("myCanvas_sun");

	c.width=window.innerWidth;;
	c.height=window.innerHeight;
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
	//console.log(angle)
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

function drawTree(ctx,ctx1,season,loc,color,height, angle, thick,a){
	
	ctx.beginPath();
	ctx1.beginPath();
	ctx.save();
	ctx1.save();
	
	ctx.strokeStyle = `rgba(110,94,60,${a})`;

	//console.log(ctx.strokeStyle)
    //ctx.shadowBlur = 20;
    //ctx.shadowColor = 'rgb(120,94,47)';
	ctx.lineWidth = thick;
	ctx.translate(loc[0],loc[1]);
	ctx1.translate(loc[0],loc[1]);
	ctx.rotate(angle*Math.PI/180);
	ctx1.rotate(angle*Math.PI/180);
	ctx.moveTo(0,0);
	ctx1.moveTo(0,0);
	ctx.lineTo(0,-height);
	ctx1.lineTo(0,-height);
	ctx.stroke();
	//console.log(height)
	
	if (height<(h/90)){
		ctx1.beginPath();
		if (season==='autumn'){
			var grd = ctx1.createLinearGradient(0, -height, -height+4, -height+4);
			grd.addColorStop(0, "red");
			grd.addColorStop(0.5, "orange");
			ctx1.fillStyle = grd;
			ctx1.shadowColor = 'brown';
		}
		else{
			ctx1.fillStyle = color;
			//ctx1.shadowColor = color;
		}
        //ctx1.shadowBlur = 20;
		let probability = Math.random();
		if (probability>0.5){
		ctx1.arc(0,-height,15,0,Math.PI/2.5);
		ctx1.arc(0,-height,15,0,Math.PI/2.5,false);
		ctx1.fill();}
		ctx.restore();
		ctx1.restore();
		return;
	}

	
	drawTree(ctx,ctx1,season,[0,-height],color,height*0.75, angle+10, thick*0.7,a*0.4);
	
	drawTree(ctx,ctx1,season,[0,-height],color,height*0.75,angle-10, thick*0.7,a*0.4);
	drawTree(ctx,ctx1,season,[0,-height],color,height*0.75,0, thick*0.6,a*0.4);
	
	ctx.restore();
	ctx1.restore();
	
}
function getPixelValue(data,x,y,SIZE){
	return{
		red:   data[(y*SIZE+x)*4+0],
		green: data[(y*SIZE+x)*4+1],
		blue:  data[(y*SIZE+x)*4+2],
		alpha: data[(y*SIZE+x)*4+3],
	}
}

function drawLeaves(canvas,color){
	//let canvas = document.getElementById("myCanvas_tree");
	ctx = canvas.getContext("2d");
	
	imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	//var data=imgData.data;
	//console.log(ctx.canvas.height);
	for(var y=0;y<canvas.height;y++){
		for(var x=0;x<canvas.width;x++){
			var pixel=getPixelValue(imgData.data,x,y,canvas.width);
			//console.log(pixel.alpha);
			if (pixel.alpha>=230){
				imgData.data[(y*canvas.width+x)*4+0]=color[0]
				imgData.data[(y*canvas.width+x)*4+1]=color[1]
				imgData.data[(y*canvas.width+x)*4+2]= color[2]
				imgData.data[(y*canvas.width+x)*4+3]= pixel.alpha

			//	leaves.push([x,y]);}
			//ctx.clearRect(0,0,canvas.width, canvas.height);

		}
		else{
			imgData.data[(y*canvas.width+x)*4+3]= 0;
		}
	}
}
//ctx.clearRect(0,0,canvas.width, canvas.height);
ctx.putImageData(imgData,0,0)

//	console.log(leaves)
}