import React from 'react';
import PropTypes from 'prop-types';

import {toEthString} from 'utils/Eth.utils';

import Redirect from './Redirect.component';

const extractCN = (str) => {
  const parts = str.split(',');
  const cn = parts.find(p => p.trim().indexOf('CN=') === 0);
  if (!cn) return str;
  return cn.split('=')[1].trim();
};

const extractC = (str) => {
  const parts = str.split(',');
  const cn = parts.find(p => p.trim().indexOf('C=') === 0);
  if (!cn) return str;
  return cn.split('=')[1].trim();
};

const AddLuxTrustClaimComponent = ({
      samlRequest,
      orelyResponse,
      ltClaimCost,
      closeAddClaim,
      confirmAddLuxTrustClaim
    }) => (
  <div className='box'>
    <h5 className='title is-5'>Add a LuxTrust claim</h5>
    <div className='content'>
      {!orelyResponse && (
        <div>
      <span className='icon is-medium'>
        <i className='fas fa-sync-alt fa-spin'/>
      </span>
          Generate a LuxTrust request, please wait.
          You will be redirected to LuxTrust for authentication...
          {samlRequest && <Redirect {...{samlRequest}} />}
        </div>
      )}
      {orelyResponse && (
        <div>
          <p>The following claim will be added to your identity:</p>
          <table className='table is-narrow is-bordered'>
            <tbody>
            <tr>
              <th>Common name</th>
              <td>{extractCN(orelyResponse.subject)}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{extractC(orelyResponse.subject)}</td>
            </tr>
            <tr>
              <th>Issued by</th>
              <td>{extractCN(orelyResponse.issuer)}</td>
            </tr>
            </tbody>
          </table>
          <div className='field'>
            LuxTrust claim cost:&nbsp;
            {ltClaimCost === null && <span>Fetching...</span>}
            {ltClaimCost !== null && (
              <span>
            <strong>{toEthString(ltClaimCost)} ETH</strong>&nbsp;
                <small>(plus transaction fees)</small>
          </span>
            )}
          </div>
          <div className='field is-grouped'>
            <div className='control'>
              <button
                className='button is-success'
                disabled={ltClaimCost === null}
                onClick={confirmAddLuxTrustClaim}
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

AddLuxTrustClaimComponent.defaultProps = {
  samlRequest: null,
  orelyResponse: null,
  ltClaimCost: null,
  available: false
};

AddLuxTrustClaimComponent.propTypes = {
  samlRequest: PropTypes.string,
  orelyResponse: PropTypes.object,
  ltClaimCost: PropTypes.object,

  closeAddClaim: PropTypes.func.isRequired,
  confirmAddLuxTrustClaim: PropTypes.func.isRequired
};

export default AddLuxTrustClaimComponent;
