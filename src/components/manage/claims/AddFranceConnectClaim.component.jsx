import React from 'react';
import PropTypes from 'prop-types';

import {toEthString} from 'utils/Eth.utils';

const AddFranceConnectClaimComponent = ({
      fcClaimCost,
      confirmAddFranceConnectClaim
    }) => (
  <div className='box'>
    <h5 className='title is-5'>Add a FranceConnect claim</h5>
    <div className='content'>
      <div>
        <span className='icon is-medium'>
          <i className='fas fa-sync-alt fa-spin'/>
        </span>
          Generate a FranceConnect request, please wait.
          You will be redirected to FranceConnect for authentication...
          <strong>{toEthString(fcClaimCost)} ETH</strong>
          <button onClick={confirmAddFranceConnectClaim}>TEST</button>
      </div>      
    </div>
  </div>
);

AddFranceConnectClaimComponent.defaultProps = {
  fcClaimCost: null
};

AddFranceConnectClaimComponent.propTypes = {
  fcClaimCost: PropTypes.object,
  confirmAddFranceConnectClaim: PropTypes.func.isRequired
};

export default AddFranceConnectClaimComponent;
