import * as util from 'ethereumjs-util';
import sha3 from 'crypto-js/sha3';

import { emptyLoginRequest } from 'reducers/Login.reducer';

const decodeRequest = (request) => {
  // First, decode the token and validate the format
  let rawLoginRequest = null;
  let signature = null;
  try {
    const parsed = JSON.parse(Buffer.from(request, 'base64'));
    if (!parsed || !parsed.loginRequest || !parsed.signature) {
      return {
        formatValid: false,
        error: 'Invalid token format'
      };
    }
    rawLoginRequest = parsed.loginRequest;
    // eslint-disable-next-line prefer-destructuring
    signature = parsed.signature;
  } catch (e) {
    return {
      formatValid: false,
      error: 'Cannot decode token'
    };
  }
  // If token is OK, decode the loginRequest and validate the format
  try {
    const parsed = JSON.parse(Buffer.from(rawLoginRequest, 'base64'));
    if (!parsed || !parsed.identity || !parsed.redirect) {
      return {
        formatValid: false,
        error: 'Invalid loginRequest format'
      };
    }
    return {
      rawLoginRequest,
      signature,

      identity: parsed.identity,
      redirect: parsed.redirect,
      state: parsed.state || null,

      formatValid: true
    };
  } catch (e) {
    return {
      formatValid: false,
      error: 'Cannot decode loginRequest'
    };
  }
};

const validateSignature = (request) => {
  if (!request.formatValid) return request;
  try {
    // Compute rawLoginRequest hash
    const hash = Buffer.from(
      sha3(request.rawLoginRequest, { outputLength: 256 }).toString(),
      'hex'
    );
    // Decode signature
    const signObject = JSON.parse(request.signature);
    const signature = Buffer.from(signObject.data, 'base64');
    const r = signature.slice(0, 32);
    const s = signature.slice(32, 64);
    const v = signObject.recovery + 27;
    const signer = `0x${util.pubToAddress(util.ecrecover(hash, v, r, s)).toString('hex')}`;

    return {
      ...request,
      signer,
      signatureValid: true
    };
  } catch (e) {
    return {
      ...request,
      signatureValid: false,
      error: 'Signature is not valid'
    };
  }
};

export const parseLoginRequest = (request) => {
  const empty = { ...emptyLoginRequest };
  const decoded = decodeRequest(request);
  const signature = validateSignature(decoded);
  return {
    ...empty,
    ...decoded,
    ...signature
  };
};
