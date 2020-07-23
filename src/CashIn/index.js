export default class CashIn {
  constructor(props) {
    this.props = props
  }
  getCommission({ amount }) {
    const rate = this.props.percents / 100
    const max = this.props.max.amount

    const commission = amount * rate
    return commission > max ? max : commission
  }
}
