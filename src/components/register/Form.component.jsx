import React from 'react';
import PropTypes from 'prop-types';

const FormComponent = ({
  account,
  fetchingCost,
  gas,
  cost
}) => (
  <div>
    <p>Management key : <strong>{account}</strong></p>
    {fetchingCost && (
      <div>
        <span className='icon is-medium'>
          <i className='fas fa-sync-alt fa-spin' />
        </span>
        <i>Computing registration cost...</i>
      </div>
    )}
    {!fetchingCost && (
      <p>Estimated cost: <strong>{cost} ETH ({gas} gas)</strong></p>
    )}
  </div>
);

FormComponent.defaultProps = {
  account: null,
  gas: null,
  cost: null
};

FormComponent.propTypes = {
  account: PropTypes.string,
  fetchingCost: PropTypes.bool.isRequired,
  gas: PropTypes.number,
  cost: PropTypes.string
};

export default FormComponent;
