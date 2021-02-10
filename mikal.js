SIZE=1000;
function main(){
  
  let canvas= document.getElementById("myCanvas")
  let ctx=canvas.getContext("2d");
  
	canvas.width=SIZE;
  canvas.height=SIZE;
  
    
  drawHouse(ctx,[SIZE*0.34,SIZE*0.8],SIZE*0.36);

}
function drawHouse(ctx,location,scale){

    ctx.beginPath();
    ctx.save();
    ctx.translate(location[0],location[1]);
    ctx.scale(scale,scale);
    ctx.lineWidth=0.04;

    //roof
    ctx.beginPath();
    ctx.moveTo(-0.3,-0.6);//start
    ctx.lineTo(1,-0.6);//horizontal
    ctx.lineTo(+0.7,-1);//to up
    ctx.lineTo(-0.2,-1);// straight
    ctx.lineTo(-0.5,-0.6);//to down
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();

      //chimney
    ctx.beginPath();
    ctx.rect(0.56*SIZE,  0.38*SIZE, 0.04*SIZE, 0.14*SIZE);
    ctx.rect(0.54*SIZE,  0.38*SIZE, 0.08*SIZE, 0.03*SIZE);
    ctx.fillStyle = "#2a1607";
    ctx.fill();
    ctx.closePath();

     // house wall
    ctx.fillStyle="#8c3e05";
    ctx.rect(0.21*SIZE, 0.59*SIZE, 450, 300);
    ctx.fill();
    ctx.strokeRect(0.21*SIZE, 0.59*SIZE, 450, 300);

    //door
    ctx.fillStyle="gray";
    ctx.beginPath();
    ctx.restore();
    ctx.moveTo(0.52*SIZE, 0.71*SIZE);
    ctx.lineTo(0.52*SIZE, 0.89*SIZE);
    ctx.moveTo(0.6*SIZE, 0.73*SIZE);
    ctx.lineTo(0.6*SIZE, 0.89*SIZE);
    ctx.moveTo(0.44*SIZE, 0.73*SIZE);
    ctx.lineTo(0.44*SIZE, 0.89*SIZE);
    ctx.stroke();
   
    ctx.beginPath();
    ctx.arc(0.52*SIZE, 0.89*SIZE,180,1.355*Math.PI,1.65*Math.PI); // door arc
    ctx.fill();
    ctx.stroke();

    //door knob
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(0.5*SIZE,0.8*SIZE,15,0,2*Math.PI);
    ctx.arc(0.54*SIZE,0.8*SIZE,15,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();

     // windows
    ctx.fillStyle="gray";
    ctx.fillRect(0.25*SIZE, 0.65*SIZE, 0.1*SIZE, 0.045*SIZE);
    ctx.fillRect(0.25*SIZE, 0.7*SIZE, 0.1*SIZE, 0.045*SIZE);
     
   
}