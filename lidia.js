

let angle =0;
let SIZE = 1000;
let w;
let h;
let leavesArray = [];
let alpha = 255;
let canvas1;
let canvas2;
let canvas3;
let canvas4;
let canvas5;
let radius = 0;
const summerPalette = [[77, 201, 81,255],[35, 97, 37,255]];
const autumnPalette = [[35, 97, 37,255],[234,125,69,255]];
//let autumnPalette = [[35, 97, 37,255],[234,125,69,255],[134, 61, 78,255]];
let time = 0;
let frame = 0;
let house_image;
let summer_current=[];
let autumn_current=[];
let summer_change;
let autumn_change;
let fallStop;
let snowBgCanvas;
let snowFgCanvas;
let birds=[];
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
let petals = ['red','yellow','violet','pink'];
let flower_center = ['black','blue','cyan'];
let selection = [];
let s = 0;
let sun_img;
let moon_img;
let count =0;
let season = "summer";
const snowflakes = new Image();
snowflakes.src = 'snowflakes.png';
const particleArray = [];

window.onload = function () {
    sun_img = new Image();
  	sun_img.src = 'sun.png';
  	sun_img.onload = function(){
	count++;
	}
	moon_img = new Image();
  	moon_img.src = 'moon.png';
  	moon_img.onload = function(){
	count++;
	}
	main();
}



function main(){
	for (let i = 0; i < 20; i++){
		particleArray.push(new Snowflake);
	}
	
	for (let i = 1; i<=3; i++){
		let	bird = document.getElementById(`bird${i}`);
		birds.push(bird);
	}

	console.log(birds[0])

	canvas1 = initializeCanvas("myCanvas_tree");
	canvas2 = initializeCanvas("myCanvas_leaves");
	canvas3 = initializeCanvas("myCanvas_house");
	canvas4 = initializeCanvas("myCanvas_leaves_falling");
	canvas5 = initializeCanvas("myCanvas_spring");
	snowBgCanvas= initializeCanvas('canvasSnowBackground');
    snowFgCanvas= initializeCanvas('canvasSnowForeground');


	document.getElementById("myCanvas_spring").style.visibility = "hidden";

	
	summer_change = setLeafcolor(summerPalette);
	//summer_current = summerPalette[0];
	Object.assign(summer_current,summerPalette[0]);
	autumn_change = setLeafcolor(autumnPalette); 
	Object.assign(autumn_current,autumnPalette[0]);

	//let ctx = canvas3.getContext("2d");
	house_image = new Image();
	house_image.src = 'house.png';
	house_image.onload = function(){
	house(house_image, window.innerHeight,canvas3,window.innerWidth/10,window.innerHeight/2-40)};
	tree_display(canvas1,canvas2,canvas5);

	setInterval(animation,50);
	
	
	//setInterval(changeSeason,3000,canvas1)
}
function initializeCanvas(canvasName){
	canvas = document.getElementById(canvasName);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	return canvas;
}

function setLeafcolor(palette){
	let change = [];
	steps = 240;
	change[0] = (palette[0][0] - palette[1][0]) / steps;
	change[1] = (palette[0][1] - palette[1][1]) / steps;
	change[2]= (palette[0][2] - palette[1][2]) / steps;
	return change;
}

