export default class Currency {
  formatAmount(amount) {
    return this.countDecimals(amount) === 3
      ? Math.round(Math.ceil(amount * 100)) / 100
      : amount.toFixed(2)
  }
  countDecimals(value) {
    return value % 1 ? value.toString().split('.')[1].length : 0
  }
}
