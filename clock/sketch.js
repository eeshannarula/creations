var m;
var h;
var clock
function setup()
{
  createCanvas(500,500)
//rotate(-90)
angleMode(DEGREES)

}

function draw()
  {
    background(0)
    translate(250,250)
   rotate(-90)
let s=second()
let m=minute()
let h=hour()
angleMode(DEGREES)
let sn=map(s,0,60,0,360)
let mn=map(m,0,60,0,360)
let hn=map(h%12,0,12,0,360)
push()

rotate(hn)
stroke(200,255,0)
line(0,0,80,0)
pop()


stroke(0,200,200)
strokeWeight(10)
noFill()
arc(0,0,220,220,0,mn)

stroke(255,100,100)
strokeWeight(4)
noFill()
arc(0,0,200,200,0,sn)
stroke(200,255,0)
strokeWeight(8)
noFill()
arc(0,0,260,260,0,hn)


push()
rotate(mn)
stroke(0,200,200)
line(0,0,60,0)
pop()
push()
rotate(sn)
stroke(255,100,100)
line(0,0,40,0)
pop()
stroke(255)
ellipse(0,0,5,5)


  }
