import './style.css'
const canavs=document.getElementById('canvas')
canavs.width=innerWidth;
canavs.height=innerHeight;
const ctx=canavs.getContext('2d');

ctx.translate(innerWidth/2, innerHeight/2);


function drawpoint(c,x, y,color) {
c.beginPath();
c.moveTo(x, y);
c.lineTo(x+1,y+1);
c.strokeStyle=color;
c.stroke()
}
class Points{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}
class Line{
constructor(m,b){
  this.m=m;
  this.b=b;
  this.x1=-2000;
  this.y1=m*this.x1+b;
  this.x2=2000;
  this.y2=m*this.x2+b;
}
updateline(){
  this.x1=-2000;
  this.y1=this.m*this.x1+this.b;
  this.x2=2000;
  this.y2=this.m*this.x2+this.b;
}
calculate(pointarray,learningrate){
  let partialderivativeOfM=0;
  let partialderivativeOfB=0;
  
  for(let i=0;i<pointarray.length;i++){
    partialderivativeOfM+=(pointarray[i].y-(this.m*pointarray[i].x+this.b))*pointarray[i].x
    partialderivativeOfB+=(pointarray[i].y-(this.m*pointarray[i].x+this.b))
  }
  this.m=this.m+learningrate*partialderivativeOfM;
  this.b=this.b-learningrate*partialderivativeOfB;
  this.updateline();
}
drawline(c,color){
  c.beginPath();
  c.moveTo(this.x1,this.y1);
  c.lineTo(this.x2,this.y2);
  c.strokeStyle=color;
  c.stroke()
}
}




const x_axis=new Line(0,0)
const y_axis=new Line(1000,0)
let showaxis=true;


let pointarr=[]
let rect = canvas.getBoundingClientRect();
canavs.onmousedown=(e)=>{
  pointarr.push(new Points(e.clientX-rect.left-innerWidth/2,e.clientY-rect.top-innerHeight/2))
}
onkeydown=(e)=>{
if(e.key=='s'){
  showaxis=!showaxis;
}
}


const regressionline=new Line(-1,0)



function animate(){
requestAnimationFrame(animate);
ctx.clearRect(-innerWidth/2,-innerHeight/2,innerWidth,innerHeight)
drawpoint(ctx, 0,0,"red")
for(let i=0;i<pointarr.length;i++){
  drawpoint(ctx,pointarr[i].x,pointarr[i].y,"red")
}

if(showaxis){
  x_axis.drawline(ctx,"black")
  y_axis.drawline(ctx,"black")
}


regressionline.calculate(pointarr,0.0000001)
regressionline.drawline(ctx,"blue")



}


animate()