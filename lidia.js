const SIZE = 1000;
let w;
let h;


function display(){
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");

	canvas.width=canvas.offsetWidth;
	canvas.height=canvas.offsetHeight;
	w=canvas.width;
	h=canvas.height;
	drawTree(ctx,'summer',[canvas.width*0.75,canvas.height-10],'green', canvas.height/5, 0, 20);
	console.log(canvas.height)
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



