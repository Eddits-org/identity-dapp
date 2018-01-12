import * as util from 'ethereumjs-util';
import sha3 from 'crypto-js/sha3';

export const validateLoginRequestSignature = (request) => {
  try {
    const hash = Buffer.from(
      sha3(request.loginRequest, { outputLength: 256 }).toString(),
      'hex'
    );
    const signObject = JSON.parse(request.signature);
    const signature = Buffer.from(signObject.data, 'base64');
    const r = signature.slice(0, 32);
    const s = signature.slice(32, 64);
    const v = signObject.recovery + 27;
    const signer = util.pubToAddress(util.ecrecover(hash, v, r, s)).toString('hex');
    const { address } = JSON.parse(Buffer.from(request.loginRequest, 'base64'));
    return `0x${signer}` === address;
  } catch (e) {
    return false;
  }
};
