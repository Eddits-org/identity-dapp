import web3Service from 'services/Web3.service';

const config = require('config');

class SOClaimRegistry {
  constructor() {}

	isAvailable(networkId){
		return new Promise( (resolve, reject) => {
			web3Service.getProvider().then(provider => {
				if ( !!config.ClaimRegistry[networkId] ){
					this.registry = provider.eth.contract(config.ClaimRegistry[networkId].abi).at(config.ClaimRegistry[networkId].address);
					this.registry.getAddress(config.SOClaimRegistry.name, "address", (err, address) => {
						if(err) reject(err);
						this.SOAddr = address;
						this.contract = provider.eth.contract(config.SOClaimRegistry[networkId].abi).at(address);
						resolve(true);
					})
				} else {
					resolve(false)
				}
			}).catch(reject);;
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
