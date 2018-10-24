import Web3 from 'services/Web3.service';
import Orely from 'services/Orely.service';
import HWCrypto from 'services/HWCrypto.service';
import LTClaimRegistry from 'services/LTClaimRegistry.service';
import SOClaimRegistry from 'services/SOClaimRegistry.service';
import { Identity } from 'services/Identity.service';

import { addPendingTx, removePendingTx, fetchIdentityDetail } from 'actions/Manage.action';

const config = require('config.json');

export const ADD_CLAIM_OPENED = 'ADD_CLAIM_OPENED';
export const SAML_REQUEST_FETCHED = 'SAML_REQUEST_FETCHED';
export const ADD_CLAIM_CLOSED = 'ADD_CLAIM_CLOSED';
export const CLAIM_COST_FETCHED = 'CLAIM_COST_FETCHED';
export const CLAIM_DETAILS_FETCHED = 'CLAIM_DETAILS_FETCHED';
export const CLAIM_DETAILS_CLOSED = 'CLAIM_DETAILS_CLOSED';
export const CERT_REQUEST_FETCHED = 'CERT_REQUEST_FETCHED';
export const LTCLAIM_AVAILABLE = 'LTCLAIM_AVAILABLE';
export const SOCLAIM_AVAILABLE = 'SOCLAIM_AVAILABLE';

export const fetchClaimCost = () => (dispatch, getState) => {
  LTClaimRegistry.getCost().then((cost) => {
    dispatch({
      type: CLAIM_COST_FETCHED,
      cost
    });
  });
};

export const ClaimAvailableOnCurrentNetwork = () => (dispatch, getState) => {
  const networkId = getState().network.network.id;
  LTClaimRegistry.isAvailable(networkId).then((available) => {
    dispatch({
      type: LTCLAIM_AVAILABLE,
      available
    });
  });
  SOClaimRegistry.isAvailable(networkId).then((available) => {
    dispatch({
      type: SOCLAIM_AVAILABLE,
      available
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
  const { orelyResponse, ltClaimCost } = getState().claims;
  const calldata = LTClaimRegistry.generateCertifyRequest(
    ltClaimCost,
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

export const openAddEstonianIDClaim = () => (dispatch, getState) => {
  dispatch({
    type: ADD_CLAIM_OPENED,
    claim: 'EST'
  });
  const identity = getState().identity.selectedIdentity;
  HWCrypto.getCertificate(identity).then((cert) => {
    dispatch({
      type: CERT_REQUEST_FETCHED,
      estCert: cert
    });
  });
};

export const closeAddEstonianIDClaim = () => ({
  type: ADD_CLAIM_CLOSED
});

export const confirmAddEstonianIDClaim = () => ({
  type: ADD_CLAIM_CLOSED
});


export const verifyContractClaim = (issuer, data) => (dispatch) => {
  LTClaimRegistry.verifyClaim(issuer, data)
    .then((details) => {
      dispatch({
        type: CLAIM_DETAILS_FETCHED,
        details
      });
    });
};

export const closeClaimDetails = () => ({
  type: CLAIM_DETAILS_CLOSED
});

export const requestSOClaim = () => (dispatch, getState) => {
  const networkId = getState().network.network.id;
  const calldata = SOClaimRegistry.generateRequestClaim();
  const identity = getState().identity.selectedIdentity;
  const soClaimRegistry = config.SOClaimRegistry[networkId].address;
  const from = getState().network.account;
  const id = new Identity(identity);
  id.execute(soClaimRegistry, 0, calldata, from).then((txHash) => {
    dispatch(addPendingTx(txHash, 'Request a SmartOversight claim'));
    Web3.waitForMining(txHash).then(() => {
      dispatch(removePendingTx(txHash));
      dispatch(fetchIdentityDetail(identity));
    });
  });
};
