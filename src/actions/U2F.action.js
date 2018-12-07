import U2FService from 'services/U2F.service';
import Web3 from 'services/Web3.service';
import { Identity } from 'services/Identity.service';

import { addPendingTx, removePendingTx, fetchIdentityDetail } from 'actions/Manage.action';

export const U2F_KEY_GENERATED = 'U2F_KEY_GENERATED';
export const U2F_KEY_ADDED = 'U2F_KEY_ADDED';

export const generateU2FKey = () => (dispatch, getState) => {
  const identityAddress = getState().identity.selectedIdentity;
  U2FService.registerAuthenticator(identityAddress).then((registration) => {
    dispatch({
      type: U2F_KEY_GENERATED,
      registration
    });
  })
};

export const addU2FKey = (label) => (dispatch, getState) => {
  const registration = getState().manage.generatedU2Fkey;
  const { rawId } = registration;
  const { attestationObject } = registration.response;
  const identityAddress = getState().identity.selectedIdentity;
  const from = getState().network.account;
  const id = new Identity(identityAddress);
  id.addU2FKey(
    `0x${Buffer.from(rawId).toString('hex')}`,
    label,
    `0x${Buffer.from(attestationObject).toString('hex')}`,
    from
    ).then((hash) => {
      dispatch(addPendingTx(hash, 'Add new U2F key to identity'));
      dispatch({
        type: U2F_KEY_ADDED
      });
      Web3.waitForMining(hash).then(() => {
        dispatch(removePendingTx(hash));
        dispatch(fetchIdentityDetail(identityAddress));
      });
  });
};

export const removeU2FKey = (keyId) => (dispatch, getState) => {
  const identityAddress = getState().identity.selectedIdentity;
  const from = getState().network.account;
  const id = new Identity(identityAddress);
  id.removeU2FKey(keyId, from).then(hash => {
    dispatch(addPendingTx(hash, 'Remove U2F key from identity'));
    Web3.waitForMining(hash).then(() => {
      dispatch(removePendingTx(hash));
      dispatch(fetchIdentityDetail(identityAddress));
    });
  });
};
