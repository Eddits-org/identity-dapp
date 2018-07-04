const config = require('config');

const { dappURL } = config;

class HWCryptoService {
  getCertificate(address) {
    return {
      id: 1234,
      name: 'CROISEAUX',
      issuer: 'Estonian Gov.'
    };
  }
}

export default new HWCryptoService();
