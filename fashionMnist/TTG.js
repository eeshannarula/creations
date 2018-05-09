function think() {
  trainedTillNow++;
  for (var i = 0; i < train_len; i += len) {
    let inputs = [];
    let lable_index = i / len;
    let lable = mnist.trainingLabels[lable_index];
    for (var j = 0; j < len; j++) {
      inputs[j] = mnist.trainingImages[i + j] / 255.0;
    }
    let targets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    targets[lable] = 1;
    Dlib.train(inputs, targets);
  }
}

function manageButtonsAndParagraps() {

  trainButton = createButton('train');
  testButton = createButton('test');
  guessButton = createButton('guess');
  clearScreenButton = createButton('clearScreen');

  learntTillNowPara = createP('learntTillNow:'+learntTillNow);
  learntTillNowPara.position(250, height + 0);

  trainedTillNowPara = createP('epoches:'+trainedTillNow);
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


function test() {
  let counter = 0;
  for (var i = 0; i < test_len; i += len) {
    let inputs = [];
    let label_index = i / len;
    let lable = mnist.testingLabels[label_index];
    for (var j = 0; j < len; j++) {
      inputs[j] = mnist.testingImages[i + j] / 255.0;
    }
    let guess_array = Dlib.predict(inputs);
    let classification = guess_array.indexOf(max(guess_array));

    if (classification === lable) {
      counter++;
    }
  }
  let percentage = (counter / (test_len / len)) * 100;
  learntTillNow = percentage;
}

function clearScreen() {
  background(0);
}
/* LABELS...
 *0 T-shirt/top
 *1 Trouser
 *2 Pullover
 *3 Dress
 *4 Coat
 *5 Sandal
 *6 Shirt
 *7 Sneaker
 *8 Bag
 *9 Ankle boot
 */

function tell(n) {
  switch (n) {
    case 0:
      return 'T-shirt/top';
      break;
    case 1:
      return 'Trouser';
      break;
    case 2:
      return 'Pullover';
      break;
    case 3:
      return 'Dress';
      break;
    case 4:
      return 'Coat';
      break;
    case 5:
      return 'Sandal';
      break;
    case 6:
      return 'Shirt';
      break;
    case 7:
      return 'Sneaker';
      break;
    case 8:
      return 'Bag';
      break;
    case 9:
      return 'Ankle boot';
      break;
    default:
      return 'sorry'
  }
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
  let prediction = tell(classification);
  textSize(20);
  //noStroke();
  fill(255, 100, 100);
  text(prediction, width - 100, height - 100)
}


let i = 0;

function drawMnist() {
  let img = createImage(28, 28);
  img.loadPixels();
  for (var j = 0; j < len; j++) {
    let val = mnist.trainingImages[i + j];
    img.pixels[4 * j + 0] = val;
    img.pixels[4 * j + 1] = val;
    img.pixels[4 * j + 2] = val;
    img.pixels[4 * j + 3] = 255;
  }
  img.updatePixels();
  image(img, width / 2, 0, width / 2, height / 2)
  i += len;
  if (i > train_len) {
    i = 0;
  }
}
