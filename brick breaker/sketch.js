var bricks=[]
var cols=[]
var ball;
var paddle;
function setup()
{
   createCanvas(500,500)
    ball=new ball()
    paddle=new paddle()
   // for(var r=0;r<10;r++){
   for(var i=0;i<14;i++)
   { bricks[i]=new brick(i*40,10)}
   for(var i=14;i<28;i++)
   {bricks[i]=new brick((i-14)*40,30)}
   for(var i=28;i<42;i++)
   { bricks[i]=new brick((i-28)*40,50)}
   for(var i=42;i<56;i++)
   {bricks[i]=new brick((i-42)*40,70)}
   for(var i=56;i<70;i++)
   { bricks[i]=new brick((i-56)*40,90)}
   for(var i=70;i<84;i++)
   {bricks[i]=new brick((i-70)*40,110)}


// }
}
console.log(bricks)


function draw()
{
background(51);
if(keyIsDown(37))
{paddle.x=paddle.x-10}
if(keyIsDown(39))
{paddle.x=paddle.x+10}

ball.show()
paddle.show()
paddle.check(ball)
for(var i=0;i<bricks.length;i++)
{
  bricks[i].show();
  if(ball.x>bricks[i].x &&
     ball.x<bricks[i].x+bricks[i].w &&
     ball.y>bricks[i].y &&
     ball.y<bricks[i].y+bricks[i].h)
     {
         bricks.splice(i,1)

         if(ball.x==bricks[i].x){ball.xspeed=-ball.xspeed}
         else{ball.yspeed=-ball.yspeed}


     }
}
}


//-----------------------------------------------------------------------------


function brick(x,y)
{
  this.x=x
  this.y=y
  this.w=40
  this.h=20
   this.show=function(){
  fill(255,100,100)
  rect(this.x,this.y,this.w,this.h)
}

}

function ball()
{
   this.x=width/2+40
   this.y=height/2+40
   this.r=20
   this.xspeed=-5
   this.yspeed=-5

   this.show=function()
   {
     fill(0,100,255)
     ellipse(this.x,this.y,this.r,this.r)
     this.x+=this.xspeed
     this.y+=this.yspeed
     if(this.x<0 || this.x>width)
     {
       ball.xspeed=-ball.xspeed
     }
     if(this.y<0)
     {
       ball.yspeed=-ball.yspeed
     }

     if(this.y>height)
     {this.x=random(0,width-20);this.y=height/2}
   }



}


function paddle()
{
this.x=width/2
this.y=height-20
this.width=100
this.height=20
this.show=function(){
fill(100,255,100)
rect(this.x,this.y,this.width,this.height)
this.x=constrain(this.x,0,width-this.width)
this.y=constrain(this.y,0,height-this.height)


}

this.check=function(ball)
{
  if(ball.x>this.x && ball.y>this.y && ball.y<this.y+this.height && ball.x<this.x+this.width)
  {

    ball.yspeed=-ball.yspeed
  }
}



}
