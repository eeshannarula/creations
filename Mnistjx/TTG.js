function manageButtonsAndParagraps() {

  trainButton = createButton('train');
  testButton = createButton('test');
  guessButton = createButton('guess');
  clearScreenButton = createButton('clearScreen');

  learntTillNowPara = createP('learntTillNow:' + learntTillNow);
  learntTillNowPara.position(250, height + 0);

  trainedTillNowPara = createP('epoches:' + trainedTillNow);
  trainedTillNowPara.position(250, height + 20);

  trainButton.mousePressed(think);
  testButton.mousePressed(test);
  guessButton.mousePressed(guess);
  clearScreenButton.mousePressed(clearScreen);

  trainButton.size(100, 100);
  testButton.size(100, 100);
  guessButton.size(100, 100);
  clearScreenButton.size(100, 100);

  trainButton.position(0, height + 0);
  testButton.position(100, height + 0);
  guessButton.position(0, height + 100);
  clearScreenButton.position(100, height + 100);


}

function clearScreen() {
  background(0);
}

function think() {
  trainedTillNow++;
  for (var i = 0; i < train_len; i += len) {
    let inputs = [];
    let lable_index = i / len;
    let lable = mnist.trainingLabels[lable_index];
    for (var j = 0; j < len; j++) {
      inputs[j] = mnist.trainingImages[j + i] / 255.0;
    }
    let targets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    targets[lable] = 1;
    Dlib.train(inputs, targets);
  }
}

function test() {
  let counter = 0;
  for (var i = 0; i < test_len; i += len) {
    let inputs = [];
    let lable_index = i / len;
    let lable = mnist.testLabels[lable_index];

    for (var j = 0; j < len; j++) {
      inputs[j] = mnist.testImages[j + i] / 255.0;
    }

    let outputs_array = Dlib.predict(inputs);
    let guess = outputs_array.indexOf(max(outputs_array));

    if (guess === lable) {
      counter++;
    }
  }
  let percentage = round((counter / (test_len / len)) * 100);
  learntTillNow = percentage;
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
  fill(255, 100, 100);
  text(classification, width - 100, height - 100)
}

function drawDigits() {
  let img = createImage(28, 28);
  img.loadPixels();
  for (var i = 0; i < len; i++) {
    let val = mnist.trainingImages[i + index];
    img.pixels[i * 4 + 0] = val;
    img.pixels[i * 4 + 1] = val;
    img.pixels[i * 4 + 2] = val;
    img.pixels[i * 4 + 3] = 255;
  }
  img.updatePixels();
  image(img, 0, 0, width / 2, height / 2)
  index += len;
}
