async function loadMobilenet() {
  const mn = await tf.loadModel(
    'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

  const layer = mn.getLayer('conv_pw_13_relu');
  mobilenet = tf.model({
    inputs: mn.inputs,
    outputs: layer.output
  });
}

async function train() {
  if (controllerDataset.xs == null) {
    throw new Error('Add some examples before training!');
  }
  // Creates a 2-layer fully connected model. By creating a separate model,
  // rather than adding layers to the mobilenet model, we "freeze" the weights
  // of the mobilenet model, and only train weights from the new model.
  model = tf.sequential({
    layers: [
      // Flattens the input to a vector so we can use it in a dense layer. While
      // technically a layer, this only performs a reshape (and has no training
      // parameters).
      tf.layers.flatten({
        inputShape: [7, 7, 256]
      }),
      // Layer 1
      tf.layers.dense({
        units: manager.getDenseUnits(),
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
        useBias: true
      }),
      // Layer 2. The number of units of the last layer should correspond
      // to the number of classes we want to predict.
      tf.layers.dense({
        units: NUM_CLASSES,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: 'softmax'
      })
    ]
  });

  // Creates the optimizers which drives training of the model.
  const optimizer = tf.train.adam(manager.getLearningRate());
  // We use categoricalCrossentropy which is the loss function we use for
  // categorical classification which measures the error between our predicted
  // probability distribution over classes (probability that an input is of each
  // class), versus the label (100% probability in the true class)>
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy'
  });

  // We parameterize batch size as a fraction of the entire dataset because the
  // number of examples that are collected depends on how many examples the user
  // collects. This allows us to have a flexible batch size.
  const batchSize =
    Math.floor(controllerDataset.xs.shape[0] * manager.getBatchSizeFraction());
  if (!(batchSize > 0)) {
    throw new Error(
      `Batch size is 0 or NaN. Please choose a non-zero fraction.`);
  }

  // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
  model.fit(controllerDataset.xs, controllerDataset.ys, {
    batchSize,
    epochs: manager.getEpochs(),
  });
  console.log('done')
}

async function predict() {
  const predictClass = tf.tidy(() => {
    if (isPredicting) {
      const img = webcam.capture();
      const activation = mobilenet.predict(img);
      const prediction = model.predict(activation);
      return prediction.as1D().argMax();
    }
  })
  const ClassId = (await predictClass.data())[0];
  predictClass.dispose();
  manager.tellClass(ClassId);
  await tf.nextFrame();
}
