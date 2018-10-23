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
						<div className='field is-expanded'>
            <span className='control'>
                <Select className='is-small' onChange={(purpose) => { this.setState({ purpose : purpose.value }) }}
												value={ this.state.purpose }
												scrollMenuIntoView={ false }
                        options={ Object.keys(KEYS_PURPOSES).map(purpose => ({label : purpose, value: KEYS_PURPOSES[purpose]}) ) }
                >
                </Select>
            </span>
            </div>
						<div className='field is-expanded'>
            <span className='control'>
              <Select onChange={(event) => { this.setState({ type: event.value }) }}
                      value={ this.state.type }
											options={ Object.keys(KEY_TYPES).map(type => ({label : type, value: KEY_TYPES[type]}) ) }
              >
              </Select>
            </span>
            </div>
            <div className='field is-grouped is-grouped-right'>
            <span className='control'>
              <button className='button is-success is-intermediate' onClick={this.handleClick}>
                <span className='icon is-intermediate'>
                  <i className={`fa fa-plus`} />
                </span>
                <span>Add</span>
              </button>
            </span>
              <span className='control'>
              <button className='button is-danger is-intermediate' onClick={() => switchAddKeyVisibility(false)}>
                <span className='icon is-intermediate'>
                  <i className={`fa fa-times`} />
                </span>
                <span>Cancel</span>
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
