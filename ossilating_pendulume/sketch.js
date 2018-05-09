let m1
let o;
let a1
let av1
let aa1
let m2
let a2
let av2
let aa2
let g
let len1
let len2
let x1
let y1
let x2
let y2

let trail = [];

function setup() {
  createCanvas(1600, 1200);
  o = createVector(width / 2, height/2 - 100);
	 m1 = 10;
	 o;
	 a1 = PI/2;
	 av1 = 0;
	 aa1 = 0;
	 m2 = 10;
	 a2 = 0;
	 av2 = 0;
	 aa2 = 0;
	g = 0.9;
	len1 = 200;
	len2 = 200;
	 x1 = 0;
	 y1 = 0;
	 x2 = 0;
	 y2 = 0;

}

function draw() {
  background(0);

	let num1 = -1 * g * (2 * m1 + m2) * sin(a1);
	let num2 = -1 * m2 * g * sin(a1 - 2 * a2);
	let num3 = -1 * 2 * sin(a1 - a2) * m2;
	let num4 = av2 * av2 * len2 + av1 * av1 * len1 * cos(a1 - a2);
	let dnom = len1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

	aa1 = (num1 + num2 + num3 * num4) / dnom;

	num1 =  2 * sin(a1 - a2);
	num2 =  (av1 * av1 * len1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + av2 * av2 * len2 * m2 * cos(a1 - a2));
  dnom =  len2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

	aa2 = (num1 * num2) / dnom;

  av1 += aa1;
  a1 += av1;
	av1 *= 1;
  aa1 *= 0;

  av2 += aa2;
  a2 += av2;
	av1 *= 1;
  aa2 *= 0;

  x1 = o.x + len1 * sin(a1);
  y1 = o.y + len1 * cos(a1);

  x2 = x1 + len2 * sin(a2);
  y2 = y1 + len2 * cos(a2);

  fill(255,100,100);
  stroke(255);
  line(o.x, o.y, x1, y1);
  ellipse(x1, y1, 20, 20);

  fill(255,100,100);
  stroke(255);
  line(x1, y1, x2, y2);
  ellipse(x2, y2, 20, 20);

	trail.push(createVector(x2,y2))

	for (var i = 0; i < trail.length-1; i++) {
		fill(255)
		stroke(255)
		if(trail.length > 10) {
		line(trail[i+1].x,trail[i+1].y,trail[i].x,trail[i].y);
	} else {
    point(trail[i].x,trail[i].y)
	}
	}
}
