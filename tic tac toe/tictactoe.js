var score = 1

function mouse(event) {
    event.target.setAttribute("disabled", "");
    console.log('clicked');
    nextmove(event);
    
    let parity = score % 2;

    event.target.value = ['x', 'o'][parity];
    event.target.style.color = ['blue', 'red'][parity];

    check()
}

function check() {
    let values = [
        form.btn1.value, form.btn2.value, form.btn3.value,
        form.btn4.value, form.btn5.value, form.btn6.value,
        form.btn7.value, form.btn8.value, form.btn9.value
    ]
    
    let conditions = [
    	[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8],
	[3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]
    ]
    
    function compare(arr, x, y, z) {
        return arr[x - 1] == arr[y - 1] == arr[z - 1];
    }
    
    for (let item in conditions) {
        if (compare(values, ...item)) {
	    alert('win');
	    location.reload();
	}
    }
}

function nextmove() {
    score++
}
