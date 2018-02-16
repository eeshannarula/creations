var score=1
function mouse(event)
{
	event.target.setAttribute("disabled", "");
	console.log('clicked')
    nextmove(event)
    if(score%2==0)
    {event.target.value='x';
     event.target.style.color = "blue";
    }
    else
    {
	event.target.value='o';
	event.target.style.color = "red";
    }
    check()
}
function check(){

if(form.btn1.value==form.btn2.value && form.btn2.value==form.btn3.value){alert('win');location.reload()}
if(form.btn1.value==form.btn4.value && form.btn4.value==form.btn7.value){alert('win');location.reload()}
if(form.btn1.value==form.btn5.value && form.btn5.value==form.btn9.value){alert('win');location.reload()}
if(form.btn1.value==form.btn2.value && form.btn2.value==form.btn3.value){alert('win');location.reload()}
if(form.btn1.value==form.btn2.value && form.btn2.value==form.btn3.value){alert('win');location.reload()}
if(form.btn2.value==form.btn5.value && form.btn5.value==form.btn8.value){alert('win');location.reload()}
if(form.btn1.value==form.btn2.value && form.btn2.value==form.btn3.value){alert('win');location.reload()}
if(form.btn3.value==form.btn6.value && form.btn6.value==form.btn9.value){alert('win');location.reload()}
if(form.btn3.value==form.btn5.value && form.btn5.value==form.btn7.value){alert('win');location.reload()}
if(form.btn4.value==form.btn5.value && form.btn5.value==form.btn6.value){alert('win');location.reload()}
if(form.btn7.value==form.btn8.value && form.btn8.value==form.btn9.value){alert('win');location.reload()}

}
function nextmove()
{
score++
}
