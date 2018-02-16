var p1=[]
var b;
var p2=[]
var p3=[]
var base=[]
var balls=[]
var p;
var l;
var l2;
var l3;
var total=1;
var onground=true;
function setup(){

createCanvas(600,600)
b=new ball(15,20)
p=new runner()
l=new ladder(470,570,470,470)
l2=new ladder(300,440,300,270)
l3=new ladder(470,245,470,160)
b.addforce(b.wind)
b.addforce(b.wind)

for(var i=0;i<1000;i++)
{
  balls[i]=new ball(15,20);
}
for(var i=0;i<balls.length;i++)
{
  balls[i].addforce(b.wind)
  balls[i].addforce(b.wind)

}

for(var i=0;i<(width-80)/20;i++){

p1[i]=new platform(i*20,i*5+50)


}
for(var i=0;i<(width-80)/20;i++)
{

p2[i]=new platform(i*20+100,i*-5+330)


}
for(var i=0;i<(width-80)/20;i++){

p3[i]=new platform(i*20,i*5+360)


}
for(var i=0;i<width/20;i++){

base[i]=new platform(i*20,570)


}



}

function draw(){

background(51)
if(frameCount%200==0){total++}

l.show()
l.update(p)
l2.show()
l2.update(p)
l3.show()
l3.update(p)
p.show()
p.update()
p.addforce(p.gravity)
for(var i=0;i<total;i++)
{
  balls[i].show()
  balls[i].update()
  balls[i].addforce(b.gravity)
  balls[i].check(p)
}

b.show()
b.update()
b.addforce(b.gravity)
b.check(p)
for(var i=0;i<p1.length;i++){
  p1[i].show()
  p1[i].hitball(b)
  p1[i].hitball(p)
  p1[i].hitcheck(p)
  for(var j=0;j<balls.length;j++)
  {
    p1[i].hitball(balls[j])

  }


}
for(var i=0;i<p2.length;i++){
  p2[i].show()
  p2[i].hitball(b)
p2[i].hitball(p)
if(p2[i].hitball(p)==true){g=true}else{g=false}
for(var j=0;j<balls.length;j++)
{
  p2[i].hitball(balls[j])

}
}
for(var i=0;i<p3.length;i++){
  p3[i].show()
  p3[i].hitball(b)
  p3[i].hitball(p)
  if(p3[i].hitball(p)==true){g=true}else{g=false}
  for(var j=0;j<balls.length;j++)
  {
    p3[i].hitball(balls[j])

  }
}
for(var i=0;i<base.length;i++){
  base[i].show()
  base[i].hitball(b)
  base[i].hitball(p)
 if(base[i].hitball(p)==true){g=true}else{g=false}
 for(var j=0;j<balls.length;j++)
 {
  base[i].hitball(balls[j])

 }
}



}
function keyPressed()
{
  if(keyCode===13)
  {
  total++

  }

  if(keyCode===37)
  {
  p.addforce(p.left)

  }
  if(keyCode===38)
  {
  // if(onground==true){
  p.addforce(p.jump)}

  // }
  if(keyCode===39)
  {
  p.addforce(p.right)

  }


}

function ladder(x,y,x2,y2)
{

this.x=x;
this.y=y;
this.x2=x2
this.y2=y2


   this.show=function()
   {
push()
stroke(100,255,100)
strokeWeight(4)
ellipse(this.x,this.y,20,20)
ellipse(this.x2,this.y2,20,20)
line(this.x,this.y,this.x2,this.y2)
pop()
   }

   this.update=function(p)
   {
       if(dist(p.loc.x,p.loc.y,this.x,this.y)<=10)
       {
         p.loc.x=this.x2
         p.loc.y=this.y2
       }
   }




}
function platform(x,y){

this.x=x;
this.y=y;
this.side=20

//this.side=20


this.update=function(){


}

this.show=function(){

  fill(255)
  rect(this.x,this.y,this.side,this.side)

}

this.hitball=function(ball)
{
  if(ball.loc.x>this.x && ball.loc.x<this.x+this.side &&
     ball.loc.y>this.y && ball.loc.y<this.y+this.side)
     {
       ball.vil.y*=-1
       ball.loc.y=this.y



     }




}

this.hitcheck=function(ball)
{
  if(ball.loc.x>this.x && ball.loc.x<this.x+this.side &&
     ball.loc.y>this.y && ball.loc.y<this.y+this.side)
    {onground=true}
else{onground=false}




}

}
function runner()
{
  this.loc=createVector(15,540)
  this.vil=createVector(0,0)
  this.acc=createVector(0,0)
  this.gravity=createVector(0,1)
  this.right=createVector(1,0)
  this.left=createVector(-1,0)
  this.jump=createVector(0,-10)


  this.friction;
  this.r=15



  this.update=function(){
    this.friction=this.vil.copy()
    this.friction.normalize()
    this.friction.mult(-0.05)
  this.vil.add(this.acc)
  this.loc.add(this.vil)
  this.acc.mult(0)
  this.acc.add(this.friction)

  if(this.loc.x>width || this.loc.x<0)
  {
    this.vil.x*=-1
  }
  }

  this.show=function(){

  fill(100,255,100)
  ellipse(this.loc.x,this.loc.y,this.r,this.r)



  }

  this.addforce=function(f)
  {
    this.acc.add(f)
  }
}
function ball(x,y){

this.loc=createVector(x,y)
this.vil=createVector(0,0)
this.acc=createVector(0,0)
this.gravity=createVector(0,1)
this.wind=createVector(0.5,0)
this.friction;
this.r=15



this.update=function(){
  this.friction=this.vil.copy()
  this.friction.normalize()
  this.friction.mult(-0.0000000001)
this.vil.add(this.acc)
this.loc.add(this.vil)
this.acc.mult(0)
this.acc.add(this.friction)

if(this.loc.x>width || this.loc.x<0)
{
  this.vil.x*=-1
}
}

this.show=function(){
fill(255,100,0)
ellipse(this.loc.x,this.loc.y,this.r,this.r)



}

this.addforce=function(f)
{
  this.acc.add(f)
}

this.check=function(p)
{
  var d=dist(p.loc.x,p.loc.y,this.loc.x,this.loc.y)
  if(d<this.r/2+p.r/2){
  location.reload()
  }
}



}
