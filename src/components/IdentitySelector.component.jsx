import React from 'react';
import PropTypes from 'prop-types';

const IdentitySelectorComponent = ({
  identities,
  selectedIdentity,
  addIdentityVisible,
  selectIdentity,
  addIdentity,
  removeIdentity,
  switchAddIdentityVisibility
}) => {
  let refAddIdentityAddress = null;
  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>
          <span className='icon card-title-icon'>
            <i className='far fa-id-card' />
          </span>
          Selected identity
        </p>
      </header>
      <div className='card-content'>
        {!addIdentityVisible && (
          <div className='content'>
            <div className='field has-addons is-fullwidth'>
              <p className='control is-expanded'>
                <span className='select is-fullwidth'>
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
                </span>
              </p>
              <p className='control'>
                <a className='button is-info' onClick={() => switchAddIdentityVisibility(true)}>
                  <span className='icon is-small'>
                    <i className='fas fa-plus' />
                  </span>
                </a>
              </p>
              <p className='control'>
                <a
                  className='button is-danger'
                  disabled={!selectedIdentity}
                  onClick={() => removeIdentity(selectedIdentity)}
                >
                  <span className='icon is-small'>
                    <i className='fas fa-trash' />
                  </span>
                </a>
              </p>
            </div>
          </div>
        )}
        {addIdentityVisible && (
          <div className='content'>
            <div className='field has-addons is-fullwidth'>
              <p className='control is-expanded'>
                <input
                  className='input'
                  type='text'
                  placeholder='Address of an ERC-725 identity contract'
                  ref={(input) => { refAddIdentityAddress = input; }}
                />
              </p>
              <p className='control'>
                <a
                  className='button is-success'
                  onClick={() => addIdentity(refAddIdentityAddress.value)}
                >
                  <span className='icon is-small'>
                    <i className='fas fa-check' />
                  </span>
                </a>
              </p>
              <p className='control'>
                <a className='button is-danger' onClick={() => switchAddIdentityVisibility(false)}>
                  <span className='icon is-small'>
                    <i className='fas fa-times' />
                  </span>
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

IdentitySelectorComponent.defaultProps = {
  selectedIdentity: null
};

IdentitySelectorComponent.propTypes = {
  identities: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIdentity: PropTypes.string,
  addIdentityVisible: PropTypes.bool.isRequired,

  selectIdentity: PropTypes.func.isRequired,
  addIdentity: PropTypes.func.isRequired,
  removeIdentity: PropTypes.func.isRequired,
  switchAddIdentityVisibility: PropTypes.func.isRequired
};

export default IdentitySelectorComponent;
