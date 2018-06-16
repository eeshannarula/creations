let trainingImages;
let trainingLabels;
let testImages;
let testLabels;
let mnist = {};
let classifier;

function clearScreen() {
  background(0);
}

function preload() {
  trainingImages = loadBytes('mnist_data/training/images');
  trainingLabels = loadBytes('mnist_data/training/labels');
  testImages = loadBytes('mnist_data/testing/images');
  testLabels = loadBytes('mnist_data/testing/labels');
}

function prepareData() {
  mnist.trainingImages = trainingImages.bytes.slice(16, trainingImages.bytes.length);;
  mnist.trainingLabels = trainingLabels.bytes.slice(8, trainingLabels.bytes.length);;
  mnist.testImages = testImages.bytes.slice(16, testImages.bytes.length);
  mnist.testLabels = testLabels.bytes.slice(8, testLabels.bytes.length);
}

function setup() {
  createCanvas(400, 400).parent('#container');
  prepareData();
  background(0);
  classifier = jx.imageClassifier();
  classifier.setAll();
  classifier.addTrainingData(mnist.trainingImages, mnist.trainingLabels);
  classifier.addTestingData(mnist.testImages, mnist.testLabels);
  classifier.setInputShape([28, 28, 1]);
  classifier.setOutputUnits(10);
  classifier.setBatchSize(100);
  classifier.setOffset(784);
  classifier.compileModel();
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(40)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY);
    textSize(50)
  }
}

function predict() {
  let img = get();
  img.loadPixels();
  img.resize(28, 28);
  let inputs = [];
  for (var i = 0; i < 784; i++) {
    inputs[i] = img.pixels[i * 4] / 255;
  }
  console.log(classifier.predict(inputs));
}
