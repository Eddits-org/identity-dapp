import {
  SELECT_IDENTITY,
  KEY_PURPOSES_FETCHED,
  IDENTITY_ADDEDD,
  IDENTITY_REMOVED,
  ADD_IDENTITY_VISIBILITY_CHANGED,
  SET_IDENTITY_OPERATION_RESULT
} from 'actions/Identity.action';
import { IDENTITY_DEPLOYED } from 'actions/Register.action';

export const initialState = {
  identities: [],
  selectedIdentity: null,
  keyPurposes: [],
  addIdentityVisible: false,
  addIdentityOperationResult: {state: null, message: ''}
};

export const IdentityReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDENTITY_DEPLOYED:
    case IDENTITY_ADDEDD:
      state.identities.push({ address: action.address });
      return {
        ...state
      };

    case IDENTITY_REMOVED:
      return {
        ...state,
        identities: state.identities.filter(id => id.address !== action.address)
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

    case ADD_IDENTITY_VISIBILITY_CHANGED:
      return {
        ...state,
        addIdentityVisible: action.value
      };

    case SET_IDENTITY_OPERATION_RESULT:

      return {
        ...state,
        addIdentityOperationResult: {state: action.state, message: action.message}
      }

    default:
      return state;
  }
};
