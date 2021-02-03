import SolidityFunction from 'web3/lib/web3/function';
import web3Service from "./Web3.service";

const config = require('config');

class LTClaimRegistry {
  constructor() {}

  // function certify(
  //   string _signInfo, bytes _signature, string _manifest, bytes _certificate
  // ) payable public
  generateCertifyRequest(cost, signInfo, signature, manifest, certificate) {
    return this.contract.certify.getData(
      signInfo,
      signature,
      manifest,
      certificate,
      { value: cost }
    );
  }

  isAvailable(networkId){
    return new Promise( (resolve, reject) => {
      if (!config.ClaimRegistry[networkId]) {
        console.error(`No config for LT claim registry on network ${networkId}.`);
        return reject(false);
      }

      web3Service.getProvider().then(provider => {
        this.registry = provider.eth.contract(config.ClaimRegistry[networkId].abi).at(config.ClaimRegistry[networkId].address);

        this.registry.getAddress(config.LTClaimRegistry.name, "address", (err, address) => {
          if(err) reject(err);
          this.contract = provider.eth.contract(config.LTClaimRegistry[networkId].abi).at(address);
          this.verifyFunc = new SolidityFunction(
            provider,
            config.LTClaimRegistry[networkId].abi.find(v => v.type === 'function' && v.name === 'get'),
            address
          );
          resolve(true);
        })
      }).catch(reject);;
	  });
  }

  getCost() {
    return new Promise((resolve, reject) => {
      this.contract.cost((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  verifyClaim(calldata) {
    return new Promise((resolve, reject) => {
      web3Service.getProvider().then(provider => {
        provider.eth.call({
          to: this.contract.address,
          data: calldata
        }, (err, result) => {
          // eslint-disable-next-line no-unused-vars
          const [active, subjectCN, country, issuerCN, modulus, exponent] =
            this.verifyFunc.unpackOutput(result);
          if (err) return reject(err);
          return resolve({
            issuer: 'LT',
            active,
            subjectCN,
            country,
            issuerCN
          });
        });
      }).catch(reject);
    });
  }
}

export default new LTClaimRegistry();
