

let angle =0;
let SIZE = 1000;
let w;
let h;
let leaves = [];
let alpha = 255;
let canvas1;
let canvas2;
let summerPalette = [[77, 201, 81,255],[35, 97, 37,255]];
let autumnPalette = [[35, 97, 37,255],[234,125,69,255]];
//let autumnPalette = [[35, 97, 37,255],[234,125,69,255],[134, 61, 78,255]];
let time = 0;

let summer_current;
let autumn_current;
let summer_change;
let autumn_change;

let s = 0;
window.onload = function () {
    main();
}



function main(){
	canvas1 = initializeCanvas("myCanvas_tree");
	canvas2 = initializeCanvas("myCanvas_leaves");
	let canvas3 = initializeCanvas("myCanvas_house");
	canvas3.width=window.innerWidth;
	canvas3.height=window.innerHeight;
	/*let steps = 2000;
	summer_red_change = (summerPalette[0][0] - summerPalette[1][0]) / steps;
	summer_green_change = (summerPalette[0][1] - summerPalette[1][1]) / steps;
	summer_blue_change = (summerPalette[0][2] - summerPalette[1][2]) / steps;
	summer_current = summerPalette[0];*/
	

	summer_change = setLeafcolor(summerPalette);
	summer_current = summerPalette[0];
	autumn_change = setLeafcolor(autumnPalette); 
	autumn_current = autumnPalette[0];

	let ctx = canvas3.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = `rgba(${summerPalette[1]})`;
	//console.log(ctx.fillStyle);
	ctx.fillRect(0,0,50,50);
	ctx.fillStyle = `rgba(${autumnPalette[1]})`;
	ctx.fillRect(100,0,50,50)
	house(window.innerHeight,ctx,window.innerWidth/10,window.innerHeight/2-40);
	tree_display(canvas1,canvas2);

	setInterval(animation,50);
	
	
	//setInterval(changeSeason,3000,canvas1)
}
function initializeCanvas(canvasName){
	canvas = document.getElementById(canvasName);
	return canvas;
}

function setLeafcolor(palette,steps){
	let change = [];
	steps = 1500;
	change[0] = (palette[0][0] - palette[1][0]) / steps;
	change[1] = (palette[0][1] - palette[1][1]) / steps;
	change[2]= (palette[0][2] - palette[1][2]) / steps;
	return change;
}

function animation(){
	sun_rotation();
	if (time >=0 && time< 120000){
		// summer here
		console.log('summer');
		
		if(s<=1500){	 
			s=s+1;
		summer_current[0] = summer_current[0] - summer_change[0];
    	summer_current[1] = summer_current[1] - summer_change[1];
    	summer_current[2] = summer_current[2] - summer_change[2];
		}	
		drawLeaves(canvas2,summer_current);
	}
	
	else if (time >=120000 && time<240000){
		console.log('autumn');
		// autumn here
		if(s<=3000){	 
			s=s+1;
		autumn_current[0] = autumn_current[0] - autumn_change[0];
    	autumn_current[1] = autumn_current[1] - autumn_change[1];
    	autumn_current[2] = autumn_current[2] - autumn_change[2];
		}	
		drawLeaves(canvas2,autumn_current);
		//leaves falling
	}
	
	else if (time >=240000 && time< 480000){
		// winter here
	}
	
	else if (time >=480000 && time< 600000){
		// spring here
	}

	else{
		//start animation over again
		time = 0;
	}
	time = time+50;
}

function house(size,ctx,x,y){
	ctx.beginPath();
	ctx.fillStyle ="green"
	ctx.fillRect(0,size*0.75,window.innerWidth,size*0.25);
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
	drawTree(ctx,ctx1,'summer',[canvas.width*0.75,canvas.height-10],'green', canvas.height/6+10, 0, 25,255);
	
	}



function sun_rotation(){
	c = document.getElementById("myCanvas_sun");

	c.width=window.innerWidth;;
	c.height=window.innerHeight;
	let l ;
	if(angle <=90){
		l= 25 + (angle*0.27777778);
	}

	else if((90 < angle) && (angle <=270)){
		l =50-((angle-90)*0.27777778);
	}
	else {
		l=(angle-270)* 0.27777778;
	}
	;
	c.style.background=`linear-gradient(0deg,hsl(204, 100%, ${l+10}%) 0%, hsl(206, 100%, ${l}%) 100%)`;
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
	ctx.beginPath();
	sun(height,ctx,-r,0);
	ctx.beginPath();
	moon(height,ctx,r,0);
	ctx.rotate(rangle);
	if (angle >= 360){
		angle =0;
	}
	else{
	angle +=0.5;
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

function drawTree(ctx,ctx1,season,loc,color,height, angle, thick,a){
	
	ctx.beginPath();
	ctx1.beginPath();
	ctx.save();
	ctx1.save();
	let alph = Math.floor(a);
	
	ctx.strokeStyle = `rgba(138,115,98,${alph})`;

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

	if (angle === 0 && height<(ctx.canvas.height/30)){
		ctx1.beginPath();
		ctx1.fillStyle = color;
		//ctx1.shadowColor = color
        //ctx1.shadowBlur = 20;
		//let probability = Math.random();
		//if (probability>0.9){
		ctx1.arc(0,-height,10,0,Math.PI/2);
		//ctx1.arc(0,-height-20,15,0,Math.PI/2.5);
		ctx1.fill();
	//}
		ctx.restore();
		ctx1.restore();
		return;}
	
	if (height<(ctx.canvas.height/80)){
		ctx1.beginPath();
		ctx1.fillStyle = color;
		//ctx1.shadowColor = color
        //ctx1.shadowBlur = 20;
		//let probability = Math.random();
		//if (probability>0.9){
		ctx1.arc(0,-height,10,0,Math.PI/2);
		//ctx1.arc(0,-height-20,15,0,Math.PI/2.5);
		ctx1.fill();
	//}
		ctx.restore();
		ctx1.restore();
		return;
	}

	
	drawTree(ctx,ctx1,season,[0,-height],color,height*0.75, angle+10, thick*0.6,alph*0.5);
	
	drawTree(ctx,ctx1,season,[0,-height],color,height*0.75,angle-10, thick*0.6,alph*0.5);
	drawTree(ctx,ctx1,season,[0,-height],color,height*0.77,0, thick*0.7,alph*0.5);
	
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