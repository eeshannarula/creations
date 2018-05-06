/*
AUTHOR : EESHAN NARULA
GITHUB : https://github.com/eeshannarula/foldDlib.git
*/

//activation_function class...
class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}
//some activation functions...
let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);
//the flowdlib NeuralNetwork class...
class NeuralNetwork {
  constructor(x, y, z) {
    this.input_nodes = x;

    this.hidden_nodes = y[0];
    this.hidden_layers = y[1];

    this.output_nodes = z;

    this.layers = [];
    this.bias_h = [];

    this.layers[0] = new Matrix(this.hidden_nodes, this.input_nodes);
    this.bias_h[0] = new Matrix(this.hidden_nodes, 1);
    this.layers[0].randomize();

    for (var i = 0; i < this.hidden_layers - 1; i++) {

      let m = new Matrix(this.hidden_nodes, this.hidden_nodes);
      let b = new Matrix(this.hidden_nodes, 1);

      m.randomize();
      b.randomize();

      this.layers.push(m);
      this.bias_h.push(b);
    }
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ho.randomize();

    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_o.randomize();

    this.setLearningRate();
    this.setActivationFunction();
  }
  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }
  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }
  predict(input_array) {
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.layers[0], inputs);
    hidden.add(this.bias_h[0]);
    // activation function!
    hidden.map(this.activation_function.func);

    for (var i = 1; i < this.layers.length; i++) {
      let c = Matrix.multiply(this.layers[i], hidden);
      c.add(this.bias_h[i]);
      c.map(this.activation_function.func);
      hidden = c;
    }

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    // Sending back to the caller!
    return output.toArray();
  }
  train(input_array, target_array) {
    //array to store hidden layers results...
    let results = [];
    //all the inputs...
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.layers[0], inputs);
    hidden.add(this.bias_h[0]);
    // activation function!
    hidden.map(this.activation_function.func);
    //push hidden into the results...
    results.push(hidden);
    //pass the inputs through all the layers...
    for (var i = 1; i < this.layers.length; i++) {
      let c = Matrix.multiply(this.layers[i], hidden);
      c.add(this.bias_h[i]);
      c.map(this.activation_function.func);
      results.push(c);
      hidden = c;
    }

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, output);

    // let gradient = output * (1 - output);
    // Calculate gradient
    let gradients = Matrix.map(output, this.activation_function.dfunc);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);

    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    let index = this.layers.length - 1;
    // delta weights...
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, hidden_T);
    //adjusting the last hidden layer...
    this.layers[index].add(weight_ih_deltas);
    this.bias_h[index].add(hidden_gradient);
    //_________________________________________________________________
    // UNDER CONSTRUCTION...!!
    // for more than two layers...
    for (var i = index - 1; i >= 1; i--) {
      let transposed_layer = Matrix.transpose(this.layers[i + 1]);
      let Berror = Matrix.multiply(transposed_layer, hidden_errors);

      let g = Matrix.map(results[i + 1], this.activation_function.dfunc);
      g.multiply(Berror);
      g.multiply(this.learning_rate);

      let transpose_hidden = Matrix.transpose(results[i + 1]);
      let weight_deltas = Matrix.multiply(g, transpose_hidden);
      this.layers[i].add(weight_deltas);
      this.bias_h[i].add(g);
    }
    //_________________________________________________________________

    let trans_l = null;
    let Terror = null;
    // when there are more than 1 layers of hidden...
    if (this.layers[1]) {
      trans_l = Matrix.transpose(this.layers[1]);
      Terror = Matrix.multiply(trans_l, hidden_errors);
      //input => first layer of hidden gradient...
      let gradient_input = Matrix.map(results[0], this.activation_function.dfunc);
      gradient_input.multiply(Terror);
      gradient_input.multiply(this.learning_rate);
      //delta weights...
      let inputs_T = Matrix.transpose(inputs);
      let weight_D = Matrix.multiply(gradient_input, inputs_T);
      //adjusting the weights...
      this.layers[0].add(weight_D);
      this.bias_h[0].add(gradient_input);
      //when there is only one layer in hidden...
    } else {
      trans_l = Matrix.transpose(this.weights_ho);
      let Terror = Matrix.multiply(trans_l, output_errors);
      //input => first layer of hidden gradient...
      let gradient_input = Matrix.map(results[0], this.activation_function.dfunc);
      gradient_input.multiply(hidden_errors);
      gradient_input.multiply(this.learning_rate);
      //calculate the delta weights...
      let inputs_T = Matrix.transpose(inputs);
      let weight_D = Matrix.multiply(gradient_input, inputs_T);
      //adjust the weights of the first layer of hidden...
      this.layers[0].add(weight_D);
      this.bias_h[0].add(gradient_input);
    }
  }
  //for saving a NN for later...because of some reason...
  serialize() {
    return JSON.stringify(this);
  }
  //getting the things back from json format...
  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let nn = new NeuralNetwork(data.input_nodes, [data.hidden_nodes, data.hidden_layers], data.output_nodes);
    for (var i = 0; i < data.layers.length; i++) {
      nn.layers[i] = Matrix.deserialize(data.layers[i]);
    }
    for (var i = 0; i < data.bias_h.length; i++) {
      nn.bias_h[i] = Matrix.deserialize(data.bias_h[i]);
    }
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    nn.learning_rate = data.learning_rate;

    return nn;
  }
  // copy the NN...
  copy() {
    return this;
  }
  static prepareData(array_train, arr_test, data, lable) {
    let offset = i * len;
    for (var i = 0; i < data_len; i++) {
      if (i < threshold) {
        array_train[i] = data.bytes.subarray(offset, offset + len);
        array_train[i].lable = lable;
      } else {
        let index = i - threshold;
        arr_test[index] = data.bytes.subarray(offset, offset + len);
        arr_test[index].lable = lable;
      }
    }
  }

  //NEURO EVOLUTIONARY FUNCTIONS...

  //mutate the population for variations...
  mutate(rate) {
    function mutate(val) {
      if (Math.random() < rate) {
        return val + randomGaussian(0, 0.1);
      } else {
        return val;
      }
    }
    for (let l of this.layers) {
      l.map(mutate);
    }
    for (let b of this.bias_h) {
      b.map(mutate);
    }
    this.weights_ho.map(mutate);
    this.bias_o.map(mutate);
  }
  //crossover of two parents and give birth to a new child...
  crossOver(other) {
    let childBrain = this.copy();
    childBrain.bias_o = other.bias_o;
    for (var i = 0; i < this.bias_h.length; i++) {
      this.bias_h[i] = other.bias_h[i];
    }

    return childBrain;
  }
  //calculate  normalized fitness of population...
  static calcFitness(agent, best) {
    // the agent should have a fitness...
    let f = agent.fitness;
    let bf = best.fitness;

    return f / bf;
  }
  // fitest person out fo the population...
  static fitest(population) {
    let maxfit = -1;
    let best = null;
    if (random(population).fitness) {
      for (let p of population) {
        let fitness = p.fitness;
        if (fitness > maxfit) {
          best = p;
          maxfit = fitness;
        }
      }
      return {
        maxfit: maxfit,
        fitest: best,
      }
    } else if (random(population).score) {
      for (let p of population) {
        let fitness = p.score;
        if (fitness > maxfit) {
          best = p;
          maxfit = fitness;
        }
      }
      return {
        maxfit: maxfit,
        fitest: best,
      }
    } else {
      console.warn('error! a objet in population must have fitness or score property')
      return undefined;
    }
  }
}
