import Web3 from 'web3';
import SolidityFunction from "web3/lib/web3/function";

const config = require('config');

class SOClaimRegistry {
  constructor() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
    }
  }

	isAvailable(networkId){
		return new Promise( (resolve, reject) => {
			if ( !!config.ClaimRegistry[networkId] ){
				this.registry = this.web3.eth.contract(config.ClaimRegistry[networkId].abi).at(config.ClaimRegistry[networkId].address);
				this.registry.getAddress(config.SOClaimRegistry.name, "address", (err, address) => {
					if(err) reject(err);
					this.SOAddr = address;
					this.contract = this.web3.eth.contract(config.SOClaimRegistry[networkId].abi).at(address);
					resolve(true);
				})
			} else {
				resolve(false)
			}
		});
	}

	getAddress() {
		return this.SOAddr;
	}


  generateRequestClaim() {
    return this.contract.requestClaim.getData();
  }
}

export default new SOClaimRegistry();
