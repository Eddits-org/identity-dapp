import React from 'react';
import PropTypes from 'prop-types';

import {KEYS_PURPOSES} from 'services/Identity.service';

const KeySelectorComponent = ({account, keyPurposes, selectedIdentity}) => {
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
			icon = 'fa-check-square';
			tag = 'is-success';
			label = 'This key is a management key';
		} else if (isAction) {
			icon = 'fa-warning';
			tag = 'is-warning';
			label = 'This key is an action key';
		} else {
			icon = 'fa-exclamation';
			tag = 'is-danger';
			label = 'This key is not registered on this identity';
		}
	}
	return (
		<div className='key-selector'>
      		<span className={`tag is-medium ${tag}`}>
        	<p>{label}</p>
        	<span
				className='icon'
				title={label}
			>
        </span>
				<span className='address-text'>{account}</span>
      </span>
			{selectedIdentity && isAction && (
				<p className='has-text-warning'>
					Your key is an action key on this identity, all operations cannot be performed.<br/>
					You can change the selected key in MetaMask.
				</p>
			)}
			{selectedIdentity && !isAction && !isManagement && (
				<p className='has-text-danger'>
					Your key is not registered on this identity.<br/>
					You can change the selected key in MetaMask.
				</p>
			)}
		</div>
	);
};

KeySelectorComponent.defaultProps = {
	account: null,
	keyPurposes: [],
	selectedIdentity: null
};

KeySelectorComponent.propTypes = {
	account: PropTypes.string,
	keyPurposes: PropTypes.arrayOf(PropTypes.number),
	selectedIdentity: PropTypes.string
};

import './KeySelector.style.scss';

export default KeySelectorComponent;
