import Web3 from 'web3';
import { addressToKey } from 'utils/Keys.util';
import registry2 from './Registry.service';
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
  ENCRYPTION: 4,
  PAYMENT: 101
});


// TODO migrate web3 to 1.0 to use in registry service to utf8 instead of Ascii
// because to Ascii gives 32 bytes long string which makes comparaison hard af
export const CLAIM_NAMES = {
	LTClaimRegistry: "Lux Trust",
	SOClaimRegistry: "Smart Oversight",
	FCClaimRegistry: "France Connect"
}

export const KEY_TYPES = Object.freeze({
  ECDSA: 1,
  RSA: 2
});

export const CLAIM_TYPES = Object.freeze({
  BIOMETRIC: 1
});

export const CLAIM_SCHEME = Object.freeze({
  CONTRACT: 3
});

const keyTypeLabel = num => Object.keys(KEY_TYPES).find(type => KEY_TYPES[type] === num);

const claimSchemeLabel = num =>
  Object.keys(CLAIM_SCHEME).find(scheme => CLAIM_SCHEME[scheme] === num);

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

  //CLAIM  = 3
  getAllKeys() {
    return Promise.all(Object.keys(KEYS_PURPOSES)
      // For each PURPOSES, get the list of keys
      .map(purpose => this.getKeysByPurpose(KEYS_PURPOSES[purpose]).then(keys => [purpose, keys])))
      // Fetch keys types
      .then(result => Promise.all(
        result.map(([purpose, keys]) => Promise.all(
          // eslint-disable-next-line no-unused-vars
          keys.map(key => this.getKey(key, KEYS_PURPOSES[purpose]).then(([_1, type, _2]) => {
            let objectReturn = {
              key,
              type: {
                label: keyTypeLabel(type.toNumber()),
                code: type.toNumber()
              },
              purpose: {
                label: purpose,
                code: KEYS_PURPOSES[purpose]
              }
            };

            if (KEYS_PURPOSES[purpose] === 3) {
              return registry2.getClaimName(key).then((nameRetrieved) => {
              	//ugly check to see if registry returned a value
              	nameRetrieved.localeCompare("") ? objectReturn.name = nameRetrieved : null;
                return objectReturn;
              }).catch((err) => {
                return objectReturn;
              })
            } else {
              return objectReturn;
            }
          }))
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


  getPayments() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBlockNumber((err, res) => {
        if (err)
          reject(err);
        let from = res - 60 * 60 * 24 * 30 / 15; // currentBlock - 60s * 60mn * 24h * 30j / 15s (one month)
        from = from > 0 ? from : 0;
        this.contract.PaymentMade({}, { fromBlock: from, toBlock: 'latest' }).get((err, res) => {
          if (err)
            reject(err);
          else {
            console.log(res);
            resolve(res.map(r => ({ ...r.args })));
          }
        });
      });
    });
  }

  execute(dest, amount, calldata, from) {
    return new Promise((resolve, reject) => {
      // TODO: estimate gas cost !
      this.contract.execute(dest, amount, calldata, {
        from,
        gas: 5000000
      }, resolvePromise(resolve, reject));
    });
  }

  getClaimIdsByTopic(type) {
    return new Promise((resolve, reject) => {
      this.contract.getClaimIdsByTopic(type, resolvePromise(resolve, reject));
    });
  }

  getClaim(id) {
    return new Promise((resolve, reject) => {
      this.contract.getClaim(id, resolvePromise(resolve, reject));
    });
  }

  getAllClaims() {
    return Promise.all(Object.keys(CLAIM_TYPES)
      // For each CLAIM_TYPES, get the list of claims
      .map(type => this.getClaimIdsByTopic(CLAIM_TYPES[type]).then(claims => [type, claims])))
      // Fetch claims data
      .then(result => Promise.all(
        result.map(([type, claims]) => Promise.all(
          claims.map(claimId => this.getClaim(claimId).then(
            // eslint-disable-next-line no-unused-vars
            ([_1, scheme, issuer, signature, data, uri]) => ({
              id: claimId,
              type: {
                label: type,
                code: CLAIM_TYPES[type]
              },
              scheme: {
                label: claimSchemeLabel(scheme.toNumber()),
                code: scheme.toNumber()
              },
              issuer,
              signature,
              data,
              uri
            })
          ))
        ))
      ))
      // Build final result
      .then(result => result.reduce((a, b) => a.concat(b)));
  }

  addU2FKey(rawId, label, att, from) {
    return new Promise((resolve, reject) => {
      this.contract.addU2FKey(rawId, label, att, { from }, resolvePromise(resolve, reject));
    });
  }

  removeU2FKey(keyId, from) {
    return new Promise((resolve, reject) => {
      this.contract.removeU2FKey(keyId, { from }, resolvePromise(resolve, reject));
    });
  }

  getU2FKeyById(id) {
    return new Promise((resolve, reject) => {
      this.contract.getU2FKey(id, resolvePromise(resolve, reject));
    });
  }

  getU2FKeyIds() {
    return new Promise((resolve, reject) => {
      this.contract.getU2FKeyIds(resolvePromise(resolve, reject));
    });
  }

  getAllU2FKeys() {
    return this.getU2FKeyIds().then((keyIds) => {
      return Promise.all(keyIds.map(key => this.getU2FKeyById(key).then(([label, att]) => {
        return {
          id: key,
          label,
          att
        };
      })));
    });
  }
}
