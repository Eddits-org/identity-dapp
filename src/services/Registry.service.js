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

  getClaimName(keyData) {
    return new Promise((resolve, reject) => {
      web3Service.getProvider().then(provider => {
        if (!config.ClaimRegistry["42"]) {
          return reject(new Error('No config for Claim Registry on network 42'));
        }

        const contract = provider.eth.contract(config.ClaimRegistry["42"].abi).at(config.ClaimRegistry["42"].address);

        const keyFormatted = "0x" + keyData.slice(26);
        return contract.getData(keyFormatted,"name", (err, res) => {
          if (err) return reject(err);

          const web3 = new Web3();
          return resolve(web3.toAscii(res));
        });
      }).catch(reject);;
    });
  }

}

export default new Registry();
