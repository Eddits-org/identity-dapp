import JWT from 'services/JWT.service';
import { generateId } from 'utils/Keys.util';
import { Identity, KEYS_PURPOSES } from 'services/Identity.service';

export const LOGIN_RESPONSE_SIGNED = 'LOGIN_RESPONSE_SIGNED';
export const LOGIN_REQUEST_SIGNER_VALIDATED = 'LOGIN_REQUEST_SIGNER_VALIDATED';

export const login = (sp, account, identity, redirect, state) => (dispatch) => {
  const payload = {
    sub: identity,
    aud: sp,
    iat: Math.floor(Date.now() / 1000),
    jti: generateId(10)
  };
  if (state) payload.state = state;
  JWT.sign(payload, account).then((token) => {
    const redirectionURL = `${redirect}#token=${token}`;
    dispatch({ type: LOGIN_RESPONSE_SIGNED, redirectionURL });
  });
};

const loginRequestSignerValidated = valid => ({
  type: LOGIN_REQUEST_SIGNER_VALIDATED,
  valid
});

export const validateLoginRequestSigner = () => (dispatch, getState) => {
  const request = getState().login.loginRequest;
  if (request.formatValid && request.signatureValid) {
    new Identity(request.identity)
      .getKeyPurpose(request.signer)
      .then(purposes => !!purposes.find(p => p === KEYS_PURPOSES.ACTION))
      .then(isActionKey => dispatch(loginRequestSignerValidated(isActionKey)));
  } else {
    dispatch(loginRequestSignerValidated(false));
  }
};
