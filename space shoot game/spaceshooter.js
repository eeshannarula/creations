//------------------------------------------------------
var x=130
var y=130
var w=15
var h=7
var y1=-10
var stones=[26,52,78,104,130,156,181,207,234,260]
var i=stones[Math.floor(Math.random()*stones.length)];
var i2=stones[Math.floor(Math.random()*stones.length)];
var i3=stones[Math.floor(Math.random()*stones.length)];
var i4=stones[Math.floor(Math.random()*stones.length)];
var i5=stones[Math.floor(Math.random()*stones.length)];
var i6=stones[Math.floor(Math.random()*stones.length)];
var i7=stones[Math.floor(Math.random()*stones.length)];
var i8=stones[Math.floor(Math.random()*stones.length)];
var i9=stones[Math.floor(Math.random()*stones.length)];
var i10=stones[Math.floor(Math.random()*stones.length)];
var i11=stones[Math.floor(Math.random()*stones.length)];
var i12=stones[Math.floor(Math.random()*stones.length)];
var y2=-50
var y3=-90
var y4=-120
var y5=-150
var y6=-180
var y7=-210
var y8=-240
var y9=-270
var y10=-300
var y11=-330
var y12=-360
var xx=x

var yy=-500
var hits=0
var score=0
var highscore=localStorage.getItem('highscore')
//-----------------------------------------------------
function draw()
{  
var btn=document.getElementById("btn")
var highscore1=document.getElementById('highscore1')
 if(window.localStorage){
    if(score>highscore){
    highscore=score
    localStorage.setItem('highscore',highscore)
    highscore1.value=localStorage.getItem('highscore')
}}
btn.value="score"+score
highscore1.value="highscore:"+localStorage.getItem('highscore')
if(yy<=-500){btn1.value="you can shootby pressing up button"}
else{btn1.value="wait for reloading"}
	var c=document.getElementById('canvas1')
	var ctx=c.getContext('2d')
	requestAnimationFrame(draw)
	
	ctx.clearRect(0,0,innerWidth,innerHeight)
    ctx.fillStyle='white'
    ctx.fillRect(x,y,w,h)
    ctx.fillRect(xx,yy,w,h)

    yy=yy-1
    stonefall()
check(x,i,y,y1)
check(x,i2,y,y2)
check(x,i3,y,y3)
check(x,i4,y,y4)
check(x,i5,y,y5)
check(x,i6,y,y6)
check(x,i7,y,y7)
check(x,i8,y,y8)
check(x,i9,y,y9)
check(x,i10,y,y10)
check(x,i11,y,y11)
check(x,i12,y,y12)
if(Math.sqrt((i-xx)*(i-xx)+(y1-yy)*(y1-yy))<=h)
{
   yy=-500
   

   if(y1>0)
   {
   score++
   }
   y1=-360
}

if(Math.sqrt((i2-xx)*(i2-xx)+(y2-yy)*(y2-yy))<=h)
{
   yy=-400
   
   if(y2>0)
   {
   score++
   }
   y2=-360
}

if(Math.sqrt((i3-xx)*(i3-xx)+(y3-yy)*(y3-yy))<=h)
{
   yy=-400
   
   if(y3>0)
   {
   score++
   }
   y3=-360
}
if(Math.sqrt((i4-xx)*(i4-xx)+(y4-yy)*(y4-yy))<=h)
{
   yy=-400
   
   if(y4>0)
   {
   score++
   }
   y4=-360
}
if(Math.sqrt((i5-xx)*(i5-xx)+(y5-yy)*(y5-yy))<=h)
{
   yy=-400
   
   if(y5>0)
   {
   score++
   }
   y5=-360
}

if(Math.sqrt((i6-xx)*(i6-xx)+(y6-yy)*(y6-yy))<=h)
{
   yy=-400
   
   if(y6>0)
   {
   score++
   }
   y6=-360
}

if(Math.sqrt((i7-xx)*(i7-xx)+(y7-yy)*(y7-yy))<=h)
{
   yy=-400
   
   if(y7>0)
   {
   score++
   }
   y7=-360
}
if(Math.sqrt((i8-xx)*(i8-xx)+(y8-yy)*(y8-yy))<=h)
{
   yy=-400
   
   if(y8>0)
   {
   score++
   }
   y8=-360
}
if(Math.sqrt((i9-xx)*(i9-xx)+(y9-yy)*(y9-yy))<=h)
{
   yy=-400
   
   if(y9>0)
   {
   score++
   }
   y9=-360
}

if(Math.sqrt((i10-xx)*(i10-xx)+(y10-yy)*(y10-yy))<=h)
{
   yy=-400
   
   if(y10>0)
   {
   score++
   }
   y10=-360
}

if(Math.sqrt((i11-xx)*(i11-xx)+(y11-yy)*(y11-yy))<=h)
{
   yy=-400
   
   if(y11>0)
   {
   score++
   }
   y11=-360
}
if(Math.sqrt((i12-xx)*(i12-xx)+(y12-yy)*(y12-yy))<=h)
{
   yy=-400
   
   if(y12>0)
   {
   score++
   }
   y12=-360
}

if(x>260){x=260}
if(x<26){x=26}
}






//---------------------------------------------------
function move(event)
{
    if(event.keyCode==37)
    {
    x=x-26
    }
 
    if(event.keyCode==39 )
    {
    x=x+26
    }
    if(event.keyCode==13)
    {
    draw()
    }

    if(event.keyCode==38)
    {
    	if(yy<=-500)
    	{
    fire()
        }
    }
 
}//-----------------------------------------------------
function stonefall()
{   

	
	var c=document.getElementById('canvas1')
	var ctx=c.getContext('2d')
	ctx.fillStyle='red'
	ctx.fillRect(i,y1,w,h) ; 
	y1++
	ctx.fillRect(i2,y2,w,h) ;
	y2++
	ctx.fillRect(i3,y3,w,h) ;
	y3++
	ctx.fillRect(i4,y4,w,h);
	y4++
	ctx.fillRect(i5,y5,w,h);
	y5++
	ctx.fillRect(i6,y6,w,h);
	y6++
	ctx.fillRect(i7,y7,w,h);
	y7++
	ctx.fillRect(i8,y8,w,h);
	y8++
	ctx.fillRect(i9,y9,w,h);
	y9++
	ctx.fillRect(i10,y10,w,h);
	y10++
	ctx.fillRect(i11,y11,w,h);
	y11++
	ctx.fillRect(i12,y12,w,h);
	y12++

    if(y1>150)
	{
		y1=-360
       // i=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y2>150)
	{
		y2=-360
       // i2=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y3>150)
	{
		y3=-360
        //i3=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y4>150)
	{
		y4=-360
        i4=stones[Math.floor(Math.random()*stones.length)];
	}

	 if(y5>150)
	{
		y5=-360
        i5=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y6>150)
	{
		y6=-360
        i6=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y7>150)
	{
		y7=-360
        i7=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y8>150)
	{
		y9=-360
        i9=stones[Math.floor(Math.random()*stones.length)];
	}

	if(y10>150)
	{
		y10=-360
        i10=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y11>150)
	{
		y11=-360
        i11=stones[Math.floor(Math.random()*stones.length)];
	}
	if(y12>150)
	{
		y12=-360
        i12=stones[Math.floor(Math.random()*stones.length)];
	}
}	

function fire()
{ 
  yy=y 
  xx=x
 
}


function check(xn1,xn2,yn1,yn2)
{
if(Math.sqrt((xn2-xn1)*(xn2-xn1)+(yn2-yn1)*(yn2-yn1)<=h))
{
location.reload()	
}
}
