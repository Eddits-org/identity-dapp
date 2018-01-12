import { checkKeyPurposes } from 'actions/Identity.action';

export const WEB3_FETCHED = 'WEB3_FETCHED';
export const NETWORK_CHANGED = 'NETWORK_CHANGED';
export const ACCOUNT_CHANGED = 'ACCOUNT_CHANGED';

export const web3Fetched = available => ({
  type: WEB3_FETCHED,
  available
});

export const networkChanged = network => ({
  type: NETWORK_CHANGED,
  network
});

export const accountChanged = account => (dispatch, getState) => {
  const id = getState().identity.selectedIdentity;
  if (!!id && !!account) dispatch(checkKeyPurposes(account, id));
  dispatch({ type: ACCOUNT_CHANGED, account });
};
