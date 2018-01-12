import React from 'react';
import PropTypes from 'prop-types';

import { keyToAddress } from 'utils/Keys.util';
import { KEYS_PURPOSES } from 'services/Identity.service';
import AddKey from './keys/AddKey.component';

const Purpose = ({ purpose }) => {
  let icon = '';
  switch (purpose.code) {
    case 1:
      icon = 'fa-key';
      break;
    case 2:
      icon = 'fa-play';
      break;
    case 3:
      icon = 'fa-id-badge';
      break;
    case 4:
      icon = 'fa-lock';
      break;
    default:
      icon = '';
  }
  return (
    <span className={`tag key-${purpose.label.toLowerCase()}`}>
      <span className='icon'>
        <i className={`fa ${icon}`} />
      </span>&nbsp;
      {purpose.label}
    </span>
  );
};

const Type = ({ type }) => (
  <span className={`tag ${type.code === 1 ? 'is-primary' : 'is-info'}`}>
    {type.label}
  </span>
);

const Key = ({ value, account }) => {
  const keyLabel = (value.type.code === 1 ? keyToAddress(value.key) : value.key);
  const isSelectedAccount = value.type.code === 1 &&
    keyLabel === account &&
    value.purpose.code === 1;
  return (
    <span className={`tag is-medium ${isSelectedAccount ? 'is-warning' : ''}`}>
      {isSelectedAccount && (
        <span
          className='icon'
          title='This is your current management key'
        >
          <i className='fa fa-warning' />
        </span>
      )}
      &nbsp;{keyLabel}
    </span>
  );
};

const TabKeysComponent = ({
  keys,
  keyPurposes,
  addKeyVisible,
  duplicateKeyVisible,
  switchAddKeyVisibility,
  switchDuplicateKeyVisibility,
  addKey,
  removeKey,
  account
}) => {
  let refSelectPurpose = null;
  const isManagementKey = !!keyPurposes.find(p => p === KEYS_PURPOSES.MANAGEMENT);
  return (
    <div className='content'>
      <table className='table is-fullwidth'>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Key</th>
            <th>Type</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {keys.map(key => (
            <tr key={`${key.purpose.code}_${key.key}`}>
              <td><Purpose purpose={key.purpose} /></td>
              <td><Key value={key} account={account} /></td>
              <td><Type type={key.type} /></td>
              <td>
                {isManagementKey && !duplicateKeyVisible && !key.isRemoving && (
                  <div className='field has-addons'>
                    <p className='control'>
                      <a
                        className='button is-small'
                        title='Remove key'
                        onClick={() => removeKey(key.key, key.purpose.code)}
                      >
                        <span className='icon is-small'>
                          <i className='fa fa-trash' />
                        </span>
                      </a>
                    </p>
                    <p className='control'>
                      <a
                        className='button is-small'
                        title='Duplicate key'
                        onClick={() => switchDuplicateKeyVisibility(true)}
                      >
                        <span className='icon is-small'>
                          <i className='fa fa-clone' />
                        </span>
                      </a>
                    </p>
                  </div>
                )}
                {duplicateKeyVisible && !key.isRemoving && (
                  <div className='field has-addons'>
                    <span className='control'>
                      <div className='select is-small'>
                        <select ref={(select) => { refSelectPurpose = select; }}>
                          {Object.keys(KEYS_PURPOSES)
                            .filter(purpose => purpose !== key.purpose.label)
                            .map(purpose => (
                              <option
                                key={purpose}
                                value={KEYS_PURPOSES[purpose]}
                              >
                                {purpose}
                              </option>
                          ))}
                        </select>
                      </div>
                    </span>
                    <p className='control'>
                      <a
                        className='button is-small is-success'
                        title='OK'
                        onClick={() => {
                          addKey(key.key, refSelectPurpose.value, key.type.code);
                          switchDuplicateKeyVisibility(false);
                        }}
                      >
                        <span className='icon'>
                          <i className='fa fa-check' />
                        </span>
                      </a>
                    </p>
                    <p className='control'>
                      <a
                        className='button is-small is-danger'
                        title='Cancel'
                        onClick={() => switchDuplicateKeyVisibility(false)}
                      >
                        <span className='icon'>
                          <i className='fa fa-times' />
                        </span>
                      </a>
                    </p>
                  </div>
                )}
                {key.isRemoving && (
                  <span className='icon is-medium' title='Work in progress'>
                    <i className='fa fa-refresh fa-spin' />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isManagementKey && !addKeyVisible && (
        <button
          className='button is-primary is-small'
          onClick={() => switchAddKeyVisibility(true)}
        >
          <span className='icon'>
            <i className='fa fa-plus' />
          </span>&nbsp;
          Add key
        </button>
      )}
      {addKeyVisible && <AddKey {...{ switchAddKeyVisibility, addKey }} />}
    </div>
  );
};

TabKeysComponent.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  addKeyVisible: PropTypes.bool.isRequired,
  duplicateKeyVisible: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,

  switchAddKeyVisibility: PropTypes.func.isRequired,
  switchDuplicateKeyVisibility: PropTypes.func.isRequired,
  addKey: PropTypes.func.isRequired,
  removeKey: PropTypes.func.isRequired
};

export default TabKeysComponent;
