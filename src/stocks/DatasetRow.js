class DatasetRow {
  /**
   * @param  {{
   *    date: String|Object,
   *    open: Number,
   *    high: Number,
   *    low: Number,
   *    close: Number
 *    }} data
   */
  constructor(data) {
    this.data = data;
  }

  getDate() {
    return this.data.date;
  }

  getOpen() {
    return this.data.open;
  }

  getHigh() {
    return this.data.high;
  }

  getLow() {
    return this.data.low;
  }

  getClose() {
    return this.data.close;
  }

  getDrawDown() {
    return (this.getHigh() - this.getLow()) / this.getHigh();
  }

  getDrawDownPercentage() {
    return this.getDrawDown() * 100;
  }
}

module.exports = DatasetRow;