function animation(){
	sun_rotation();
	let snow;

	if ((angle>200 && angle<360)|| season =="winter"){
		birds.map(bird =>{
			if(bird.offsetLeft<=-20 || bird.offsetLeft >=window.innerWidth){
				bird.style.visibility="hidden";
			}
			
			console.log(bird.offsetLeft)
		});
	}
	else{
		birds.map(bird => {
			if(bird.offsetLeft<=-20 || bird.offsetLeft >=window.innerWidth){
				bird.style.visibility="visible";
			}
			console.log(bird.offsetLeft)
		});
	}
	if (time >=0 && time< 12000){
		// summer here
		console.log('summer');
		season="summer";
		if(s<=240){	 
			s=s+1;
		summer_current[0] = summer_current[0] - summer_change[0];
    	summer_current[1] = summer_current[1] - summer_change[1];
    	summer_current[2] = summer_current[2] - summer_change[2];
		}	
		drawLeaves(canvas2,summer_current);
		let ctx = canvas3.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle =`rgba(${summer_current})`;
		ctx.fillRect(0,canvas3.height*0.75,window.innerWidth,canvas3.height*0.25);
		ctx.drawImage(house_image,window.innerWidth/10,window.innerHeight/2-40,window.innerHeight*0.5,window.innerHeight*0.5);
	}
	
	else if (time >=12000 && time<20000){
		console.log('autumn');
		season="autumn";
		// autumn here
		if(s<=480){	 
			s=s+1;
		autumn_current[0] = autumn_current[0] - autumn_change[0];
    	autumn_current[1] = autumn_current[1] - autumn_change[1];
    	autumn_current[2] = autumn_current[2] - autumn_change[2];
		}	
		drawLeaves(canvas2,autumn_current);
		
		let ctx = canvas3.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle =`rgba(${autumn_current})`;
		ctx.fillRect(0,canvas3.height*0.75,window.innerWidth,canvas3.height*0.25);
		ctx.drawImage(house_image,window.innerWidth/10,window.innerHeight/2-40,window.innerHeight*0.5,window.innerHeight*0.5);


		}
		//leaves falling
	else if(time >= 20000 && time <= 53400){
		if (time === 20000){
			fallingLeaves(canvas2);
			fallStop = setInterval(fall,10);
			}
		
		}
	
	
	else if (time >53400 && time< 62000){
		// winter here
		season = "winter";
		if (time===54000){
			
			document.getElementById("myCanvas_leaves").style.visibility = "hidden";
			document.getElementById("myCanvas_leaves_falling").style.visibility = "hidden";
			clearInterval(fallStop);
		}
		else{
		snow = snowAnimation();
		}
		//document.getElementById("myCanvas_leaves").style.visibility = "hidden";
		//document.getElementById("myCanvas_leaves_falling").style.visibility = "hidden";


	}
	
	else if (time >= 62000 && time < 80000){
		// spring here
		season = "spring";
		document.getElementById("myCanvas_leaves").style.visibility = "hidden";
		document.getElementById("myCanvas_leaves_falling").style.visibility = "hidden";
		document.getElementById("myCanvas_spring").style.visibility = "visible";
	    clearInterval(snow)
		snowBgCanvas.style.visibility="hidden";
		drawGrass(canvas3,radius);
		let ctx = canvas3.getContext("2d");
		ctx.drawImage(house_image,window.innerWidth/10,window.innerHeight/2-40,window.innerHeight*0.5,window.innerHeight*0.5);
		if (time >=63000 && time % 1000 == 0){
			if (radius<=10){
			radius += 1;
			//drawSpringLeaves(canvas5,radius);
			let ctx1 = canvas1.getContext("2d");
			let ctx2 = canvas2.getContext("2d");
			let ctx3 = canvas5.getContext("2d");
			ctx3.clearRect(0,0,canvas5.width,canvas5.height);
			ctx1.clearRect(0,0,canvas1.width,canvas1.height);
			drawTree(ctx1,ctx2,ctx3,'summer',[canvas1.width*0.75,canvas1.height-10],'green', canvas1.height/6+10, 0, 25,255);}
			
		}
	}

	else{
		//start animation over again
		//time = 0;
	}
	time = time+50;
}

function house(house_image,size,canvas,x,y){
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle ="rgb(139,93,46)";
	ctx.fillRect(0,size*0.75,window.innerWidth,size*0.25);
	ctx.beginPath();
	var house_size=size* 0.50;
	
    ctx.drawImage(house_image,x,y,house_size,house_size);
  	
}

