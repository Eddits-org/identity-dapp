import React from 'react';
import PropTypes from 'prop-types';

const WaitDeployComponent = ({ txHash, network }) => (
  <div className='has-text-centered'>
    <span className='icon is-medium'>
      <i className='fa fa-refresh fa-spin' />
    </span>
    Please wait for the mining of the transaction <a target='blank' href={`${network.etherscan}/tx/${txHash}`}>{txHash}</a>...
  </div>
);

WaitDeployComponent.defaultProps = {
  txHash: null
};

WaitDeployComponent.propTypes = {
  network: PropTypes.object.isRequired,
  txHash: PropTypes.string
};

export default WaitDeployComponent;
