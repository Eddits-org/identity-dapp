import { LOGIN_RESPONSE_SIGNED, LOGIN_REQUEST_SIGNER_VALIDATED } from 'actions/Login.action';

export const emptyLoginRequest = {
  rawLoginRequest: null,
  signature: null,

  nonce: null,
  redirect: null,
  identity: null,

  signer: null,

  formatValid: false,
  signatureValid: false,
  signerValid: false,

  error: null
};

export const initialState = {
  loginRequest: emptyLoginRequest,
  loginRedirectionURL: null,
  isValidatingSigner: true
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_RESPONSE_SIGNED:
      return {
        ...state,
        loginRequest: emptyLoginRequest,
        canLogIn: false,
        isValidatingSigner: true,
        loginRedirectionURL: action.redirectionURL
      };

    case LOGIN_REQUEST_SIGNER_VALIDATED:
      return {
        ...state,
        loginRequest: {
          ...state.loginRequest,
          signerValid: action.valid
        },
        isValidatingSigner: false
      };

    default:
      return state;
  }
};
