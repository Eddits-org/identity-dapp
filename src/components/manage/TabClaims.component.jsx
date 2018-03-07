import React from 'react';
import PropTypes from 'prop-types';

import { KEYS_PURPOSES } from 'services/Identity.service';
import { DropdownButton } from 'components/DropdownButton.component';
import AddLuxTrustClaim from './claims/AddLuxTrustClaim.component';
import ClaimRow from './claims/ClaimRow.component';
import ClaimDetailsModal from './claims/ClaimDetailsModal.component';

const TabClaimsComponent = ({
  claims,
  keys,
  keyPurposes,
  addClaim,
  samlRequest,
  orelyResponse,
  ltClaimCost,
  claimDetails,
  openAddLuxTrustClaim,
  closeAddLuxTrustClaim,
  confirmAddLuxTrustClaim,
  verifyContractClaim,
  closeClaimDetails
}) => (
  <div className='content'>
    <table className='table is-fullwidth'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Scheme</th>
          <th>Issuer</th>
          <th>Uri</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {claims.map(claim => (
          <ClaimRow
            {...{
              key: claim.id,
              keys,
              verifyContractClaim,
              ...claim
            }}
          />
        ))}
      </tbody>
    </table>
    { !!keyPurposes.find(p => p === KEYS_PURPOSES.MANAGEMENT) && (
      <DropdownButton
        label='Add a claim'
        icon='fa-plus'
        className='is-primary'
        disabled={addClaim !== null}
        items={[
          {
            label: 'Self-signed claim'
          },
          {
            label: 'LuxTrust identity',
            onClick: openAddLuxTrustClaim
          }
        ]}
      />
    )}
    {addClaim === 'LT' && (
      <AddLuxTrustClaim {...{
        samlRequest,
        orelyResponse,
        closeAddLuxTrustClaim,
        confirmAddLuxTrustClaim,
        ltClaimCost
      }}
      />
     ) }
    {!!claimDetails && (
      <ClaimDetailsModal
        details={claimDetails}
        closeDetail={closeClaimDetails}
      />
    )}
  </div>
);

TabClaimsComponent.defaultProps = {
  addClaim: null,
  samlRequest: null,
  orelyResponse: null,
  ltClaimCost: null,
  claimDetails: null
};

TabClaimsComponent.propTypes = {
  claims: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,
  addClaim: PropTypes.string,
  samlRequest: PropTypes.string,
  orelyResponse: PropTypes.object,
  ltClaimCost: PropTypes.object,
  claimDetails: PropTypes.object,

  openAddLuxTrustClaim: PropTypes.func.isRequired,
  closeAddLuxTrustClaim: PropTypes.func.isRequired,
  confirmAddLuxTrustClaim: PropTypes.func.isRequired,
  verifyContractClaim: PropTypes.func.isRequired,
  closeClaimDetails: PropTypes.func.isRequired
};

export default TabClaimsComponent;
