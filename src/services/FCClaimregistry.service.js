import Web3 from 'web3';
import SolidityFunction from 'web3/lib/web3/function';

const config = require('config');

class FCClaimRegistry {
  constructor() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
    }
  }

	isAvailable(networkId){
		return new Promise( (resolve, reject) => {
			if ( !!config.ClaimRegistry[networkId] ){
				this.registry = this.web3.eth.contract(config.ClaimRegistry[networkId].abi).at(config.ClaimRegistry[networkId].address);
				this.registry.getAddress(config.FCClaimRegistry.name, "address", (err, address) => {
					if(err) reject(err);
					this.contract = this.web3.eth.contract(config.FCClaimRegistry[networkId].abi).at(address);
					this.verifyFunc = new SolidityFunction(
						this.web3,
						config.FCClaimRegistry[networkId].abi.find(v => v.type === 'function' && v.name === 'get'),
						address
					);
					resolve(true);
				})
			} else {
				resolve(false)
			}
		});
	}

  getCost() {
    return new Promise((resolve, reject) => {
      if (this.web3) {
        this.contract.cost((err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      } else reject(new Error('No Web3 provider: install MetaMask!'));
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
      if (this.web3) {
        this.web3.eth.call({
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
      } else reject(new Error('No Web3 provider: install MetaMask!'));
    });
  }
}

export default new FCClaimRegistry();
