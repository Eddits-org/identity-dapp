import Web3 from 'web3';

const config = require('config');

class Web3Service {
  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    }
  }

  withWeb3Promise(cb) {
    return new Promise((resolve, reject) => {
      if (!this.web3) reject(Error('Web3 provider not available'));
      else cb(resolve, reject);
    });
  }

  getNetwork() {
    return this.withWeb3Promise((resolve, reject) => {
      this.web3.version.getNetwork((err, netId) => {
        if (err) return reject(err);
        const network = config.networks.find(n => n.id.toString() === netId);
        if (!network) return resolve({ id: -1, name: 'Unknown', enabled: false });
        return resolve(network);
      });
    });
  }

  getAccount() {
    return this.withWeb3Promise((resolve, reject) => {
      this.web3.eth.getAccounts((err, accounts) => {
        if (err) return reject(err);
        if (!accounts || accounts.length === 0) return resolve(null);
        return resolve(accounts[0]);
      });
    });
  }

  waitForMining(txHash) {
    return this.withWeb3Promise((resolve, reject) => {
      const id = setInterval(() => {
        this.web3.eth.getTransactionReceipt(txHash, (err, tx) => {
          if (err) {
            clearInterval(id);
            reject(err);
          } else if (tx && tx.blockNumber) {
            clearInterval(id);
            resolve({ block: tx.blockNumber, address: tx.contractAddress });
          }
        });
      }, 1000);
    });
  }

  estimateIdentityCreationGas() {
    return this.withWeb3Promise((resolve, reject) => {
      const contract = this.web3.eth.contract(config.contract.abi);
      const deployTx = contract.new.getData({ data: config.contract.bytecode });
      this.web3.eth.estimateGas({ data: deployTx }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  getGasPrice() {
    return this.withWeb3Promise((resolve, reject) => {
      this.web3.eth.getGasPrice((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  estimateIdentityCreationCost() {
    return this.estimateIdentityCreationGas().then(gas =>
      this.getGasPrice().then(gasPrice => ({
        eth: this.web3.fromWei(gasPrice.times(gas), 'ether').toString(),
        gas: gas.toString(),
        gasPrice: gasPrice.toString()
      })));
  }

  deployIdentity(from) {
    return this.withWeb3Promise((resolve, reject) => {
      const contract = this.web3.eth.contract(config.contract.abi);
      contract.new({ data: config.contract.bytecode, from }, (err, res) => {
        if (err) reject(err);
        else resolve(res.transactionHash);
      });
    });
  }

  getBalance(address) {
    return this.withWeb3Promise((resolve, reject) => {
      this.web3.eth.getBalance(address, (err, balance) => {
        if (err) return reject(err);
        return resolve(balance);
      });
    });
  }

  sign(from, msg) {
    return this.withWeb3Promise((resolve, reject) => {
      const params = [msg, from];
      this.web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params,
        from
      }, (err, resp) => {
        if (err) return reject(err);
        return resolve(resp.result);
      });
    });
  }
}

export default new Web3Service();
