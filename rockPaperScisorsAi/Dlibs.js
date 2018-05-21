/*
AUTHOR : Eeshan Narula & Daniel Shiffmen
GITHUB : _____________
*/

class Dlibs {

  constructor(x, y, z) {
    if (y instanceof Array) {
      this.input_nodes = x;

      this.hidden_nodes = y[0];
      this.hidden_layers = y[1];

      this.output_nodes = z;

      this.layers = [];
      this.bias_h = [];

      this.multilayer = true;

      this.layers[0] = new Matrix(this.hidden_nodes, this.input_nodes);
      this.bias_h[0] = new Matrix(this.hidden_nodes, 1);
      this.layers[0].randomize();
      this.bias_h[0].randomize();

      for (var i = 1; i < this.hidden_layers; i++) {

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
    } else {
      this.input_nodes = x;
      this.hidden_nodes = y;
      this.output_nodes = z;

      this.multilayer = false;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);

      this.bias_h.randomize();
      this.bias_o.randomize();

      this.setLearningRate();
      this.setActivationFunction();
    }
  }
  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }
  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }
  predict(input_array) {
    if (this.multilayer) {
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
    }else {
      let inputs = Matrix.fromArray(input_array);
      let hidden = Matrix.multiply(this.weights_ih, inputs);
      hidden.add(this.bias_h);
      hidden.map(this.activation_function.func);

      let output = Matrix.multiply(this.weights_ho, hidden);
      output.add(this.bias_o);
      output.map(this.activation_function.func);

      // Sending back to the caller!
      return output.toArray();
    }
  }
  train(input_array, target_array) {
    if (this.multilayer) {
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
      let trp = Matrix.transpose(results[index])
      let weight_ih_deltas = Matrix.multiply(hidden_gradient, trp);
      //adjusting the last hidden layer...
      if (index > 0) {
        this.layers[index].add(weight_ih_deltas);
        this.bias_h[index].add(hidden_gradient);
      }
      // for more than two layers...
      for (var i = index - 1; i >= 1; i--) {
        let transposed_layer = Matrix.transpose(this.layers[i + 1]);
        let Berror = Matrix.multiply(transposed_layer, hidden_errors);

        let g = Matrix.map(results[i], this.activation_function.dfunc);
        g.multiply(Berror);
        g.multiply(this.learning_rate);

        let transpose_hidden = Matrix.transpose(results[i]);
        let weight_deltas = Matrix.multiply(g, transpose_hidden);
        this.layers[i].add(weight_deltas);
        this.bias_h[i].add(g);
      }

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
        let gradient_input = Matrix.map(hidden, this.activation_function.dfunc);
        gradient_input.multiply(hidden_errors);
        gradient_input.multiply(this.learning_rate);
        //calculate the delta weights...
        let inputs_T = Matrix.transpose(inputs);
        let weight_D = Matrix.multiply(gradient_input, inputs_T);
        //adjust the weights of the first layer of hidden...
        this.layers[0].add(weight_D);
        this.bias_h[0].add(gradient_input);
      }
    } else {
      let inputs = Matrix.fromArray(input_array);
      let hidden = Matrix.multiply(this.weights_ih, inputs);
      hidden.add(this.bias_h);
      hidden.map(this.activation_function.func);

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

      let inputs_T = Matrix.transpose(inputs);
      let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

      this.weights_ih.add(weight_ih_deltas);
      this.bias_h.add(hidden_gradient);
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
    if (data.multilayer) {
      let nn = new Dlibs(data.input_nodes, [data.hidden_nodes, data.hidden_layers], data.output_nodes);
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
    } else {
      let nn = new Dlibs(data.input_nodes, data.hidden_nodes, data.output_nodes);
      nn.weights_ih = Matrix.deserialize(data.weights_ih);
      nn.weights_ho = Matrix.deserialize(data.weights_ho);
      nn.bias_h = Matrix.deserialize(data.bias_h);
      nn.bias_o = Matrix.deserialize(data.bias_o);
      nn.learning_rate = data.learning_rate;
      return nn;
    }
  }
  // copy the NN...
  copy() {
    return this;
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
    if(this.multilayer){
    for (let l of this.layers) {
      l.map(mutate);
    }
    for (let b of this.bias_h) {
      b.map(mutate);
    }
    this.weights_ho.map(mutate);
    this.bias_o.map(mutate);
  } else {
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
}
  //crossover of two parents and give birth to a new child...
  crossOver(other) {
    if (this.multilayer) {
      let childBrain = this.copy();
      childBrain.bias_o = other.bias_o;
      for (var i = 0; i < this.bias_h.length; i++) {
        this.bias_h[i] = other.bias_h[i];
      }
      return childBrain;
    } else {
      let childBrain = this.copy();
      childBrain.bias_o = other.bias_o;
      childBrain.bias_h = other.bias_h;
      return childBrain;
    }
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

//Matrix Class...

class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i]);
  }

  static subtract(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    }

    // Return a new Matrix a-b
    return new Matrix(a.rows, a.cols)
      .map((_, i, j) => a.data[i][j] - b.data[i][j]);
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  randomize() {
    return this.map(e => Math.random() * 2 - 1);
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }
      return this.map((e, i, j) => e + n.data[i][j]);
    } else {
      return this.map(e => e + n);
    }
  }

  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows)
      .map((_, i, j) => matrix.data[j][i]);
  }

  static multiply(a, b) {
    // Matrix product
    if (a.cols !== b.rows) {
      console.log('Columns of A must match rows of B.')
      return;
    }

    return new Matrix(a.rows, b.cols)
      .map((e, i, j) => {
        // Dot product of values in col
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        return sum;
      });
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }

      // hadamard product
      return this.map((e, i, j) => e * n.data[i][j]);
    } else {
      // Scalar product
      return this.map(e => e * n);
    }
  }

  map(func) {
    // Apply a function to every element of matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }

  static map(matrix, func) {
    // Apply a function to every element of matrix
    return new Matrix(matrix.rows, matrix.cols)
      .map((e, i, j) => func(matrix.data[i][j], i, j));
  }

  print() {
    console.table(this.data);
    return this;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Matrix;
}
