const len = 784;
const train_len = 47040000;
const test_len = 7840000;

let mnist = {};

let Dlib;

let trainButton;
let testButton;
let guessButton;
let clearScreenButton;

let learntTillNowPara;
let learntTillNow = '0%';

let trainedTillNow = 0;
let trainedTillNowPara;


let trainingImages;
let trainingLabels;

let testingImages;
let testingLabels;


function preload() {
  trainingImages = loadBytes('fashionMnistdata/train-images');
  trainingLabels = loadBytes('fashionMnistdata/train-labels');
  testingImages = loadBytes('fashionMnistdata/test-images');
  testingLabels = loadBytes('fashionMnistdata/test-labels');
}

function prepareData() {
  //images...
  mnist.trainingImages = trainingImages.bytes.slice(16, trainingImages.bytes.length);
  mnist.testingImages = testingImages.bytes.slice(16, testingImages.bytes.length);
  //labels...
  mnist.trainingLabels = trainingLabels.bytes.slice(8, trainingLabels.bytes.length);
  mnist.testingLabels = testingLabels.bytes.slice(8, testingLabels.bytes.length);
}

function setup() {
  Dlib = new Dlibs(len, 32, 10);
  createCanvas(400, 400);
  background(0);
  prepareData();
	manageButtonsAndParagraps();
	
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(16)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY);
    textSize(50)
  }
	learntTillNowPara.html('learntTillNow:'+learntTillNow+'%');
  trainedTillNowPara.html('epoches:'+trainedTillNow);
}
