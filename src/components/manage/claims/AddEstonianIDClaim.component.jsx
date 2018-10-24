import PropTypes from 'prop-types';
import React from 'react';

import { toEthString } from 'utils/Eth.utils';


const AddEstonianIDClaimComponent = ({
  estCert,
  estClaimCost,
  closeAddEstonianIDClaim,
  confirmAddEstonianIDClaim
}) => (
  <div className='box'>
    <h5 className='title is-5'>Link to an Estonian Digital Identity</h5>
    <div className='content'>
      {!estCert && (
        <div>
          <span className='icon is-medium'>
            <i className='fa fa-refresh fa-spin' />
          </span>
          Verifying Certificate, please wait.
        </div>
     )}
      {estCert && (
        <div>
          <p>The following claim will be added to your identity:</p>
          <table className='table is-narrow is-bordered'>
            <tbody>
            <tr>
              <th>Common name</th>
              <td>{estCert.toString()}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>Issued by</th>
              <td>{}</td>
            </tr>
            </tbody>
          </table>
          <div className='field'>
            Claim cost:&nbsp;
            {estClaimCost === null && <span>Fetching...</span>}
            {estClaimCost !== null && (
              <span>
            <strong>{toEthString(estClaimCost)} ETH</strong>&nbsp;
                <small>(plus transaction fees)</small>
          </span>
            )}
          </div>
          <div className='field is-grouped'>
            <div className='control'>
              <button
                className='button is-success'
                disabled={estClaimCost === null}
                onClick={confirmAddEstonianIDClaim}
              >
                Confirm this claim
              </button>
            </div>
            <div className='control'>
              <button className='button is-danger' onClick={closeAddEstonianIDClaim}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  </div>
);


AddEstonianIDClaimComponent.defaultProps = {
  estCert: null,
  estClaimCost: null
};

AddEstonianIDClaimComponent.propTypes = {
  estCert: PropTypes.object,
  estClaimCost: PropTypes.object,

  closeAddEstonianIDClaim: PropTypes.func.isRequired,
  confirmAddEstonianIDClaim: PropTypes.func.isRequired
};

export default AddEstonianIDClaimComponent;