function tree_display(canvas1,canvas2,canvas3){

	canvas = canvas1;


	let ctx = canvas.getContext("2d");
	let ctx1 = canvas2.getContext("2d");
	let ctx2 = canvas3.getContext("2d");

	w=canvas.width;
	h=canvas.height;
	
	drawTree(ctx,ctx1,ctx2,'summer',[canvas.width*0.75,canvas.height-10],'green', canvas.height/6+10, 0, 25,255);
	
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
	
	ctx.rotate(rangle);
	// drawing the sun and the moon in the opsite side of the x axis
	moon(height,ctx,r,0);
	sun(height,ctx,-r,0);

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
	if(count == 2){
	ctx.drawImage(sun_img, xo, yo,sun_size,sun_size);
	}
}

function moon(size,ctx,x,y){
	ctx.beginPath();
	var moon_size=size* 0.30;
	let xo = x-(Math.round(moon_size/2));
	let yo = y-(Math.round(moon_size/2));
	if(count == 2){
	ctx.drawImage(moon_img,xo,yo,moon_size,moon_size);
		}
}
function drawTree(ctx,ctx1,ctx2,season,loc,color,height, angle, thick,a){
	
	ctx.beginPath();
	ctx1.beginPath();
	ctx2.beginPath();
	ctx.save();
	ctx1.save();
	ctx2.save();
	let alph = Math.floor(a);
	
	ctx.strokeStyle = `rgba(138,115,98,${alph})`;

	ctx.lineWidth = thick;
	ctx.translate(loc[0],loc[1]);
	ctx1.translate(loc[0],loc[1]);
	ctx2.translate(loc[0],loc[1]);
	ctx.rotate(angle*Math.PI/180);
	ctx1.rotate(angle*Math.PI/180);
	ctx2.rotate(angle*Math.PI/180);
	ctx.moveTo(0,0);
	ctx1.moveTo(0,0);
	ctx2.moveTo(0,0);
	ctx.lineTo(0,-height);
	ctx1.lineTo(0,-height);
	ctx2.lineTo(0,-height);
	ctx.stroke();

	//draw leaves on straight (middle) branches 
	if (angle === 0 && height<(ctx.canvas.height/30)){
		ctx1.beginPath();
		ctx2.beginPath();
		//ctx2.clearRect(0,0,ctx2.canvas.width,ctx2.canvas.width);
		ctx1.fillStyle = `rgba(${summerPalette[0]})`;
		ctx2.fillStyle = `rgba(${summerPalette[0]})`;
		ctx1.arc(0,-height,10,0,Math.PI/2);
		ctx2.arc(0,-height,radius,0,Math.PI/2);

		ctx1.fill();
		ctx2.fill();
		ctx.restore();
		ctx1.restore();
		ctx2.restore();
		return;}
	//draw leaves on left and right branches 
	if (height<(ctx.canvas.height/80)){
		ctx1.beginPath();
		ctx2.beginPath();
		//ctx2.clearRect(0,0,ctx2.canvas.width,ctx2.canvas.width);
		ctx1.fillStyle = `rgba(${summerPalette[0]})`;
		ctx2.fillStyle = `rgba(${summerPalette[0]})`;
		ctx1.arc(0,-height,10,0,Math.PI/2);
		ctx2.arc(0,-height,radius,0,Math.PI/2);
		ctx1.fill();
		ctx2.fill();

		ctx.restore();
		ctx1.restore();
		ctx2.restore();
		return;
	}

	
	drawTree(ctx,ctx1,ctx2,season,[0,-height],color,height*0.75, angle+10, thick*0.6,alph*0.7);
	
	drawTree(ctx,ctx1,ctx2,season,[0,-height],color,height*0.75,angle-10, thick*0.6,alph*0.7);
	drawTree(ctx,ctx1,ctx2,season,[0,-height],color,height*0.77,0, thick*0.7,alph*0.7);
	
	ctx.restore();
	ctx1.restore();
	ctx2.restore();
	
}
function getPixelValue(data,x,y,SIZE){
	return{
		red:   data[(y*SIZE+x)*4+0],
		green: data[(y*SIZE+x)*4+1],
		blue:  data[(y*SIZE+x)*4+2],
		alpha: data[(y*SIZE+x)*4+3],
	}
}

