import Web3 from 'web3';
import BigNumber from 'bignumber.js';

const config = require('config');

class Web3Service {
  constructor() {}

  getProvider() {
    return new Promise((resolve, reject) => {
      if (!this.provider) {
        if (!window.ethereum) {
          console.error('No blockchain module installed (window.ethereum).');
          return reject(new Error('No blockchain module installed (window.ethereum).'));
        }

        this.provider = new Web3(window.ethereum);
      }

      return resolve(this.provider);
    });
  }

  withWeb3Promise(cb) {
    return new Promise((resolve, reject) => {
      this.getProvider().then(resolve).catch(reject);
    });
  }

  getNetwork() {
    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        provider.version.getNetwork((err, netId) => {
          if (err) return reject(err);
          const network = config.networks.find(n => n.id.toString() === netId);
          if (!network) return resolve({id: -1, name: 'Unknown', enabled: false});
          return resolve(network);
        });
      }).catch(reject);;
    });
  }

  getAccount() {
    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        provider.eth.getAccounts((err, accounts) => {
          if (err) return reject(err);
          if (!accounts || accounts.length === 0) return resolve(null);
          return resolve(accounts[0]);
        });
      }).catch(reject);;
    });
  }

  toAcsii(bytes32){
    const web3 = new Web3();
    return web3.toAscii(bytes32);
  }

  waitForMining(txHash) {
    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        const id = setInterval(() => {
          provider.eth.getTransactionReceipt(txHash, (err, tx) => {
            if (err) {
              clearInterval(id);
              reject(err);
            } else if (tx && tx.blockNumber) {
              clearInterval(id);
              resolve({ block: tx.blockNumber, address: tx.contractAddress });
            }
          });
        }, 1000);
      }).catch(reject);;
    });
  }

  estimateIdentityCreationGas() {
    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        const contract = provider.eth.contract(config.contract.abi);
        const deployTx = contract.new.getData({ data: config.contract.bytecode });
        provider.eth.estimateGas({ data: deployTx }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      }).catch(reject);;
    });
  }

  getGasPrice() {
    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        provider.eth.getGasPrice((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      }).catch(reject);;
    });
  }

  estimateIdentityCreationCost() {
    const web3 = new Web3();

    const gasPrice = new BigNumber(2000000000);
    return this.estimateIdentityCreationGas().then(gas => ({
      eth: web3.fromWei(gasPrice.times(gas), 'ether').toString(),
      gas: new BigNumber(3200000).toNumber() // TODO: metamask compute an invalid gas amount
    }));
  }

  deployIdentity(from, gas) {
    const gasPrice = new BigNumber(2000000000).toNumber();

    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        const contract = provider.eth.contract(config.contract.abi);

        contract.new({
          data: config.contract.bytecode,
          from,
          gas,
          gasPrice
        }, (err, res) => {
          if (err) reject(err);
          else resolve(res.transactionHash);
        });
      }).catch(reject);;
    });
  }

  getBalance(address) {
    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        provider.eth.getBalance(address, (err, balance) => {
          if (err) return reject(err);
          return resolve(balance);
        });
      }).catch(reject);;
    });
  }

  sign(from, msg) {
    return new Promise((resolve, reject) => {
      this.getProvider().then(provider => {
        const params = [msg, from];
        provider.sendAsync({
          method: 'personal_sign',
          params,
          from
        }, (err, resp) => {
          if (err) return reject(err);
          return resolve(resp.result);
        });
      }).catch(reject);;
    });
  }
}

export default new Web3Service();
