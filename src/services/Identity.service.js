import Web3 from 'web3';
import { addressToKey } from 'utils/Keys.util';

/* eslint function-paren-newline: ["error", "consistent"] */

const config = require('config');

const resolvePromise = (resolve, reject, map = x => x) => (err, result) => {
  if (err) return reject(err);
  return resolve(map(result));
};

export const KEYS_PURPOSES = Object.freeze({
  MANAGEMENT: 1,
  ACTION: 2,
  CLAIM: 3,
  ENCRYPTION: 4
});

export const KEY_TYPES = Object.freeze({
  ECDSA: 1,
  RSA: 2
});

const keyTypeLabel = num => Object.keys(KEY_TYPES).find(type => KEY_TYPES[type] === num);

export class Identity {
  constructor(address) {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = this.web3.eth.contract(config.contract.abi).at(address);
  }

  getKeyPurpose(address) {
    return new Promise((resolve, reject) => {
      this.contract.getKeyPurpose(
        addressToKey(address),
        resolvePromise(resolve, reject, purposes => purposes.map(p => p.toNumber()))
      );
    });
  }

  getKeysByPurpose(purpose) {
    return new Promise((resolve, reject) => {
      this.contract.getKeysByPurpose(purpose, resolvePromise(resolve, reject));
    });
  }

  getKey(key, purpose) {
    return new Promise((resolve, reject) => {
      this.contract.getKey(key, purpose, resolvePromise(resolve, reject));
    });
  }

  getAllKeys() {
    return Promise.all(Object.keys(KEYS_PURPOSES)
      // For each PURPOSES, get the list of keys
      .map(purpose => this.getKeysByPurpose(KEYS_PURPOSES[purpose]).then(keys => [purpose, keys])))
      // Fetch keys types
      .then(result => Promise.all(
        result.map(([purpose, keys]) => Promise.all(
          // eslint-disable-next-line no-unused-vars
          keys.map(key => this.getKey(key, KEYS_PURPOSES[purpose]).then(([_1, type, _2]) => ({
            key,
            type: {
              label: keyTypeLabel(type.toNumber()),
              code: type.toNumber()
            },
            purpose: {
              label: purpose,
              code: KEYS_PURPOSES[purpose]
            }
          })))
        ))
      ))
      // Build final result
      .then(result => result.reduce((a, b) => a.concat(b)));
  }

  addKey(key, purpose, type, from) {
    return new Promise((resolve, reject) => {
      this.contract.addKey(key, purpose, type, { from }, resolvePromise(resolve, reject));
    });
  }

  removeKey(key, purpose, from) {
    return new Promise((resolve, reject) => {
      this.contract.removeKey(key, purpose, { from }, resolvePromise(resolve, reject));
    });
  }

  deposit(amount, from) {
    return new Promise((resolve, reject) => {
      this.contract.deposit({ from, value: amount }, resolvePromise(resolve, reject));
    });
  }

  execute(dest, amount, calldata, from) {
    return new Promise((resolve, reject) => {
      this.contract.execute(dest, amount, calldata, { from }, resolvePromise(resolve, reject));
    });
  }
}
