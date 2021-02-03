import Web3 from 'web3';
import web3Service from "./Web3.service";
import SolidityFunction from 'web3/lib/web3/function';

const config = require('config');

class FCClaimRegistry {
  constructor() {}

	isAvailable(networkId){
		return new Promise( (resolve, reject) => {
      if (!config.ClaimRegistry[networkId]) {
        console.error(`No config for FC claim registry on network ${networkId}.`);
        return reject(false);
      }

      web3Service.getProvider().then(provider => {
        this.registry = provider.eth.contract(config.ClaimRegistry[networkId].abi).at(config.ClaimRegistry[networkId].address);

        this.registry.getAddress(config.FCClaimRegistry.name, "address", (err, address) => {
          if(err) reject(err);
          this.contract = provider.eth.contract(config.FCClaimRegistry[networkId].abi).at(address);
          this.verifyFunc = new SolidityFunction(
            provider,
            config.FCClaimRegistry[networkId].abi.find(v => v.type === 'function' && v.name === 'get'),
            address
          );
          resolve(true);
        });
      }).catch(reject);
		});
	}

  getCost() {
    return new Promise((resolve, reject) => {
      this.contract.cost((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  // function certify(string _jwt, uint8 _v, bytes32 _r, bytes32 _s) public payable
  generateCertifyRequest(cost, jwt, r, s, v) {
    return this.contract.certify.getData(
      jwt,
      v, r, s,
      { value: cost }
    );
  }

  verifyClaim(calldata) {
    return new Promise((resolve, reject) => {
      web3Service.getProvider().then(provider => {
        provider.eth.call({
          to: this.contract.address,
          data: calldata
        }, (err, result) => {
          // eslint-disable-next-line no-unused-vars
          const [active, sub] = this.verifyFunc.unpackOutput(result);
          if (err) return reject(err);
          return resolve({
            issuer: 'FC',
            active,
            sub
          });
        });
      }).catch(reject);
    });
  }
}

export default new FCClaimRegistry();
