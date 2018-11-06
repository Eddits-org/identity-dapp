import Web3 from 'services/Web3.service';
import Orely from 'services/Orely.service';
import FC from 'services/FC.service';
import HWCrypto from 'services/HWCrypto.service';
import LTClaimRegistry from 'services/LTClaimRegistry.service';
import SOClaimRegistry from 'services/SOClaimRegistry.service';
import FCClaimRegistry from 'services/FCClaimRegistry.service';
import { Identity } from 'services/Identity.service';

import { addPendingTx, removePendingTx, fetchIdentityDetail } from 'actions/Manage.action';

const config = require('config.json');

export const ADD_CLAIM_OPENED = 'ADD_CLAIM_OPENED';
export const SAML_REQUEST_FETCHED = 'SAML_REQUEST_FETCHED';
export const ADD_CLAIM_CLOSED = 'ADD_CLAIM_CLOSED';
export const LTCLAIM_COST_FETCHED = 'LTCLAIM_COST_FETCHED';
export const FCCLAIM_COST_FETCHED = 'FCCLAIM_COST_FETCHED';
export const CLAIM_DETAILS_FETCHED = 'CLAIM_DETAILS_FETCHED';
export const CLAIM_DETAILS_CLOSED = 'CLAIM_DETAILS_CLOSED';
export const CERT_REQUEST_FETCHED = 'CERT_REQUEST_FETCHED';
export const LTCLAIM_AVAILABLE = 'LTCLAIM_AVAILABLE';
export const SOCLAIM_AVAILABLE = 'SOCLAIM_AVAILABLE';
export const FCCLAIM_AVAILABLE = 'FCCLAIM_AVAILABLE';

const fetchLTClaimCost = () => (dispatch, getState) => {
  LTClaimRegistry.getCost().then((cost) => {
    dispatch({
      type: LTCLAIM_COST_FETCHED,
      cost
    });
  });
};

const fetchLFClaimCost = () => (dispatch, getState) => {
  FCClaimRegistry.getCost().then((cost) => {
    dispatch({
      type: FCCLAIM_COST_FETCHED,
      cost
    });
  });
};

export const closeAddClaim = () => ({
  type: ADD_CLAIM_CLOSED
});

export const ClaimAvailableOnCurrentNetwork = () => (dispatch, getState) => {
  const networkId = getState().network.network.id;
  LTClaimRegistry.isAvailable(networkId).then((available) => {
    dispatch({
      type: LTCLAIM_AVAILABLE,
      available
    });
    if(available) dispatch(fetchLTClaimCost());
  });
  SOClaimRegistry.isAvailable(networkId).then((available) => {
    dispatch({
      type: SOCLAIM_AVAILABLE,
      available
    });
  });
  FCClaimRegistry.isAvailable(networkId).then((available) => {
    dispatch({
      type: FCCLAIM_AVAILABLE,
      available
    });
    if(available) dispatch(fetchLFClaimCost());
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
  const networkId = getState().network.network.id;
  const ltClaimRegistry = config.LTClaimRegistry[networkId].address;
  const from = getState().network.account;
  const id = new Identity(identity);
  id.execute(ltClaimRegistry, ltClaimCost.toNumber(), calldata, from).then((txHash) => {
    dispatch(addPendingTx(txHash, 'Add LuxTrust claim'));
    dispatch(closeAddClaim());
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

export const confirmAddEstonianIDClaim = () => ({
  type: ADD_CLAIM_CLOSED
});

export const openAddFranceConnectClaim = () => (dispatch, getState) => {
  dispatch({
    type: ADD_CLAIM_OPENED,
    claim: 'FC'
  });
  const identity = getState().identity.selectedIdentity;
  FC.generateFCRedirectURL(identity).then((resp) => {
    window.location = resp.url;
  });
};

export const confirmAddFranceConnectClaim = () => (dispatch, getState) => {
  const { fcClaimCost, fcResponse } = getState().claims;
  const calldata = FCClaimRegistry.generateCertifyRequest(
    fcClaimCost,
    fcResponse.jwt,
    fcResponse.signature.r,
    fcResponse.signature.s,
    fcResponse.signature.v
  );
  const identity = getState().identity.selectedIdentity;
  const networkId = getState().network.network.id;
  const fcClaimRegistry = config.FCClaimRegistry[networkId].address;
  const from = getState().network.account;
  const id = new Identity(identity);
  id.execute(fcClaimRegistry, fcClaimCost.toNumber(), calldata, from).then((txHash) => {
    dispatch(addPendingTx(txHash, 'Add FranceConnect claim'));
    dispatch(closeAddClaim());
    Web3.waitForMining(txHash).then(() => {
      dispatch(removePendingTx(txHash));
      dispatch(fetchIdentityDetail(identity));
    });
  });
};

export const verifyContractClaim = (issuer, data) => (dispatch, getState) => {
  const networkId = getState().network.network.id;
  if (issuer === config.LTClaimRegistry[networkId].address)
    LTClaimRegistry.verifyClaim(data)
      .then((details) => {
        dispatch({
          type: CLAIM_DETAILS_FETCHED,
          details
        });
      });
  else if(issuer === config.FCClaimRegistry[networkId].address)
    FCClaimRegistry.verifyClaim(data)
    .then((details) => {
      dispatch({
        type: CLAIM_DETAILS_FETCHED,
        details
      });
    });
  // TODO handle unknown claim issuer
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
