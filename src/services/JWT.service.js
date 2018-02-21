import * as ethutil from 'ethereumjs-util';
// import sha3 from 'crypto-js/sha3';

import base64url from 'base64url';
import SignStream from 'jws/lib/sign-stream';
import * as util from 'util';

const toString = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || Buffer.isBuffer(value)) {
    return value.toString();
  }
  return JSON.stringify(value);
};

const jwsSecuredInput = (header, payload, encoding) => {
  const encodedHeader = base64url(toString(header), 'binary');
  const encodedPayload = base64url(toString(payload), encoding);
  return util.format('%s.%s', encodedHeader, encodedPayload);
};

const jwsSign = opts => new Promise((resolve, reject) => {
  const { header, payload } = opts;
  const securedInput = jwsSecuredInput(header, payload, opts.encoding || 'utf8');
  const encoded = `0x${Buffer.from(securedInput, 'utf8').toString('hex')}`;
  const params = [encoded, '0x46f19554296d59f3400895f7e3e06d3bfb4f574f'];
  window.web3.currentProvider.sendAsync({
    method: 'personal_sign',
    params,
    from: '0x46f19554296d59f3400895f7e3e06d3bfb4f574f'
  }, (err, signature) => {
    if (err) return reject(err);
    const decoded = Buffer.from(signature.result.substring(2), 'hex');
    return resolve(util.format('%s.%s', securedInput, base64url(decoded)));
  });
});

function sign() {
  jwsSign({
    header: this.header,
    payload: this.payload.buffer,
    secret: this.secret.buffer,
    encoding: this.encoding
  })
    .then((signature) => {
      this.emit('done', signature);
      this.emit('data', signature);
      this.emit('end');
      this.readable = false;
    })
    .catch((error) => {
      this.readable = false;
      this.emit('error', error);
      this.emit('close');
    });
}

SignStream.prototype.sign = sign;

class JWTService {
  sign(account) {
    const payload = {
      sub: 'Antoine Detante'
    };

    const header = {
      alg: 'ESK256'
    };

    // eslint-disable-next-line
    new SignStream({
      provider: window.web3.currentProvider,
      signer: account,
      encoding: 'utf8',
      secret: ' ',
      header,
      payload
    })
      .once('done', (signature) => {
        console.log(signature);
        /* eslint-disable */
        const [h, p, encodedSign] = signature.split('.');
        const decodedSign = Buffer.from(base64url.toBase64(encodedSign), 'base64');
        const msg = Buffer.from(util.format('%s.%s', h, p), 'utf8');
        const hash = ethutil.hashPersonalMessage(msg);
        const sigParams = ethutil.fromRpcSig(decodedSign);
        const signerPublicKey = ethutil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s);
        const signerAddress = `0x${ethutil.publicToAddress(signerPublicKey).toString('hex')}`;
        console.log(signerAddress);
        // Validation
      });
  }
}

export default new JWTService();
