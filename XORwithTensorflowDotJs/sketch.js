const model = tf.sequential();

function setup() {
  createCanvas(500, 500);
  model.add(tf.layers.dense({
    units: 10,
    inputShape: [2],
    activation: 'sigmoid'
  }))
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }))

  model.compile({
    optimizer: tf.train.sgd(0.1), //0.1 is the learning rate,
    loss: 'meanSquaredError'
  })
  train();
}

async function train() {

  const xs = tf.tensor2d([
    [0, 1],
    [1, 0],
    [1, 1],
    [0, 0],
  ])
  const ys = tf.tensor2d([
    [1],
    [1],
    [0],
    [0],
  ])
  for (var i = 0; i < 1000; i++) {
    const history = await model.fit(xs, ys, {
      epochs: 10,
      shuffle: true,
    });
    console.log(history.history.loss[0]);
  }
  xs.dispose();
  ys.dispose();
}

function predict(x_) {
  const xs = tf.tensor2d([x_]);
  const output = model.predict(xs).dataSync();
  xs.dispose();
  return output;
}

function draw() {
  background(0);
  let gap = 10;
  let cols = width / gap;
  let rows = height / gap;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      let output = predict(inputs);
      let color = output[0] * 255;
      fill(color);
      rect(i * gap, j * gap, gap, gap);
    }
  }
}
