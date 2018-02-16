var count=0
var timeleft=120
function setup()
{
    noCanvas()
    var timer=document.getElementById('#timer')

   }

function draw(){
	if(timeleft-count>=0){
	timer.value=convert(timeleft-count)
}
else{timer.value='Time Expired !!'}
}


function convert(s)
{
	var params=getURLParams()
	if(params.min)
	{
       timeleft=params.min*60

	}



    if(timeleft-count<0){
    	return 'time expired'
    }



	if(timeleft>0){
	var mins=floor(s/60)
	var secs=s%60
	return nf(mins,2)+':'+nf(secs,2)}

}


function timerr()
{
	count++


}


setInterval(timerr,1000)
