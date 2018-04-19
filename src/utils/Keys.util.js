import Web3 from 'web3';

// eslint-disable-next-line no-underscore-dangle
const { utils } = new Web3()._extend;

export const addressToKey = address => `0x${utils.padLeft(address.substring(2), 64)}`;
export const keyToAddress = key => `0x${key.substring(26)}`;

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateId = (len) => {
  let rtn = '';
  for (let i = 0; i < len; i += 1) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
};
