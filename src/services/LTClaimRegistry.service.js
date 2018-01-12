import Web3 from 'web3';

const config = require('config');

class LTClaimRegistry {
  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
      this.contract = this.web3.eth.contract(config.LTClaimRegistry.abi)
        .at(config.LTClaimRegistry.address);
    }
  }

  // function certify(
  //   string _signInfo, bytes _signature, string _manifest, bytes _certificate
  // ) payable public
  generateCertifyRequest(signInfo, signature, manifest, certificate) {
    return this.contract.certify.getData(signInfo, signature, manifest, certificate);
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
}

export default new LTClaimRegistry();
