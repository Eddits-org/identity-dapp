import U2FService from 'services/U2F.service';

export const U2F_KEY_GENERATED = 'U2F_KEY_GENERATED';

export const generateU2FKey = () => (dispatch, getState) => {
  const identityAddress = getState().identity.selectedIdentity;
  U2FService.registerAuthenticator(identityAddress).then((pubkey) => {
    dispatch({
      type: U2F_KEY_GENERATED,
      pubkey
    });
  })
};
