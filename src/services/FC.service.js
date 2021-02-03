const { fcSvcURL, dappURL } = require('config');

class FCService {

  generateFCRedirectURL(address) {
    let url = `${fcSvcURL}/getFCToken?nonce=${address}`;
    if (dappURL) url += `&redirectUrl=${dappURL}/${address}`;
    return fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    }).then(resp => resp.json());
  }

}

module.exports = new FCService();
