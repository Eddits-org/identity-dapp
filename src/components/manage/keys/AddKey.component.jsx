import React from 'react';
import PropTypes from 'prop-types';

import { KEYS_PURPOSES, KEY_TYPES } from 'services/Identity.service';
import { addressToKey } from 'utils/Keys.util';

const AddKeyComponent = ({
  switchAddKeyVisibility,
  addKey
}) => {
  let refInputKey = null;
  let refSelectPurpose = null;
  let refSelectTypes = null;
  const handleClick = () => {
    // TODO: input validation + addessToKey only for ECDSA
    addKey(addressToKey(refInputKey.value), refSelectPurpose.value, refSelectTypes.value);
  };
  return (
    <div className='box'>
      <h5 className='title is-5'>Add a new key</h5>
      <div className='field is-horizontal'>
        <div className='field-body'>
          <div className='field is-expanded'>
            <span className='control has-icons-left'>
              <input
                className='input'
                type='text'
                placeholder='Key value'
                ref={(input) => { refInputKey = input; }}
              />
              <span className='icon is-small is-left'>
                <i className='fa fa-key' />
              </span>
            </span>
          </div>
          <div className='field is-grouped'>
            <span className='control'>
              <div className='select'>
                <select ref={(select) => { refSelectPurpose = select; }}>
                  {Object.keys(KEYS_PURPOSES).map(purpose => (
                    <option key={purpose} value={KEYS_PURPOSES[purpose]}>{purpose}</option>
                  ))}
                </select>
              </div>
            </span>
            <span className='control'>
              <div className='select'>
                <select ref={(select) => { refSelectTypes = select; }}>
                  {Object.keys(KEY_TYPES).map(type => (
                    <option key={type} value={KEY_TYPES[type]}>{type}</option>
                  ))}
                </select>
              </div>
            </span>
          </div>
          <div className='field is-grouped is-grouped-right'>
            <span className='control'>
              <button className='button is-success' onClick={handleClick}>
                Add
              </button>
            </span>
            <span className='control'>
              <button className='button is-danger' onClick={() => switchAddKeyVisibility(false)}>
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


AddKeyComponent.propTypes = {
  switchAddKeyVisibility: PropTypes.func.isRequired,
  addKey: PropTypes.func.isRequired
};

export default AddKeyComponent;
