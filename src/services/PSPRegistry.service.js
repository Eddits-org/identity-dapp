import Web3 from 'web3';

import web3Service from 'services/Web3.service';

/* eslint function-paren-newline: ["error", "consistent"] */

const config = require('config');

const resolvePromise = (resolve, reject, map = x => x) => (err, result) => {
  if (err) return reject(err);
  return resolve(map(result));
};

class Registry {
  constructor() {}

  getPSPNames() {
    return new Promise((resolve, reject) => {
      this.contract.getPSPNames(resolvePromise(resolve, reject));
    });
  }

  getPspAddress( name ) {
    return new Promise((resolve, reject) => {
      return this.contract.getPSPAddress(name, (err, res) => {
        if (err) return reject(err);

        const web3 = new Web3();
        return resolve({ name: web3.toAscii(name), address : res })
      });
    });
  }

  getPspNamesToAddress(networkId){
    if( !config.PSPregistry[networkId] ) return Promise.resolve([]);

    return new Promise((resolve, reject) => {
      web3Service.getProvider().then(provider => {
        this.contract = provider.eth.contract(config.PSPregistry[networkId].abi).at(config.PSPregistry[networkId].address);

        this.getPSPNames().then((names) => {
          return Promise.all( names.map( name => this.getPspAddress(name) ) )
        }).then( values => {
          return resolve(values)
        }).catch( err => reject(err))
      }).catch(reject);;
    });
  }


}

export default new Registry();
