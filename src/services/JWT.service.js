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
  window.ethereum.request({
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
  sign(payload, account) {
    return new Promise((resolve, reject) => {
      const header = {
        alg: 'ESK256'
      };

      new SignStream({
        provider: window.ethereum,
        signer: account,
        encoding: 'utf8',
        secret: ' ',
        header,
        payload
      })
        .once('done', resolve)
        .once('error', reject);
    });
  }
}

export default new JWTService();
