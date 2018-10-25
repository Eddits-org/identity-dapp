import React from 'react';
import PropTypes from 'prop-types';

import { keyToAddress } from 'utils/Keys.util';
import { KEYS_PURPOSES } from 'services/Identity.service';

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
    case 101:
      icon = 'fa-key';
      break;
    default:
      icon = '';
  }
  return (
  <span>
    <span className={`bullet-point key-${purpose.label.toLowerCase()}`}/>
	  <span className='eddits-label'>{purpose.label}</span>
  </span>
  );
};

const Key = ({ value, account }) => {
  const keyLabel = (value.type.code === 1 ? keyToAddress(value.key) : value.key);
  const isSelectedAccount = value.type.code === 1 &&
    keyLabel === account &&
    value.purpose.code === 1;
  return (
    <span className={`tag is-medium address-text ${isSelectedAccount ? 'is-warning' : ''}`}>
      {isSelectedAccount && (
        <span
          className='icon'
          title='This is your current management key'
        >
          <i className='fas fa-exclamation-triangle' />
        </span>
      )}
      &nbsp;{keyLabel}
    </span>
  );
};

const Type = ({ type }) => (
  <span className={`tag ${type.code === 1 ? 'is-primary' : 'is-info'}`}>
    {type.label}
  </span>
);

const KeyRowComponent = ({
  data,
  account,
  isManagementKey,
  addKey,
  removeKey,
  switchDuplicateKeyVisibility
}) => {
  let refSelectPurpose = null;
  const duplicateKeyVisible = data && !!data.isDuplicating;
  return (
    <tr>
      <td><Purpose purpose={data.purpose} /></td>
      <td><Key value={data} account={account} /></td>
      <td><Type type={data.type} /></td>
      <td>
        {isManagementKey && !duplicateKeyVisible && !data.isRemoving && (
          <div className='field has-addons'>
            <p className='control'>
              <a
                className='button is-small'
                title='Remove key'
                onClick={() => removeKey(data.key, data.purpose.code)}
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
                onClick={() => switchDuplicateKeyVisibility(true, data.key, data.purpose.code)}
              >
                <span className='icon is-small'>
                  <i className='fa fa-clone' />
                </span>
              </a>
            </p>
          </div>
        )}
        {duplicateKeyVisible && !data.isRemoving && (
          <div className='field has-addons'>
            <span className='control'>
              <div className='select is-small'>
                <select ref={(select) => { refSelectPurpose = select; }}>
                  {Object.keys(KEYS_PURPOSES)
                    .filter(purpose => purpose !== data.purpose.label)
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
                  addKey(data.key, refSelectPurpose.value, data.type.code);
                  switchDuplicateKeyVisibility(false, data.key, data.purpose.code);
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
                onClick={() => switchDuplicateKeyVisibility(false, data.key, data.purpose.code)}
              >
                <span className='icon'>
                  <i className='fa fa-times' />
                </span>
              </a>
            </p>
          </div>
        )}
        {data.isRemoving && (
          <span className='icon is-medium' title='Work in progress'>
            <i className='fa fa-refresh fa-spin' />
          </span>
        )}
      </td>
    </tr>
  );
};

KeyRowComponent.propTypes = {
  data: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
  isManagementKey: PropTypes.bool.isRequired,

  addKey: PropTypes.func.isRequired,
  removeKey: PropTypes.func.isRequired,
  switchDuplicateKeyVisibility: PropTypes.func.isRequired
};

export default KeyRowComponent;
