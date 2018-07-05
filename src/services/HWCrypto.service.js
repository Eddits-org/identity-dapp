const config = require('config');
const HWCrypto = require('assets/lib/hwcrypto.js');
const ASN1 = require('ASN1js');
const PKI = require('PKIjs');

const { dappURL } = config;

class HWCryptoService {
  getCertificate(address) {
      return HWCrypto.getCertificate({lang: 'en'}).then((response) => {
          console.log('RESPONSE HEX : ' + response.hex);
          const asn1 = ASN1.fromBER(response.hex);
          console.log('ASN1 : ' + asn1);
          const cert = new Certificate({ schema: asn1.result });
          console.log('Using certificate: ' + cert);
          return cert;
      }, function(err) {
          console.log('getCertificate() failed: ' + err.message);
      });
  }
}

export default new HWCryptoService();
