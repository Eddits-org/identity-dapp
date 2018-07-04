import { connect } from 'react-redux';

import { openAddLuxTrustClaim, closeAddLuxTrustClaim, confirmAddLuxTrustClaim, verifyContractClaim, closeClaimDetails, requestSOClaim, fetchClaimCost } from 'actions/Claims.action';
import TabClaimsComponent from 'components/manage/TabClaims.component';

const mapStateToProps = store => ({
  claims: store.claims.claims,
  keys: store.keyMgt.keys,
  keyPurposes: store.identity.keyPurposes,
  addClaim: store.claims.addClaim,
  samlRequest: store.claims.samlRequest,
  orelyResponse: store.claims.orelyResponse,
  ltClaimCost: store.claims.ltClaimCost,
  claimDetails: store.claims.claimDetails,
  available: store.claims.available
});

const mapDispatchToProps = dispatch => ({
  openAddLuxTrustClaim: () => dispatch(openAddLuxTrustClaim()),
  closeAddLuxTrustClaim: () => dispatch(closeAddLuxTrustClaim()),
  confirmAddLuxTrustClaim: () => dispatch(confirmAddLuxTrustClaim()),
  verifyContractClaim: (issuer, data) => dispatch(verifyContractClaim(issuer, data)),
  closeClaimDetails: () => dispatch(closeClaimDetails()),
  requestSOClaim: () => dispatch(requestSOClaim()),
  fetchClaimCost: () => dispatch(fetchClaimCost())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabClaimsComponent);
