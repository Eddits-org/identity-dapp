/* eslint-disable */
import Web3 from 'services/Web3.service';
import JWT from 'services/JWT.service';

export const LOGIN_RESPONSE_SIGNED = 'LOGIN_RESPONSE_SIGNED';
export const LOGIN_REQUEST_SIGNER_VALIDATED = 'LOGIN_REQUEST_SIGNER_VALIDATED';

export const login = (nonce, account, identity, redirect) => (dispatch) => {
  const loginResponse = {
    identity,
    nonce
  };
  JWT.sign(loginResponse, account).then((token) => {
    const redirectionURL = `${redirect}${redirect.indexOf('?') >= 0 ? '&' : '?'}token=${token}`;
    dispatch({ type: LOGIN_RESPONSE_SIGNED, redirectionURL })
  });
  /*const loginResponse = {
    identity,
    nonce
  };
  const base64 = Buffer.from(JSON.stringify(loginResponse)).toString('base64');
  const encoded = `0x${Buffer.from(base64, 'utf8').toString('hex')}`;
  Web3.sign(account, encoded).then((signature) => {
    const base64signature = Buffer.from(signature.substring(2), 'hex').toString('base64');
    const response = {
      loginResponse: base64,
      signature: base64signature
    };
    const base64response = Buffer.from(JSON.stringify(response)).toString('base64');
    const redirectionURL = `${redirect}${base64response}`;
    dispatch({ type: LOGIN_RESPONSE_SIGNED, redirectionURL });
  });*/
};

const loginRequestSignerValidated = valid => ({
  type: LOGIN_REQUEST_SIGNER_VALIDATED,
  valid
});

export const validateLoginRequestSigner = () => (dispatch, getState) => {
  const request = getState().login.loginRequest;
  if(request.formatValid && request.signatureValid) {
    console.log('Check if key ' + request.signer + ' is linked to identity ' + request.identity);
    dispatch(loginRequestSignerValidated(true));
  }
  else {
    console.log('Login request is not valid...');
    dispatch(loginRequestSignerValidated(false));
  }
};