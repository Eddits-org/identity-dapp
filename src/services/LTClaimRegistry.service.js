import Web3 from 'web3';
import SolidityFunction from 'web3/lib/web3/function';
import web3 from "./Web3.service";

const config = require('config');

class LTClaimRegistry {
  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    }
  }

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
    if (!!config.LTClaimRegistry[networkId] ){
      this.contract = this.web3.eth.contract(config.LTClaimRegistry[networkId].abi).at(config.LTClaimRegistry[networkId].address);
      this.verifyFunc = new SolidityFunction(
        window.web3,
        config.LTClaimRegistry[networkId].abi.find(v => v.type === 'function' && v.name === 'get'),
        config.LTClaimRegistry[networkId].address
      );
    }
    return Promise.resolve(!!config.LTClaimRegistry[networkId]);
  }

  getCost() {
    return new Promise((resolve, reject) => {
      if (this.web3) {
        this.contract.cost((err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      } else reject(new Error('No Web3 provider: install MetaMask!'));
    });
  }

  verifyClaim(issuer, calldata) {
    return new Promise((resolve, reject) => {
      if (this.web3) {
        this.web3.eth.call({
          to: issuer,
          data: calldata
        }, (err, result) => {
          // eslint-disable-next-line no-unused-vars
          const [active, subjectCN, issuerCN, modulus, exponent] =
            this.verifyFunc.unpackOutput(result);
          if (err) return reject(err);
          return resolve({
            active,
            subjectCN,
            issuerCN
          });
        });
      } else reject(new Error('No Web3 provider: install MetaMask!'));
    });
  }
}

export default new LTClaimRegistry();
