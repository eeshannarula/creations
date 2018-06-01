class poly {
  constructor(degree) {
    this.degree = degree;
    this.one = tf.scalar(1);
    this.consts = [];
    for (var i = 0; i <= this.degree; i++) {
      this.consts[i] = tf.scalar(Math.random()).variable();
    }
  }
  formEq(x_) {
    let eqs = [];
    let count = tf.scalar(this.degree).variable();
    let xs = tf.tensor1d(x_);
    for (var i = 0; i < this.consts.length; i++) {
      if (count.dataSync()[0] !== 0) {
        eqs[i] = this.consts[i].mul(xs.pow(count));
      } else {
        eqs[i] = this.consts[i];
      }
      count = count.sub(this.one);
    }
    let final = eqs[0];
    for (var i = 1; i < eqs.length; i++) {
      final = final.add(eqs[i]);
    }
    return final;
  }
}
