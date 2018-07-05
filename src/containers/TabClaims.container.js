import { connect } from 'react-redux';

import { openAddLuxTrustClaim, closeAddLuxTrustClaim, confirmAddLuxTrustClaim, openAddEstonianIDClaim, closeAddEstonianIDClaim, confirmAddEstonianIDClaim, verifyContractClaim, closeClaimDetails, requestSOClaim } from 'actions/Claims.action';
import TabClaimsComponent from 'components/manage/TabClaims.component';

const mapStateToProps = store => ({
  claims: store.claims.claims,
  keys: store.keyMgt.keys,
  keyPurposes: store.identity.keyPurposes,
  addClaim: store.claims.addClaim,
  samlRequest: store.claims.samlRequest,
  orelyResponse: store.claims.orelyResponse,
  ltClaimCost: store.claims.ltClaimCost,
  estCert: store.claims.estCert,
  estClaimCost: store.claims.estClaimCost,
  claimDetails: store.claims.claimDetails
});

const mapDispatchToProps = dispatch => ({
  openAddLuxTrustClaim: () => dispatch(openAddLuxTrustClaim()),
  closeAddLuxTrustClaim: () => dispatch(closeAddLuxTrustClaim()),
  confirmAddLuxTrustClaim: () => dispatch(confirmAddLuxTrustClaim()),
  openAddEstonianIDClaim: () => dispatch(openAddEstonianIDClaim()),
  closeAddEstonianIDClaim: () => dispatch(closeAddEstonianIDClaim()),
  confirmAddEstonianIDClaim: () => dispatch(confirmAddEstonianIDClaim()),
  verifyContractClaim: (issuer, data) => dispatch(verifyContractClaim(issuer, data)),
  closeClaimDetails: () => dispatch(closeClaimDetails()),
  requestSOClaim: () => dispatch(requestSOClaim())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabClaimsComponent);
