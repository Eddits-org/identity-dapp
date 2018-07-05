const config = require('config');
const HWCrypto = require('assets/lib/hwcrypto.js');

const { dappURL } = config;

class HWCryptoService {
  getCertificate(address) {
      HWCrypto.getCertificate({lang: 'en'}).then((response) => {
          const cert = response;
          console.log('Using certificate: $(cert.hex)');
          return cert;
      }, function(err) {
          console.log('getCertificate() failed: $(err)');
      });
  }
}

export default new HWCryptoService();
