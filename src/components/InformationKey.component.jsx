import React from 'react';
import PropTypes from 'prop-types';

import {KEYS_PURPOSES} from 'services/Identity.service';

const InformationKeyComponent = ({account, keyPurposes, selectedIdentity}) => {
	let tag = '';
	let icon = '';
	let label = '';
	const isManagement = !!keyPurposes.find(p => p === KEYS_PURPOSES.MANAGEMENT);
	const isAction = !isManagement && !!keyPurposes.find(p => p === KEYS_PURPOSES.ACTION);
	if (selectedIdentity === null) {
		icon = 'fa-question';
	} else {
		// eslint-disable-next-line no-lonely-if
		if (isManagement) {
			icon = 'fa-lock';
			tag = 'success';
			label = 'This key is a management key';
		} else if (isAction) {
			icon = 'fa-lock';
			tag = 'warning';
			label = 'This key is an action key';
		} else {
			icon = 'fa-unlock';
			tag = 'danger';
			label = 'This key is not registered on this identity';
		}
	}
	return (

		<div>

			<p className={`is-medium has-text-${tag}`}>

				<p key={icon} ><i className={'fa ' + icon}></i> {label}</p>
				<span className='address-text'>{account}</span>
			</p>

	
		</div>
		
	);
};

InformationKeyComponent.defaultProps = {
	account: null,
	keyPurposes: [],
	selectedIdentity: null
};

InformationKeyComponent.propTypes = {
	account: PropTypes.string,
	keyPurposes: PropTypes.arrayOf(PropTypes.number),
	selectedIdentity: PropTypes.string
};



export default InformationKeyComponent;
