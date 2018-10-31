import { connect } from 'react-redux';

import { openAddLuxTrustClaim, confirmAddLuxTrustClaim, openAddEstonianIDClaim, closeAddClaim, confirmAddEstonianIDClaim, openAddFranceConnectClaim, verifyContractClaim, closeClaimDetails, requestSOClaim, confirmAddFranceConnectClaim } from 'actions/Claims.action';
import TabClaimsComponent from 'components/manage/TabClaims.component';

const mapStateToProps = store => ({
  claims: store.claims.claims,
  keys: store.keyMgt.keys,
  keyPurposes: store.identity.keyPurposes,
  addClaim: store.claims.addClaim,
  samlRequest: store.claims.samlRequest,
  orelyResponse: store.claims.orelyResponse,
  ltClaimCost: store.claims.ltClaimCost,
  fcClaimCost: store.claims.fcClaimCost,
  estCert: store.claims.estCert,
  estClaimCost: store.claims.estClaimCost,
  claimDetails: store.claims.claimDetails,
  available: store.claims.available
});

const mapDispatchToProps = dispatch => ({
  closeAddClaim: () => dispatch(closeAddClaim()),
  openAddLuxTrustClaim: () => dispatch(openAddLuxTrustClaim()),
  confirmAddLuxTrustClaim: () => dispatch(confirmAddLuxTrustClaim()),
  openAddEstonianIDClaim: () => dispatch(openAddEstonianIDClaim()),
  confirmAddEstonianIDClaim: () => dispatch(confirmAddEstonianIDClaim()),
  openAddFranceConnectClaim: () => dispatch(openAddFranceConnectClaim()),
  confirmAddFranceConnectClaim: () => dispatch(confirmAddFranceConnectClaim()),
  verifyContractClaim: (issuer, data) => dispatch(verifyContractClaim(issuer, data)),
  closeClaimDetails: () => dispatch(closeClaimDetails()),
  requestSOClaim: () => dispatch(requestSOClaim())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabClaimsComponent);
