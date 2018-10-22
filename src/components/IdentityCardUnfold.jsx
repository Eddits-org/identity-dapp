import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import makeBlockie from 'ethereum-blockies-base64';

const shorten = hash => `${hash.substring(0, 10)}...${hash.substring(28)}`;

class IdentitySelectorComponent extends React.Component {
	
	constructor( props) {
		super(props);
		this.state = {
			deleteConfirm : {}
		}
	}
	
	render() {
		const {identities, selectIdentity, removeIdentity} = this.props;

		return (
				<div className='flex-container'>
					{identities.map(identity =>
					
						<div key={identity.address} className='card identity-card'
								 onClick={_ => selectIdentity(identity.address)}>
							<header className='card-header' style={{"alignItems": "center"}}>
								<p className='card-header-title'>
									<span className='icon card-title-icon'>
									<i className='far fa-id-card'/>
									</span>
									Identity
								</p>
								<button onClick={(e) => {
										e.stopPropagation();
										if( this.state.deleteConfirm[identity.address] ) removeIdentity(identity.address);
										this.setState({ deleteConfirm : { ...this.state.deleteConfirm, [identity.address] : true } });
									}}
											className={ classNames({"confirm" : this.state.deleteConfirm[identity.address] })}
								>
									 <div className='icon-cc has-text-black'>
										 { this.state.deleteConfirm[identity.address] ? <i className='fa fa-question'/> : <i className='fa fa-trash'/> }
									</div>
									<span className='text'> { this.state.deleteConfirm[identity.address] ? "Are you sure? " : "delete" }  </span>
							 </button>
							</header>
							<div className='card-content'>
								<img
										className='identicon'
										src={makeBlockie(identity.address)}
										alt={`Identicon of ether address ${identity.address}`}
								/>
								<span className='address-text'>{shorten(identity.address)}</span>
							</div>
						</div>
					)}
				</div>
		);
	};
}

IdentitySelectorComponent.defaultProps = {
	selectedIdentity: null
};

IdentitySelectorComponent.propTypes = {
	identities: PropTypes.arrayOf(PropTypes.object).isRequired,
	
	selectIdentity: PropTypes.func.isRequired,
	removeIdentity: PropTypes.func.isRequired
};

import './IdentityCardUnfold.style.scss'

export default IdentitySelectorComponent;
