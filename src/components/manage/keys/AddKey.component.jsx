import React from 'react';
import PropTypes from 'prop-types';

import {KEYS_PURPOSES, KEY_TYPES} from 'services/Identity.service';
import {addressToKey} from 'utils/Keys.util';


const InputKeyByPurpose = ({
  purpose,
  pspNames,
  onChange
}) => {
  if( purpose == 101 ){
    return (
      <div className='select'>
        <select onChange={ event => onChange(event) }>
          {pspNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
    )
  } else {
    return (
      <input
        className='input'
        type='text'
        placeholder='Key value'
        onChange={ event => onChange(event) }
      />
    )
  }
}

class AddKeyComponent extends React.Component {

  constructor( props ){
    super( props );

    this.state = {
      key: '',
      purpose: '',
      type: ''
    }
  }

  render() {
    const { addKey, switchAddKeyVisibility, pspNames } = this.props;
    const { key, purpose, type } = this.state;

    const handleClick = () => {
      // TODO: input validation + addessToKey only for ECDSA
      addKey(addressToKey(key), purpose, type);
    };

    console.log( this.state, pspNames );

    return (
      <div className='box'>
        <h5 className='title is-5'>Add a new key</h5>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <div className='field is-expanded'>
            <span className='control has-icons-left'>
              <InputKeyByPurpose
                pspNames={ pspNames }
                purpose={ purpose }
                onChange={(event) => {
                  this.setState({ key: event.target.value })
                }}
              />
              <span className='icon is-small is-left'>
                <i className='fa fa-key'/>
              </span>
            </span>
            </div>
            <div className='field is-grouped'>
            <span className='control'>
              <div className='select'>
                <select onChange={(event) => {
                  this.setState({ purpose: event.target.value })
                }}>
                  {Object.keys(KEYS_PURPOSES).map(purpose => (
                    <option key={purpose} value={KEYS_PURPOSES[purpose]}>{purpose}</option>
                  ))}
                </select>
              </div>
            </span>
              <span className='control'>
              <div className='select'>
                <select onChange={(event) => {
                  this.setState({ type: event.target.value })
                }}>
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
  }
};


AddKeyComponent.propTypes = {
  switchAddKeyVisibility: PropTypes.func.isRequired,
  pspNames: PropTypes.arrayOf(PropTypes.string),
  addKey: PropTypes.func.isRequired
};

export default AddKeyComponent;
