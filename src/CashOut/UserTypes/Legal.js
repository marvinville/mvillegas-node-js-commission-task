export default class Legal {
  constructor(props) {
    this.props = props
  }
  getCommission({ amount }) {
    const min = this.props.min.amount || 0
    const rate = this.props.percents / 100
    const commission = amount * rate
    return commission > min ? commission : min
  }
}
