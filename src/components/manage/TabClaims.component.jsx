import React from 'react';
import PropTypes from 'prop-types';

import { KEYS_PURPOSES } from 'services/Identity.service';
import { DropdownButton } from 'components/DropdownButton.component';
import AddLuxTrustClaim from './claims/AddLuxTrustClaim.component';

const TabClaimsComponent = ({
  keyPurposes,
  addClaim,
  samlRequest,
  orelyResponse,
  ltClaimCost,
  openAddLuxTrustClaim,
  closeAddLuxTrustClaim,
  confirmAddLuxTrustClaim
}) => (
  <div className='content'>
    <div>TODO: List claims, add a self-signed claim, request an issuer claim</div>
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
  </div>
);

TabClaimsComponent.defaultProps = {
  addClaim: null,
  samlRequest: null,
  orelyResponse: null,
  ltClaimCost: null
};

TabClaimsComponent.propTypes = {
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,
  addClaim: PropTypes.string,
  samlRequest: PropTypes.string,
  orelyResponse: PropTypes.object,
  ltClaimCost: PropTypes.object,

  openAddLuxTrustClaim: PropTypes.func.isRequired,
  closeAddLuxTrustClaim: PropTypes.func.isRequired,
  confirmAddLuxTrustClaim: PropTypes.func.isRequired
};

export default TabClaimsComponent;
