const SIZE = 1000;



function display(){
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");

	canvas.width=SIZE;
	canvas.height=SIZE;
	drawTree(ctx,[SIZE/2,SIZE-50],'green', 200, 0, 30);
	}


function drawTree(ctx,loc,color,height, angle, thick){
	
	ctx.beginPath();
	ctx.save();
	ctx.strokeStyle = 'brown';
	ctx.fillStyle = color;
	ctx.lineWidth = thick;
	ctx.translate(loc[0],loc[1]);
	ctx.rotate(angle*Math.PI/180);
	ctx.moveTo(0,0);
	ctx.lineTo(0,-height);
	ctx.stroke();
	//console.log(height)
	
	if (height<10){
		ctx.beginPath();
		ctx.arc(0,-length,10,0,Math.PI/2);
		ctx.fill();
		ctx.restore();
		
		return;
	}
	
	
	drawTree(ctx,[0,-height],'green',height*0.75, angle+8, thick*0.6);

	drawTree(ctx,[0,-height],'green',height*0.75,angle-8, thick*0.6);
	
	ctx.restore();
	
}



