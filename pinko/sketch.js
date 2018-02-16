var partical;
var bucket;
var ball;
function setup()
{
  createCanvas(600,600)
  partical=new partical()
  bucket=new bucket()
  ball=new ball()
}

function draw() {
  background(0)

//pinkoes
  for(var b=50;b<height/2+40;b=b+40){
  for(var i=20;i<width;i=i+40)
  {
    partical.show(i,b,10,ball)
  }
}
//pinkobucket

for(var i=0;i<width;i=i+70)
{
  bucket.showbase(i,height-20,50,20,ball)
  bucket.showedge(i+50,height/2+200,20,120,ball)
}

//pinkoball

ball.show()
  ball.update()








}
function ball()
{
  this.x=width/2
  this.y=-10
  this.r=25
  this.yspeed=4
  this.xspeed=0
  this.ymove=false
  this.ypos=false

  this.show=function()
  {
    fill(100,0,255)
    ellipse(this.x,this.y,this.r,this.r)
  }

  this.update=function()
    {
       if(this.x<0 || this.x>width)
       {
         this.xspeed=-this.xspeed
       }


     this.x+=this.xspeed

     if(this.ymove==true)
     {
       this.y=this.y+this.yspeed
     }

     if(this.ypos==true)
     {
         this.x=mouseX
     }

    if(mouseIsPressed)
    {

      this.ymove=true

    }
    if(mouseIsPressed)
    {

      this.ypos=true

    }
    else{this.ypos=false}
  }
}function bucket()
{
this.showbase=function(x,y,w,h,ball)
{
  fill(0,100,255)
  rect(x,y,w,h)
  if(ball.x>x && ball.x<x+w && ball.y>y && ball.y<y+h)
  {
    ball.y=y
    ball.xspeed=0
    ball.yspeed=0

  }
}

this.showedge=function(x,y,w,h,ball)
{
  fill(0,100,255)
  rect(x,y,w,h)
    if(ball.x>x && ball.x<x+w && ball.y>y && ball.y<y+h)
    {
     ball.xspeed=-ball.xspeed
   }
}
}
function partical() {

  this.show=function(x,y,r,ball) {
    fill(0,255,100)
    ellipse(x,y,r,r)

    if(sqrt(sq(ball.x-x)+sq(ball.y-y))<=r)
    {

      ball.xspeed=random(3,-3)
      if(ball.xspeed==0||ball.xspeed==1 || ball.xspeed==-1){  ball.xspeed=random(3,-3)}
    }
      }



}
