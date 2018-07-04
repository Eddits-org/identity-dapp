const config = require('config');

const { dappURL } = config;

class OrelyService {
  generateSAMLRequest(address) {
    let url = `${config.orelySvcURL}/request?address=${address}`;
    if (dappURL) url += `&redirect=${dappURL}/${address}`;
    return fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    }).then(resp => resp.json());
  }
}

export default new OrelyService();
