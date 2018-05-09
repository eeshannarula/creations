const len = 784;
const train_len = 47040000;
const test_len = 7840000;

let trainingImages;
let trainingLabels;
let testImages;
let testLabels;

let trainButton;
let testButton;
let guessButton;
let clearScreenButton;

let learntTillNowPara;
let learntTillNow = '0%';

let trainedTillNow = 0;
let trainedTillNowPara;

let Dlib;

let index = 0;

let mnist = {};

function preload() {

  trainingImages = loadBytes('mnist_data/training/images');
  trainingLabels = loadBytes('mnist_data/training/labels');

  testImages = loadBytes('mnist_data/testing/images');
  testLabels = loadBytes('mnist_data/testing/labels');

}

function setup() {
  createCanvas(400, 400);
  Dlib = new Dlibs(784, 16, 10);
  manageButtonsAndParagraps();
  prepareData();
  background(0);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(40)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY);
    textSize(50)
  }
  learntTillNowPara.html('learntTillNow:'+learntTillNow+'%');
  trainedTillNowPara.html('epoches:'+trainedTillNow);
}
