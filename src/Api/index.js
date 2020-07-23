import fetch from 'node-fetch'

export default class Api {
  constructor() {
    this.url = {
      cashIn: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
      cashOut: {
        natural:
          'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural',
        legal:
          'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical',
      },
    }
  }
  async getApi() {
    const cashInData = await fetch(this.url.cashIn).then((response) =>
      this.handleApi(response)
    )
    const cashOutLegalData = await fetch(
      this.url.cashOut.legal
    ).then((response) => this.handleApi(response))
    const cashOutNaturalData = await fetch(
      this.url.cashOut.natural
    ).then((response) => this.handleApi(response))

    return {
      cashIn: cashInData,
      cashOut: {
        legal: cashOutLegalData,
        natural: cashOutNaturalData,
      },
    }
  }
  handleApi(response) {
    if (response.status === 200) return response.json()
    console.error(`API Error, Please check this URL: ${response.url}`)
  }
}
