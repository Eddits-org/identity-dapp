import { WEB3_FETCHED, NETWORK_CHANGED, ACCOUNT_CHANGED } from 'actions/Network.action';

export const initialState = {
  providerReady: false,
  network: null,
  account: null
};

export const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEB3_FETCHED:
      return {
        ...state,
        providerReady: action.available
      };
    case NETWORK_CHANGED:
      return {
        ...state,
        network: action.network
      };
    case ACCOUNT_CHANGED:
      return {
        ...state,
        account: action.account
      };

    default:
      return state;
  }
};
