import React from 'react';
import PropTypes from 'prop-types';

import { KEYS_PURPOSES } from 'services/Identity.service';
import { DropdownButton } from 'components/DropdownButton.component';
import AddLuxTrustClaim from './claims/AddLuxTrustClaim.component';
import AddEstonianIDClaim from './claims/AddEstonianIDClaim.component';
import ClaimRow from './claims/ClaimRow.component';
import ClaimDetailsModal from './claims/ClaimDetailsModal.component';

const TabClaimsComponent = ({
  claims,
  keys,
  keyPurposes,
  addClaim,
  samlRequest,
  orelyResponse,
  available,
  ltClaimCost,
  estCert,
  estClaimCost,
  claimDetails,
  openAddLuxTrustClaim,
  closeAddLuxTrustClaim,
  confirmAddLuxTrustClaim,
  openAddEstonianIDClaim,
  closeAddEstonianIDClaim,
  confirmAddEstonianIDClaim,
  verifyContractClaim,
  closeClaimDetails,
  fetchClaimCost,
  requestSOClaim
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
            label: 'LuxTrust identity',
            onClick: openAddLuxTrustClaim
          },
          {
            label: 'Estonian identity',
            onClick: openAddEstonianIDClaim
          },
          {
            label: 'SmartOversight claim',
            onClick: requestSOClaim
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
        ltClaimCost,
        fetchClaimCost,
        available
      }}
      />
     ) }
    {addClaim === 'EST' && (
      <AddEstonianIDClaim {...{
        samlRequest,
        orelyResponse,
        closeAddEstonianIDClaim,
        confirmAddEstonianIDClaim,
        estClaimCost
      }}
      />
    )}
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
  estCert: null,
  ltClaimCost: null,
  estClaimCost: null,
  claimDetails: null
};

TabClaimsComponent.propTypes = {
  claims: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,
  addClaim: PropTypes.string,
  samlRequest: PropTypes.string,
  orelyResponse: PropTypes.object,
  estCert: PropTypes.object,
  ltClaimCost: PropTypes.object,
  estClaimCost: PropTypes.object,
  claimDetails: PropTypes.object,
  available: PropTypes.bool,

  openAddLuxTrustClaim: PropTypes.func.isRequired,
  fetchClaimCost: PropTypes.func.isRequired,
  closeAddLuxTrustClaim: PropTypes.func.isRequired,
  confirmAddLuxTrustClaim: PropTypes.func.isRequired,

  openAddEstonianIDClaim: PropTypes.func.isRequired,
  closeAddEstonianIDClaim: PropTypes.func.isRequired,
  confirmAddEstonianIDClaim: PropTypes.func.isRequired,

  verifyContractClaim: PropTypes.func.isRequired,
  closeClaimDetails: PropTypes.func.isRequired,
  requestSOClaim: PropTypes.func.isRequired
};

export default TabClaimsComponent;
