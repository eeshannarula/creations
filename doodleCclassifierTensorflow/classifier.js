class Classifier {
  constructor(dataClass) {
    this.data = dataClass;
    this.model = tf.sequential();

    this.model.add(tf.layers.conv2d({
      inputShape: [28, 28, 1],
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling'
    }))

    this.model.add(tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2]
    }));

    this.model.add(tf.layers.conv2d({
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling'
    }));

    this.model.add(tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2]
    }));

    this.model.add(tf.layers.flatten());

    this.model.add(tf.layers.dense({
      units: 3,
      kernelInitializer: 'VarianceScaling',
      activation: 'softmax'
    }));

    const LEARNING_RATE = 0.15;
    const optimizer = tf.train.sgd(LEARNING_RATE);

    this.model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  }
  async train() {
    let loss;
    for (var i = 0; i < data_len; i += BATCH_SIZE) {
      let batch = this.data.makeBatch(i, BATCH_SIZE);
      let data = batch.data;
      let targets = batch.targets;
      const xs = tf.tensor2d(data, [100, 784]);
      // xs.reshape([BATCH_SIZE, 28, 28, 1]) tensor4d sehapes
      const ys = tf.tensor2d(targets, [100, 3]);
      for (var j = 0; j < 100; j++) {
        const history = await this.model.fit(xs.reshape([BATCH_SIZE, 28, 28, 1]), ys, {
          epochs: 10,
          shuffle: true
        });
        loss = history.history.loss[0];
      }
      xs.dispose();
      ys.dispose();

      console.log('loss:' + loss)
    }
  }
  test() {
    // for (var i = 0; i < this.data.testingImages.length; i += BATCH_SIZE) {
    //   let batch = this.data.makeBatch(i, BATCH_SIZE);
    //   let data = batch.data;
    //   let targets = batch.targets;
    //   const xs = tf.tensor2d(data, [100, 784]);
    //   const ys = tf.tensor2d(targets, [100, 3]);
    //   xs.dispose();
    //   ys.dispose();
    // }
    // let batch = this.data.makeTestingBatch
  }
}
