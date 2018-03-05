import Web3 from 'services/Web3.service';

import { addPendingTx, removePendingTx, fetchIdentityDetail } from 'actions/Manage.action';
import { Identity } from 'services/Identity.service';

export const ADD_KEY_VISIBILITY_SWITCHED = 'ADD_KEY_VISIBILITY_SWITCHED';
export const DUPLICATE_VISIBILITY_SWITCHED = 'DUPLICATE_VISIBILITY_SWITCHED';
export const REMOVE_KEY = 'REMOVE_KEY';

export const switchAddKeyVisibility = visible => ({
  type: ADD_KEY_VISIBILITY_SWITCHED,
  visible
});

export const switchDuplicateKeyVisibility = (visible, key, purpose) => ({
  type: DUPLICATE_VISIBILITY_SWITCHED,
  visible,
  key,
  purpose
});

export const addKey = (key, purpose, type) => (dispatch, getState) => {
  const identityAddress = getState().identity.selectedIdentity;
  const from = getState().network.account;
  const id = new Identity(identityAddress);
  id.addKey(key, purpose, type, from).then((hash) => {
    dispatch(addPendingTx(hash, 'Add new key to identity'));
    dispatch(switchAddKeyVisibility(false));
    Web3.waitForMining(hash).then(() => {
      dispatch(removePendingTx(hash));
      dispatch(fetchIdentityDetail(identityAddress));
    });
  });
};

export const removeKey = (key, purpose) => (dispatch, getState) => {
  const identityAddress = getState().identity.selectedIdentity;
  const from = getState().network.account;
  const id = new Identity(identityAddress);
  id.removeKey(key, purpose, from).then((hash) => {
    dispatch({ type: REMOVE_KEY, key, purpose });
    dispatch(addPendingTx(hash, 'Remove a key from identity'));
    Web3.waitForMining(hash).then(() => {
      dispatch(removePendingTx(hash));
      dispatch(fetchIdentityDetail(identityAddress));
    });
  });
};
