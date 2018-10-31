import Web3 from 'web3';

/* eslint function-paren-newline: ["error", "consistent"] */

const config = require('config');

const resolvePromise = (resolve, reject, map = x => x) => (err, result) => {
  if (err) return reject(err);
  return resolve(map(result));
};

class Registry {
  constructor() {
    if(window.web3 && window.web3.currentProvider) {
      this.web3 = new Web3(window.web3.currentProvider);
		if( !config.ClaimRegistry["42"] ) { //todo
			this.contract = this.web3.eth.contract(config.ClaimRegistry["42"].abi).at(config.ClaimRegistry["42"].address);
		}
	}
  
  }
  
}

export default new Registry();