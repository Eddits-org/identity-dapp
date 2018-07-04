import Web3 from 'web3';

const config = require('config');

class SOClaimRegistry {
  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
      this.contract = this.web3.eth.contract(config.SOClaimRegistry.abi)
        .at(config.SOClaimRegistry.address);
    }
  }

  generateRequestClaim() {
    return this.contract.requestClaim.getData();
  }
}

export default new SOClaimRegistry();
