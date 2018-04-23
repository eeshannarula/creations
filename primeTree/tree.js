function DrawTree(m) {
  background(51);
  let done = false;
  let moves = 0;
  stroke(255);
  fill(255);
  textSize(20)

  let x = 100;
  let y = 100;
  let a = 60;
  let a_ = -10;
  push();
  strokeWeight(4);
  line(x + 10, y + 15, x + a_ + 10, y + a - 25)
  line(x + 15, y + 15, x + a_ + 50, y + a - 20)
  pop();
  push()
  noFill()

  ellipse(x + 17, y - 5, 40, 40)
  pop()
  text(m, x, y);
  while (!done) {
    let pm = m;
    let last = false;
    let factorization = takeoutPrime(m);
    m = factorization.a;
    if (m == -Infinity) {
      m = pm;
      factorization.f = m;
      factorization.a = 1;
      factorization.b = m;
      done = true;
      last = true;
    }

    //console.log(factorization.b + '|' + factorization.f + '--' + factorization.a);
    moves++;

    //text(factorization.b + '|' + factorization.f + '--' + factorization.a,100,moves*20+400)
    text(factorization.b + '        ' + factorization.a, x + a_, y + a);
    push();
    if (!last) {
      strokeWeight(4);
      line(x + a_ + 60, y + a + 10, (x + a_ - 5) + 50, (y + a - 5) + 40)
      line(x + a_ + 60, y + a + 10, (x + a_ + 50) + 50, (y + a - 20) + 50)
    }
    pop();
    push()
    noFill();
    ellipse(x + a_ + 8, y + a - 5, 40, 40);
    ellipse(x + a_ + 10 + 60, y + a - 8, 40, 40);

    pop()
    //text(factorization.a,x+a,y+a);
    a += 60;
    a_ += 40;



  }
}

function takeoutPrime(n) {
  let factorsA = [];
  let factorsB = [];
  let m = 0;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i * j == n) {
        factorsA.push(i);
        factorsB.push(j);
      }
    }
  }

  m = max(factorsA);
  let nn = min(factorsB);

  let f = {
    f: n,
    a: m,
    b: nn,
  }

  return f;

}
