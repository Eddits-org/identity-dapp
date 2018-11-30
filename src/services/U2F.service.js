class U2FService {

  registerAuthenticator(address) {
    const challenge = Buffer.from(address.startsWith('0x') ? address.slice(2) : address, 'hex');
    return navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { 
          name: "EDDITS"
        },
        user: {
          id: challenge,
          name: address,
          displayName: address
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 }
        ]
      }
    });
  }

}

export default new U2FService();
