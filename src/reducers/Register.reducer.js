import {
  FETCH_COST,
  COST_ESTIMATED,
  DEPLOY_IDENTITY_REQUESTED,
  WAIT_IDENTITY_MINING,
  IDENTITY_DEPLOYED,
  RESET_DEPLOYMENT
} from 'actions/Register.action';

export const initialState = {
  fetchingCost: false,
  cost: '',
  deploying: false,
  txHash: null,
  // address: '0x07d2469d84725d8ca12dd15a5dada88bc39247a8'
  address: null
};

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COST:
      return {
        ...state,
        fetchingCost: true
      };
    case COST_ESTIMATED:
      return {
        ...state,
        fetchingCost: false,
        cost: action.cost.eth
      };
    case DEPLOY_IDENTITY_REQUESTED:
      return {
        ...state,
        deploying: true
      };
    case WAIT_IDENTITY_MINING:
      return {
        ...state,
        txHash: action.txHash,
        address: null
      };
    case IDENTITY_DEPLOYED:
      return {
        ...state,
        deploying: false,
        address: action.address
      };
    case RESET_DEPLOYMENT:
      return {
        ...state,
        deploying: false,
        address: null
      };

    default:
      return state;
  }
};
