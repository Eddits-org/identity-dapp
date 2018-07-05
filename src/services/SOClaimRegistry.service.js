import Web3 from 'web3';

const config = require('config');

class SOClaimRegistry {
  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    }
  }

  isAvailable(networkId){
    if (!!config.SOClaimRegistry[networkId] ){
      this.contract = this.web3.eth.contract(config.SOClaimRegistry[networkId].abi).at(config.SOClaimRegistry[networkId].address);
    }
    return Promise.resolve(!!config.SOClaimRegistry[networkId]);
  }


  generateRequestClaim() {
    return this.contract.requestClaim.getData();
  }
}

export default new SOClaimRegistry();
