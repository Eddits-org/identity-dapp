import BigNumber from 'bignumber.js';

import {
  ADD_CLAIM_OPENED,
  SAML_REQUEST_FETCHED,
  CERT_REQUEST_FETCHED,
  ADD_CLAIM_CLOSED,
  LTCLAIM_COST_FETCHED,
  FCCLAIM_COST_FETCHED,
  CLAIM_DETAILS_FETCHED,
  CLAIM_DETAILS_CLOSED,
  LTCLAIM_AVAILABLE,
  SOCLAIM_AVAILABLE,
  FCCLAIM_AVAILABLE
} from 'actions/Claims.action';

import { IDENTITY_CLAIMS_FETCHED } from 'actions/Manage.action';

export const initialState = {
  claims: [],
  addClaim: null,
  samlRequest: null,
  orelyResponse: null,
  ltClaimCost: null,
  fcClaimCost: null,
  estClaimCost: new BigNumber(0),
  claimDetails: null,
  available: {
    'LT': false,
    'SO': false,
    'FC': false
  }
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

    case LTCLAIM_AVAILABLE:
      return {
        ...state,
        available: { ...state.available, ['LT'] : action.available }
      };

    case SOCLAIM_AVAILABLE:
      return {
        ...state,
        available: { ...state.available, ['SO'] : action.available }
      };

    case FCCLAIM_AVAILABLE:
      return {
        ...state,
        available: { ...state.available, ['FC'] : action.available }
      };

    case SAML_REQUEST_FETCHED:
      return {
        ...state,
        samlRequest: action.request
      };

    case CERT_REQUEST_FETCHED:
      return {
        ...state,
        estCert: action.estCert
      };

    case ADD_CLAIM_CLOSED:
      return {
        ...state,
        samlRequest: null,
        addClaim: null,
        orelyResponse: null
      };

    case LTCLAIM_COST_FETCHED:
      return {
        ...state,
        ltClaimCost: action.cost
      };
    
    case FCCLAIM_COST_FETCHED:
      return {
        ...state,
        fcClaimCost: action.cost
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
