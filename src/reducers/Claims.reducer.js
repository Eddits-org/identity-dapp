import {
  ADD_CLAIM_OPENED,
  SAML_REQUEST_FETCHED,
  CERT_REQUEST_FETCHED,
  ADD_CLAIM_CLOSED,
  CLAIM_COST_FETCHED,
  CLAIM_DETAILS_FETCHED,
  CLAIM_DETAILS_CLOSED
} from 'actions/Claims.action';

import { IDENTITY_CLAIMS_FETCHED } from 'actions/Manage.action';

export const initialState = {
  claims: [],
  addClaim: null,
  samlRequest: null,
  orelyResponse: null,
  ltClaimCost: null,
  claimDetails: null
};

export const ClaimsReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDENTITY_CLAIMS_FETCHED:
      return {
        ...state,
        claims: action.claims
      };

    case ADD_CLAIM_OPENED:
      return {
        ...state,
        addClaim: action.claim
      };

    case SAML_REQUEST_FETCHED:
      return {
        ...state,
        samlRequest: action.request
      };

    case CERT_REQUEST_FETCHED:
      return {
        ...state,
        certificate: action.estCert
      };

    case ADD_CLAIM_CLOSED:
      return {
        ...state,
        samlRequest: null,
        addClaim: null,
        orelyResponse: null
      };

    case CLAIM_COST_FETCHED:
      return {
        ...state,
        ltClaimCost: action.cost
      };

    case CLAIM_DETAILS_FETCHED:
      return {
        ...state,
        claimDetails: action.details
      };

    case CLAIM_DETAILS_CLOSED:
      return {
        ...state,
        claimDetails: null
      };

    default:
      return state;
  }
};
