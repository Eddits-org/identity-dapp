import Web3 from 'web3';

/* eslint function-paren-newline: ["error", "consistent"] */

const config = require('config');

const resolvePromise = (resolve, reject, map = x => x) => (err, result) => {
  if (err) return reject(err);
  return resolve(map(result));
};

class Registry {
  constructor() {
    this.web3 = new Web3(window.web3.currentProvider);
  }

  getPSPNames() {
    return new Promise((resolve, reject) => {
      this.contract.getPSPNames(resolvePromise(resolve, reject));
    });
  }

  getPspAddress( name ) {
    return new Promise((resolve, reject) => {
      return this.contract.getPSPAddress(name, (err, res) => {
        if (err) return reject(err);
        return resolve({ name: this.web3.toAscii(name), address : res })
      });
    });
  }

  getPspNamesToAddress(networkId){
      if( !config.PSPregistry[networkId] ) return Promise.resolve([]);
      this.contract = this.web3.eth.contract(config.PSPregistry[networkId].abi).at(config.PSPregistry[networkId].address);
      return new Promise((resolve, reject) => {
      this.getPSPNames().then( (names) => {
        return Promise.all( names.map( name => this.getPspAddress(name) ) )
      }).then( values => {
        return resolve(values)
    }).catch( err => reject(err))
    });
  }


}

export default new Registry();