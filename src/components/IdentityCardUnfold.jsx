import React from 'react';
import PropTypes from 'prop-types';

const IdentitySelectorComponent = ({
  identities,
  selectedIdentity,
  addIdentityVisible,
  selectIdentity,
  addIdentity,
  removeIdentity,
  switchAddIdentityVisibility
}) => {
	let refAddIdentityAddress = null;
	return (
		<div className='flex-container'>
			{identities.map(identity =>
				<div key={identity.address} className='card identity-card' onClick={ _ => selectIdentity(identity.address)}>
					<header className='card-header'>
						<p className='card-header-title'>
							<span className='icon card-title-icon'>
							  <i className='far fa-id-card'/>
							</span>
							Identity
						</p>
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
  addIdentity: PropTypes.func.isRequired,
  removeIdentity: PropTypes.func.isRequired,
  switchAddIdentityVisibility: PropTypes.func.isRequired
};

import './IdentityCardUnfold.style.scss'

export default IdentitySelectorComponent;
