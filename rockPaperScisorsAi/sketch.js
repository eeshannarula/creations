let nn;
let ply = '';
let com = '';
let play;
let testB;
let trainB;
let isPlay = false;
let realC = 0;
let correctness = '0%';

function setup() {
  createCanvas(600, 600).parent('#container');
  nn = new Dlibs(3, 10, 3);
  manageButtonsAndParas();
}


function draw() {
  test();
  if (frameCount % 200 == 0) {
    if (realC < 100) {
      train(10);
    }
  }
  background(0);
  textSize(50)
  fill(255, 100, 100);
  text(correctness + 'correct', width - 350, height - 50)
  ellipse(width / 2 - 200, height / 2, 200);
  ellipse(width / 2 + 200, height / 2, 200);
  text('vs', width / 2 - 10, height / 2);
  text(ply, width / 2 - 200, height / 2);
  text(com, width / 2 + 200, height / 2);


}

function manageButtonsAndParas() {
  play = createButton('PLAY').parent('#buttons');
  trainB = createButton('TRAIN').parent('#buttons');
  testB = createButton('TEST').parent('#buttons');

  testB.mousePressed(test);
  trainB.mousePressed(function () {
    let v = document.getElementById('epochs').value * 1;
    train(v);
  });
  play.mousePressed(() => {
    let value = document.getElementById('turn').value * 1;
    let array = [0, 0, 0];
    array[value] = 1;
    let output = nn.predict(array);
    let m = output.indexOf(max(output));
    ply = getEmoji(value);
    com = getEmoji(m);
    // seeWin(value, m);
  });
}

function getEmoji(val) {
  switch (val) {
    case 0:
      return emojis.stone;
      break;
    case 1:
      return emojis.paper;
      break;
    case 2:
      return emojis.scisor;
      break;
  }
}
