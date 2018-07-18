const EXT = '.jpg';
const ROSES_URL = 'flowers/rose';
const SUNFLOWER_URL = 'flowers/sunflower';

const size = 50;
const greySize = size * size;
const rgbaSize = greySize * 4;
let data = {};
let classifier;

let model;

function setup() {
  createCanvas(500, 500);
  classifier = jx.imageClassifier(2);

  model = tf.sequential();

  model.add(tf.layers.conv2d({
    inputShape: [size, size, 1],
    kernelSize: 5,
    filters: 32,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'VarianceScaling'
  }))

  model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
  }));

  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 32,
    strides: 1,
    activation: 'relu',
  }))


  model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
  }));

  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
  }))


  model.add(tf.layers.flatten());

  model.add(tf.layers.dense({
    units: 10,
    activation: 'relu'
  }));

  model.add(tf.layers.dropout({
    rate: 0.2,
  }));

  model.add(tf.layers.dense({
    units: 2,
    activation: 'softmax',
  }));

  const LEARNINIG_RATE = 0.0001;
  const optimizer = tf.train.adam(LEARNINIG_RATE);

  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
  });
}

async function getData() {
  data.roses = await classifier.loadImages(ROSES_URL, EXT);
  data.sunflowers = await classifier.loadImages(SUNFLOWER_URL, EXT);
}

function setPixels() {
  data.rosesPixels = classifier.reshape(data.roses, 0);
  data.sunflowerPixels = classifier.reshape(data.sunflowers, 1);
  classifier.divideData(data.rosesPixels, 700);
  classifier.divideData(data.sunflowerPixels, 700);
  classifier.addlabels();
}

function draw() {
  background(51);
}

function test() {
  let count = 0;
  tf.tidy(() => {
    for (let img of classifier.data.testingdata) {
      let label = img.label;
      let xs = tf.tensor2d(img, [1, greySize]);
      let reshaped = xs.reshape([1, size, size, 1]);
      let prediction = classifier.maxNum(model.predict(reshaped).dataSync());
      if (prediction === label) {
        count++
      }
    }
    console.log((count / classifier.data.testingdata.length) * 100 + '%');
  })
}

async function train() {
  for (var i = 0; i < classifier.data.trainingdata.length; i += 100) {
    let batch = classifier.makeBatch(classifier.data.trainingdata, classifier.data.traininglabels, 100, i);
    const data = batch.data;
    const targets = batch.targets;
    const xs = tf.tensor2d(data, [100, greySize]);
    const ys = tf.tensor2d(targets, [100, 2]);
    const reshaped = xs.reshape([100, size, size, 1]);
    const result = await model.fit(reshaped, ys, {
      epochs: 20,
      shuffle: true
    });
    console.log(result.history.loss[0]);
    xs.dispose();
    ys.dispose();
    reshaped.dispose();
  }
}

function predict() {
  tf.tidy(() => {
    let img = get();
    img.resize(size, size);
    img.loadPixels();
    let inputs = ImageClassifier.reshape(img.pixels);
    const xs = tf.tensor4d(inputs, [1, size, size, 1]);
    const prediction = classifier.maxNum(model.predict(xs).dataSync());
    console.log(prediction);
  })
}
