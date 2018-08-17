import React from 'react';
import PropTypes from 'prop-types';

const IdentitySelectorComponent = ({
  identities,
  selectedIdentity,
  addIdentityVisible,
  selectIdentity,
  removeIdentity
}) => {
	return (
		<div className='flex-container'>
			{identities.map(identity =>
				<div key={identity.address} className='card identity-card' onClick={ _ => selectIdentity(identity.address)}>
					<header className='card-header' style={{"alignItems" : "center"}}>
						<p className='card-header-title'>
							<span className='icon card-title-icon'>
							  <i className='far fa-id-card'/>
							</span>
							Identity
						</p>
						<span className='icon has-text-danger' onClick={ (e) => { e.stopPropagation(); removeIdentity(identity.address)} }>
							<i className='fa fa-trash'/>
						</span>
					</header>
					<div className='card-content'>
						<img
							className='identicon'
							src={`https://eth.vanity.show/${identity.address}`}
							alt={ `Identicon of ether address ${identity.address}` }
						/>
						<span className='address-text'>{identity.address}</span>
					</div>
				</div>
			)}
		</div>
	);
};

IdentitySelectorComponent.defaultProps = {
  selectedIdentity: null
};

IdentitySelectorComponent.propTypes = {
  identities: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIdentity: PropTypes.string,
  addIdentityVisible: PropTypes.bool.isRequired,

  selectIdentity: PropTypes.func.isRequired,
  removeIdentity: PropTypes.func.isRequired
};

import './IdentityCardUnfold.style.scss'

export default IdentitySelectorComponent;
