import {
  SELECT_IDENTITY,
  KEY_PURPOSES_FETCHED
} from 'actions/Identity.action';
import { IDENTITY_DEPLOYED } from 'actions/Register.action';

export const initialState = {
  identities: [],
  selectedIdentity: null,
  keyPurposes: []
};

export const IdentityReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDENTITY_DEPLOYED:
      state.identities.push({ address: action.address });
      return {
        ...state
      };

    case SELECT_IDENTITY:
      return {
        ...state,
        selectedIdentity: action.address
      };

    case KEY_PURPOSES_FETCHED:
      return {
        ...state,
        keyPurposes: action.purposes
      };

    default:
      return state;
  }
};
