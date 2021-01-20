import React from 'react';
import PropTypes from 'prop-types';

import { KEYS_PURPOSES } from 'services/Identity.service';
import { DropdownButton } from 'components/DropdownButton.component';
import AddLuxTrustClaim from './claims/AddLuxTrustClaim.component';
import AddEstonianIDClaim from './claims/AddEstonianIDClaim.component';
import AddFranceConnectClaim from './claims/AddFranceConnectClaim.component';
import ClaimRow from './claims/ClaimRow.component';
import ClaimDetailsModal from './claims/ClaimDetailsModal.component';

const TabClaimsComponent = ({
  claims,
  keys,
  keyPurposes,
  addClaim,
  samlRequest,
  orelyResponse,
  fcResponse,
  available,
  ltClaimCost,
  fcClaimCost,
  estCert,
  estClaimCost,
  claimDetails,
  openAddLuxTrustClaim,
  closeAddClaim,
  confirmAddLuxTrustClaim,
  openAddEstonianIDClaim,
  confirmAddEstonianIDClaim,
  openAddFranceConnectClaim,
  confirmAddFranceConnectClaim,
  verifyContractClaim,
  closeClaimDetails,
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
            onClick: openAddLuxTrustClaim,
            available: available['LT']
          },
          {
            label: 'Estonian identity',
            onClick: openAddEstonianIDClaim,
            available : true
          },
          {
            label: 'SmartOversight claim',
            onClick: requestSOClaim,
            available: available['SO']
          },
          {
            label: 'FranceConnect claim',
            onClick: openAddFranceConnectClaim,
            available: available['FC']
          }
        ]}
      />
    )}
    {addClaim === 'LT' && (
      <AddLuxTrustClaim {...{
        samlRequest,
        orelyResponse,
        closeAddClaim,
        confirmAddLuxTrustClaim,
        ltClaimCost
      }}
      />
     ) }
    {addClaim === 'EST' && (
      <AddEstonianIDClaim {...{
        estCert,
        estClaimCost,
        closeAddClaim,
        confirmAddEstonianIDClaim
      }}
      />
    )}
    {addClaim === 'FC' && (
      <AddFranceConnectClaim {...{
        fcClaimCost,
        fcResponse,
        confirmAddFranceConnectClaim,
        closeAddClaim
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
  fcResponse: null,
  estCert: null,
  ltClaimCost: null,
  estClaimCost: null,
  claimDetails: null,
  fcRedirectUrl: null
};

TabClaimsComponent.propTypes = {
  claims: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,
  addClaim: PropTypes.string,
  samlRequest: PropTypes.string,
  orelyResponse: PropTypes.object,
  fcResponse: PropTypes.object,
  estCert: PropTypes.object,
  fcClaimCost: PropTypes.object,
  ltClaimCost: PropTypes.object,
  estClaimCost: PropTypes.object,
  claimDetails: PropTypes.object,
  available: PropTypes.object,
  fcRedirectUrl: PropTypes.string,

  closeAddClaim: PropTypes.func.isRequired,

  openAddLuxTrustClaim: PropTypes.func.isRequired,
  confirmAddLuxTrustClaim: PropTypes.func.isRequired,

  openAddEstonianIDClaim: PropTypes.func.isRequired,
  confirmAddEstonianIDClaim: PropTypes.func.isRequired,

  openAddFranceConnectClaim: PropTypes.func.isRequired,
  confirmAddFranceConnectClaim: PropTypes.func.isRequired,

  verifyContractClaim: PropTypes.func.isRequired,
  closeClaimDetails: PropTypes.func.isRequired,
  requestSOClaim: PropTypes.func.isRequired
};

export default TabClaimsComponent;
