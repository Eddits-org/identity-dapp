import Web3 from 'web3';

// eslint-disable-next-line no-underscore-dangle
const { utils } = new Web3()._extend;

export const toEthString = balance => utils.fromWei(balance, 'ether').toString();
export const stringToWei = value => utils.toWei(value, 'ether');
