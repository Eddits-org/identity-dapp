import React from 'react';
import PropTypes from 'prop-types';

import {toEthString} from 'utils/Eth.utils';

const AddFranceConnectClaimComponent = ({
      fcClaimCost,
      fcResponse,
      confirmAddFranceConnectClaim,
      closeAddClaim
    }) => (
  <div className='box'>
    <h5 className='title is-5'>Add a FranceConnect claim</h5>
    <div className='content'>
      {!fcResponse && (
        <div>
          <span className='icon is-medium'>
            <i className='fas fa-sync-alt fa-spin'/>
          </span>
            Generate a FranceConnect request, please wait.
            You will be redirected to FranceConnect for authentication...
        </div>
      )}
      {fcResponse && (
        <div>
          <p>The following claim will be added to your identity:</p>
          <table className='table is-narrow is-bordered'>
            <tbody>
            <tr>
              <th>FranceConnect Identifier</th>
              <td>{JSON.parse(fcResponse.jwt).sub}</td>
            </tr>
            </tbody>
          </table>
          <div className='field'>
            FranceConnect claim cost:&nbsp;
            {fcClaimCost === null && <span>Fetching...</span>}
            {fcClaimCost !== null && (
              <span>
                <strong>{toEthString(fcClaimCost)} ETH</strong>&nbsp;
                <small>(plus transaction fees)</small>
              </span>
            )}
          </div>
          <div className='field is-grouped'>
            <div className='control'>
              <button
                className='button is-success'
                disabled={fcClaimCost === null}
                onClick={confirmAddFranceConnectClaim}
              >
                Confirm this claim
              </button>
            </div>
            <div className='control'>
              <button className='button is-danger' onClick={closeAddClaim}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} 
    </div>
  </div>
);

AddFranceConnectClaimComponent.defaultProps = {
  fcClaimCost: null,
  fcResponse: null
};

AddFranceConnectClaimComponent.propTypes = {
  fcClaimCost: PropTypes.object,
  fcResponse: PropTypes.object,
  confirmAddFranceConnectClaim: PropTypes.func.isRequired,
  closeAddClaim: PropTypes.func.isRequired
};

export default AddFranceConnectClaimComponent;
