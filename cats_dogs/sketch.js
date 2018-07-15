const CATS_training_URL = 'catsdogs/training_set/cats';
const DOGS_training_URL = 'catsdogs/training_set/dogs';
const CATS_testing_URL = 'catsdogs/test_set/cats';
const DOGS_testing_URL = 'catsdogs/test_set/dogs';

const data = {};
let classifier;
let model;

async function getData() {
  data.CATS_TRAINING = await classifier.loadImages(CATS_training_URL, '.jpg');
  data.CATS_TESTING = await classifier.loadImages(CATS_testing_URL, '.jpg');
  data.DOGS_TRAINING = await classifier.loadImages(DOGS_training_URL, '.jpg');
  data.DOGS_TESTING = await classifier.loadImages(DOGS_testing_URL, '.jpg');
}

function setPixelArrays() {
  data.CATS_TRAINING = classifier.reshape(data.CATS_TRAINING, 0);
  data.CATS_TESTING = classifier.reshape(data.CATS_TESTING, 0);
  data.DOGS_TRAINING = classifier.reshape(data.DOGS_TRAINING, 1);
  data.DOGS_TESTING = classifier.reshape(data.DOGS_TESTING, 1);

  classifier.addTrainingData(data.CATS_TRAINING, 0);
  classifier.addTrainingData(data.DOGS_TRAINING, 1);

  classifier.addTestingData(data.CATS_TESTING, 0);
  classifier.addTestingData(data.DOGS_TESTING, 1);

  classifier.data.traininglabels = classifier.makeTargets(classifier.data.trainingdata);
  classifier.data.testinglabels = classifier.makeTargets(classifier.data.testingdata);

}

function setup() {
  createCanvas(600, 600);
  classifier = jx.imageClassifier(2);

  model = tf.sequential();

  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 5,
    filters: 8,
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
    filters: 16,
    strides: 1,
    activation: 'relu',
  }))


  model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
  }));


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

const test = () => {
  let count = 0;
  tf.tidy(() => {
    for (let img of classifier.data.testingdata) {
      let label = img.label;
      const xs = tf.tensor2d(img, [1, 784]);
      const reshaped = xs.reshape([1, 28, 28, 1]);
      const prediction = classifier.maxNum(model.predict(reshaped).dataSync());
      // check if the answer is Correct
      if (prediction == label) {
        count++;
      }
    }
  })
  console.log((count / 2000) * 100 + '%');
}

const train = async () => {
  for (var i = 0; i < classifier.data.trainingdata.length; i += 100) {
    let batch = classifier.makeBatch(classifier.data.trainingdata, classifier.data.traininglabels, 100, i);
    let data = batch.data;
    let labels = batch.targets;
    const xs = tf.tensor2d(data, [100, 784]);
    const ys = tf.tensor2d(labels, [100, 2]);
    const reshaped = xs.reshape([100, 28, 28, 1]);
    const resultent = await model.fit(reshaped, ys, {
      epochs: 10,
      shuffle: true
    })
    xs.dispose();
    ys.dispose();
    reshaped.dispose();
    console.log('loss:' + resultent.history.loss[0]);
  }
}

const predict = () => {
  tf.tidy(() => {
    let img = get();
    let inputs = ImageClassifier.reshape(img);
    const xs = tf.tensor2d(inputs, [1, 784]);
    const reshaped = xs.reshape([1, 28, 28, 1]);
    const prediction = classifier.maxNum(model.predict(reshaped).dataSync());
    if (prediction == 0) {
      console.log('cat')
    } else {
      console.log('dog')
    }
  })
}
