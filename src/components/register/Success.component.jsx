import React from 'react';
import PropTypes from 'prop-types';

const SuccessComopnent = ({ address, network }) => (
  <div>
    <span className='icon has-text-success'>
      <i className='fa fa-check' />
    </span>
    <span style={{ marginLeft: '5px' }}>
      Your Identity contract has been deployed at address&nbsp;
      <strong><a href={`${network.etherscan}/address/${address}`} target='blank'>{address}</a></strong>.
    </span>
  </div>
);

SuccessComopnent.propTypes = {
  address: PropTypes.string.isRequired,
  network: PropTypes.object.isRequired
};

export default SuccessComopnent;
