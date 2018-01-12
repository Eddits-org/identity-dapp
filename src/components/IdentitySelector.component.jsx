import React from 'react';
import PropTypes from 'prop-types';

const IdentitySelectorComponent = ({ identities, selectedIdentity, selectIdentity }) => (
  <div className='card'>
    <header className='card-header'>
      <p className='card-header-title'>
        <span className='icon card-title-icon'>
          <i className='fa fa-id-card-o' />
        </span>
        Selected identity
      </p>
    </header>
    <div className='card-content'>
      <div className='content'>
        <div className='select is-fullwidth'>
          <select onChange={evt => selectIdentity(evt.target.value)} value={(selectedIdentity || '')}>
            <option value=''>Select identity</option>
            {identities.map(id => (
              <option
                key={id.address}
                value={id.address}
              >
                {id.address}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
);

IdentitySelectorComponent.defaultProps = {
  selectedIdentity: null
};

IdentitySelectorComponent.propTypes = {
  identities: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIdentity: PropTypes.string,

  selectIdentity: PropTypes.func.isRequired
};

export default IdentitySelectorComponent;
