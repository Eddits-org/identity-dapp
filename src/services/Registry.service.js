import Web3 from 'web3';

/* eslint function-paren-newline: ["error", "consistent"] */

const config = require('config');

const resolvePromise = (resolve, reject, map = x => x) => (err, result) => {
  if (err) return reject(err);
  console.log('result', result);
  return resolve(map(result));
};

class Registry {
  constructor() {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = this.web3.eth.contract(config.registry.abi).at(config.registry.address);
  }

  getPSPNames() {
    return new Promise((resolve, reject) => {
      this.contract.getPSPNames(resolvePromise(resolve, reject));
    });
  }
}

export default new Registry();