function drawSpringLeaves(canvas,radius){
	ctx = canvas.getContext("2d");
	
	imgData=ctx.getImageData(0,0,canvas.width,canvas.height);

	for(var y=0;y<canvas.height;y++){
		for(var x=0;x<canvas.width;x++){
			var pixel=getPixelValue(imgData.data,x,y,canvas.width);

			if (pixel.alpha>=250){
				ctx.beginPath();
				ctx.fillStyle = `rgba(${summerPalette[0][0]},${summerPalette[0][1]},${summerPalette[0][2]},${summerPalette[0][3]})`;
				ctx.arc(x,y,radius,0,Math.PI/2);
				ctx.fill();
				ctx.closePath();
		}

	}
}

}
function drawGrass(canvas,radius){
	let h = radius+10;
	ctx = canvas.getContext("2d");
	let size = window.innerHeight;
	for (let i = 0; i<=20; i++){
	let strt_x = Math.random()*window.innerWidth;
	let strt_y = Math.random()*size*0.25 + size*0.75;
	let end_x = strt_x;
	let end_y = strt_y - h;

	let cp_x1 = strt_x+3;
	let cp_y1 = strt_y-h/2;
	let cp_x2 = strt_x+5;
	let cp_y2 = strt_y-h/2;
	ctx.strokeStyle = `rgba(${summerPalette[0]})`;
	ctx.beginPath();
	ctx.moveTo(strt_x,strt_y);
	ctx.bezierCurveTo( cp_x1,  cp_y1, cp_x2, cp_y2, end_x, end_y);
	ctx.stroke();
	ctx.closePath();

	if (Math.random()>0.96){
		let petal_color = Math.floor(Math.random()*3); 
		let center_color = Math.floor(Math.random()*2); 
		ctx.beginPath();
		ctx.fillStyle = petals[petal_color];
		ctx.arc(end_x,end_y-6,3,0,Math.PI*2,true);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = flower_center[center_color];
		ctx.arc(end_x,end_y-6,2,0,Math.PI*2,true);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = petals[petal_color];
		ctx.arc(end_x-3,end_y-6,3,Math.PI/2,-Math.PI/2,false);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(end_x,end_y-9,3,0,Math.PI,true);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(end_x,end_y-3,3,0,Math.PI,false);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(end_x+3,end_y-6,3,Math.PI/2,-Math.PI/2,true);
		ctx.fill();
		ctx.closePath();
		

	}
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


function fallingLeaves(canvas){
	//let canvas = document.getElementById("myCanvas_tree");
	ctx = canvas.getContext("2d");
	
	imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	//var data=imgData.data;
	//console.log(ctx.canvas.height);
	if (leavesArray.length === 0){
	for(var y=0;y<canvas.height;y++){
		for(var x=0;x<canvas.width;x++){
			var pixel=getPixelValue(imgData.data,x,y,canvas.width);
			//console.log(pixel.alpha);
			if (pixel.alpha>=230){
				leavesArray.push(new leaves(x,y,pixel));
			}
		}
	}
}
}


function fall(){
	frame += 1;
	//console.log(frame);
	if (frame % 2 == 0 && frame < 2500){
	let choice = Math.floor(Math.random()*(leavesArray.length-1))
	if (!(leavesArray[choice].fall)){
		selection.push(choice);
		for (let i = 0; i<=3 ;i++){
		leavesArray[choice+i].disappear();
		leavesArray[choice-i].disappear();
		leavesArray[choice+i].fall = true;
		leavesArray[choice-i].fall = true;
	}
	}
		
}
/*else if ( frame >= 11000) {
	for (let i = 0; i<leavesArray.length; i++){
		if (!(leavesArray[i].fall)){
		leavesArray[i].fade();}
	}
}*/

	ctx = canvas4.getContext("2d");
	
	for (let i = 0; i<selection.length; i++){
		leavesArray[selection[i]].update();
	}

	ctx.clearRect(0,0,canvas.width,canvas.height);

	for (let i = 0; i<selection.length; i++){
		leavesArray[selection[i]].draw();
	}


	//window.requestAnimationFrame(fall)
	
}


class leaves{
	constructor(x,y,pixel){
		this.ctx = canvas4.getContext("2d");
		this.x = x;
		this.y = y;
		this.speed = 1;
		this.color = `rgba(${pixel.red},${pixel.green},${pixel.blue},${pixel.alpha})`
		this.pixel = pixel;
		this.fall = false;
	}
	
	draw(){
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.arc(this.x,this.y,10,0,Math.PI/2);
		this.ctx.fill();

	}

	update(){
		this.x += Math.random();
		this.y += this.speed;
	}

	disappear(){
		if (!this.fall){
		let ctx1 = canvas2.getContext("2d");
		ctx1.globalCompositeOperation = 'destination-out';
		ctx1.beginPath();
		ctx1.arc(this.x,this.y,10,0,Math.PI/2);
		ctx1.fill();
		ctx1.closePath();
	}
}

	fade(){
		let ctx1 = canvas2.getContext("2d");
		ctx1.beginPath();
		//let red = Math.floor(this.pixel.red*0.7);
		//ctx1.globalCompositeOperation = 'source-over'
		let red = this.pixel.red;
		let green = this.pixel.green;
		let blue = this.pixel.blue;
		this.pixel.alpha *= 0.8;
		let alpha = this.pixel.alpha;
		//console.log(this.pixel.red);
		ctx1.fillStyle = `rgba(${red},${green},${blue},${alpha})`;
		ctx1.fillRect(this.x,this.y,1,1);
		ctx1.closePath();
		//ctx1.fill();
	}
}

function snowAnimation(){

    const treeLocation = [CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.95];
 let  snows = setInterval(function() {
        handleSnowFlakes(snowBgCanvas);
        drawSnowBackground(snowBgCanvas);
    },1000/60);  
    drawSnowForeground(snowFgCanvas); 
   return snows;
}



class Snowflake {
    constructor(){
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = Math.random() * CANVAS_HEIGHT;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 4);
        this.frameSize = 250;
        this.angle = 0;
        this.spin = Math.random() > 0.5 ? 0.2 : -0.2;

    }
    update(){
        this.y += this.speed;
        if (this.y - this.size > CANVAS_HEIGHT) this.y = 0 - this.size;
        this.angle += this.spin;

    }
    draw(canvas){
        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI/180);
        ctx.drawImage(snowflakes, this.frameX * this.frameSize, 
        this.frameY * this.frameSize, this.frameSize, this.frameSize,
        0 - this.size/2, 0 - this.size/2, this.size, this.size);
        ctx.restore();
    }


}

function handleSnowFlakes(canvas){
    clear(canvas);
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw(canvas);
    }
}
function clear(canvas){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}
function drawSnowBackground(canvas){
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT);
    ctx.lineTo(0, CANVAS_WIDTH - 20);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'lightblue';
    ctx.quadraticCurveTo(CANVAS_WIDTH, CANVAS_WIDTH - 30, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_WIDTH - 30);
    ctx.quadraticCurveTo(0, CANVAS_WIDTH + 20, 0, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.fill();
}
function drawSnowForeground(canvas){
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT);
    ctx.lineTo(0, CANVAS_WIDTH + 20);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'lightblue';
    ctx.quadraticCurveTo(CANVAS_WIDTH, CANVAS_WIDTH + 20, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.fill();

}