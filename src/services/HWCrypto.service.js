const config = require('config');
const hwcrypto = require('assets/lib/hwcrypto.js');

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
