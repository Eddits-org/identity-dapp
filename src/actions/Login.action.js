import Web3 from 'services/Web3.service';

export const LOGIN_RESPONSE_SIGNED = 'LOGIN_RESPONSE_SIGNED';

export const login = (nonce, account, identity, redirect) => (dispatch) => {
  const loginResponse = {
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
  });
};
