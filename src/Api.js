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
  cashIn() {
    return this.handleApi(this.url.cashIn).then((data) => data)
  }
  cashOutNatural() {
    return this.handleApi(this.url.cashOut.natural).then((data) => data)
  }
  cashOutLegal() {
    return this.handleApi(this.url.cashOut.legal).then((data) => data)
  }
  handleApi(url) {
    if (url === '') return false
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}
