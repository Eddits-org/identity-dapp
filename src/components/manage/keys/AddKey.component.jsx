import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';


import {KEYS_PURPOSES, KEY_TYPES} from 'services/Identity.service';
import {addressToKey} from 'utils/Keys.util';


const InputKeyByPurpose = ({
  purpose,
  pspNames,
  psp,
  onChange,
  onChangePsp
}) => {
  if( purpose == 101 ){
    return (
      <Select.Creatable
              onChange={ event => onChangePsp(event) }
              options={ pspNames }
              value={ psp }
              // promptTextCreator={ _ => 'Add other Eth Address' }
              newOptionCreator={({label, labelKey, valueKey}) => {
                const option = {};
                option.address = label;
                option.value = label;
                option.name = 'Add other Eth Address';
                return option;
              }}
              placeholder='Choose a PSP'
              labelKey='name'
      />
    )
  } else {
    return (
      <span>
        <input
          className='input'
          type='text'
          placeholder='Key value'
          onChange={ event => onChange(event) }
        />
        <span className='icon is-small is-left'>
          <i className='fa fa-key'/>
        </span>
      </span>
    )
  }
}

class AddKeyComponent extends React.Component {

  constructor( props ){
    super( props );

    this.state = {
      key: '',
      purpose: '',
      type: KEY_TYPES['ECDSA'],
      psp: ''
    }
  }

  // TODO: input validation + addessToKey only for ECDSA
  handleClick = () => {
    const { key, purpose, type, psp } = this.state;
    if( psp ){
      this.props.addKey(addressToKey(psp.address), purpose, type);
    } else {
      this.props.addKey(addressToKey(key), purpose, type);
    }
  };

  render() {
    const { addKey, switchAddKeyVisibility, pspNames } = this.props;
    const { key, purpose, type, psp } = this.state;

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
                psp={ psp }
                onChange={(event) => {
                  this.setState({ key: event.target.value })
                }}
                onChangePsp={(psp) => {
                  psp && psp.name === 'Add other Eth Address' ? psp.name = 'New address' : null;
                  this.setState({ psp })
                }}
              />
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
              <button className='button is-success' onClick={this.handleClick}>
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
  pspNames: PropTypes.arrayOf(PropTypes.object),
  addKey: PropTypes.func.isRequired
};

export default AddKeyComponent;
