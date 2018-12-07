import React from 'react';
import PropTypes from 'prop-types';
const logoU2F = require('assets/images/u2f.png');

import { KEYS_PURPOSES } from 'services/Identity.service';

const TabU2FComponent = ({ keyPurposes, u2fkeys, isKeyGenerated, generateU2FKey, addU2FKey, removeU2FKey }) => {
  let refKeyName = null;
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
        <table className='table is-fullwidth is-hoverable'>
          <thead>
          <tr>
            <th>Label</th>
            <th/>
          </tr>
          </thead>
          <tbody>
            { u2fkeys.map(u2fkey => (
              <tr key={u2fkey.id}>
                <td>
                  { u2fkey.label }
                </td>
                <td>
                  <div className='field has-addons is-pulled-right'>
                    <p className='control'>
                      <a
                        className='button is-small is-danger'
                        title='Remove key'
                        onClick={() => removeU2FKey(u2fkey.id)}
                      >
                        <span className='icon is-small'>
                          <i className='fa fa-trash' />
                        </span>
                      </a>
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isManagementKey && !isKeyGenerated && (
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
      {isManagementKey && isKeyGenerated && (
        <div className='field is-horizontal'>
          <div className='field-label is-normal'>
            <label className='label'>Key name</label>
          </div>
          <div className='field-body'>
            <div className='field has-addons'>
              <div className='control is-expanded'>
                <input
                  className='input'
                  type='text'
                  placeholder='Key name'
                  ref={(input) => { refKeyName = input; }}
                />
              </div>
              <div className='control'>
                <a
                  className='button is-info'
                  onClick={() => addU2FKey(refKeyName.value)}
                >
                  Add this key
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TabU2FComponent.defaultProps = {
  u2fkeys: []
};

TabU2FComponent.propTypes = {
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,
  isKeyGenerated: PropTypes.bool.isRequired,
  u2fkeys: PropTypes.arrayOf(PropTypes.object),
  
  generateU2FKey: PropTypes.func.isRequired,
  addU2FKey: PropTypes.func.isRequired,
  removeU2FKey: PropTypes.func.isRequired
};

export default TabU2FComponent;
