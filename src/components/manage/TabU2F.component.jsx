import React from 'react';
import PropTypes from 'prop-types';
const logoU2F = require('assets/images/u2f.png');

import { KEYS_PURPOSES } from 'services/Identity.service';

const TabU2FComponent = ({ keyPurposes, generateU2FKey }) => {
  const isManagementKey = !!keyPurposes.find(p => p === KEYS_PURPOSES.MANAGEMENT);
  return (
    <div className='content'>    
      <div className='columns'>
        <div className='column is-narrow'>
          <img src={logoU2F} alt='U2F Logo' style={{ width: '128px' }} />
        </div>
        <div className='column'>
          You can add U2F security keys to your identity.<br/>
          This way, you will be able to send secure transactions via two-factor authentication.
        </div>
      </div>
      <div className='content'>
        <table className='table is-fullwidth'>
          <thead>
          <tr>
            <th>Label</th>
            <th/>
          </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
      {isManagementKey && (
        <button
          className='button is-primary is-small'
          onClick={generateU2FKey}
        >
        <span className='icon'>
          <i className='fa fa-plus'/>
        </span>&nbsp;
          Add U2F key
        </button>
      )}
    </div>
  );
};


TabU2FComponent.propTypes = {
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,
  generateU2FKey: PropTypes.func.isRequired
};

export default TabU2FComponent;
