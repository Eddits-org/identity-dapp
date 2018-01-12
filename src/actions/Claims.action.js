import Web3 from 'services/Web3.service';
import Orely from 'services/Orely.service';
import LTClaimRegistry from 'services/LTClaimRegistry.service';
import { Identity } from 'services/Identity.service';

import { addPendingTx, removePendingTx, fetchIdentityDetail } from 'actions/Manage.action';

const config = require('config.json');

export const ADD_CLAIM_OPENED = 'ADD_CLAIM_OPENED';
export const SAML_REQUEST_FETCHED = 'SAML_REQUEST_FETCHED';
export const ADD_CLAIM_CLOSED = 'ADD_CLAIM_CLOSED';
export const CLAIM_COST_FETCHED = 'CLAIM_COST_FETCHED';

export const fetchClaimCost = () => (dispatch) => {
  LTClaimRegistry.getCost().then((cost) => {
    dispatch({
      type: CLAIM_COST_FETCHED,
      cost
    });
  });
};

export const openAddLuxTrustClaim = () => (dispatch, getState) => {
  dispatch({
    type: ADD_CLAIM_OPENED,
    claim: 'LT'
  });
  const identity = getState().identity.selectedIdentity;
  Orely.generateSAMLRequest(identity).then((request) => {
    dispatch({
      type: SAML_REQUEST_FETCHED,
      request: request.saml_request
    });
  });
};

export const closeAddLuxTrustClaim = () => ({
  type: ADD_CLAIM_CLOSED
});

export const confirmAddLuxTrustClaim = () => (dispatch, getState) => {
  const { orelyResponse } = getState().claims;
  const calldata = LTClaimRegistry.generateCertifyRequest(
    orelyResponse.signed_info,
    orelyResponse.signed_info_signature,
    orelyResponse.manifest,
    orelyResponse.signer_certificate
  );
  const identity = getState().identity.selectedIdentity;
  const ltClaimRegistry = config.LTClaimRegistry.address;
  const value = getState().claims.ltClaimCost;
  const from = getState().network.account;
  const id = new Identity(identity);
  id.execute(ltClaimRegistry, value.toNumber(), calldata, from).then((txHash) => {
    dispatch(addPendingTx(txHash, 'Add LuxTrust claim'));
    dispatch(closeAddLuxTrustClaim());
    Web3.waitForMining(txHash).then(() => {
      dispatch(removePendingTx(txHash));
      dispatch(fetchIdentityDetail(identity));
    });
  });
};
