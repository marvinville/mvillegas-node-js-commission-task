export default class CashIn {
  async setConfig(props) {
    return (this.props = props)
  }
  getCommission({ amount }) {
    let rate = this.props.percents / 100
    let max = this.props.max

    let commission = amount * rate
    return commission > max ? max : commission
  }
}
