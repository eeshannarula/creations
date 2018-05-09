const len = 784;
let Dlib;
let data;
let guessButton;
let clearScreenButton;

function preload() {
  data = loadJSON('superMNIST2.json');
}

function guess() {
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  let inputs = [];
  for (var i = 0; i < len; i++) {
    let val = img.pixels[i * 4]
    inputs[i] = val / 255.0;
  }
  let guessArray = Dlib.predict(inputs);
  let m = max(guessArray);
  let classification = guessArray.indexOf(m);
  textSize(100);
  noStroke();
  fill(255,100,100);
  text(classification,width - 100,height - 100)
}


function clearScreen() {
  background(0);
}

function setup() {
  createCanvas(400, 400)//.parent('container');
  background(0);
  Dlib = Dlibs.deserialize(data);
  clearScreenButton = createButton('clearScreen')
  clearScreenButton.mousePressed(clearScreen);
  clearScreenButton.position(10,height+10);
  clearScreenButton.size(200,200)
  guessButton = createButton('guess');
  guessButton.position(220,height+10);
  guessButton.mousePressed(guess);
  guessButton.size(200,200)
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(30)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY);
    textSize(50)
  }
}
