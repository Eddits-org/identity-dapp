import { LOGIN_RESPONSE_SIGNED } from 'actions/Login.action';

export const initialState = {
  loginRequest: null,
  loginRedirectionURL: null
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_RESPONSE_SIGNED:
      return {
        ...state,
        loginRequest: null,
        loginRedirectionURL: action.redirectionURL
      };

    default:
      return state;
  }
};
