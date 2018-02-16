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
