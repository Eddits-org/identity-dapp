import {
  ADD_CLAIM_OPENED,
  SAML_REQUEST_FETCHED,
  ADD_CLAIM_CLOSED,
  CLAIM_COST_FETCHED
} from 'actions/Claims.action';

export const initialState = {
  addClaim: null,
  samlRequest: null,
  orelyResponse: null,
  ltClaimCost: null
};

export const ClaimsReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
