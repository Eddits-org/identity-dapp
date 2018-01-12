import Web3 from 'web3';

// eslint-disable-next-line no-underscore-dangle
const { utils } = new Web3()._extend;

export const addressToKey = address => `0x${utils.padLeft(address.substring(2), 64)}`;
export const keyToAddress = key => `0x${key.substring(26)}`;
