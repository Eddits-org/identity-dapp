import { Identity } from 'services/Identity.service';
import { fetchIdentityDetail } from 'actions/Manage.action';

export const SELECT_IDENTITY = 'SELECT_IDENTITY';
export const KEY_PURPOSES_FETCHED = 'KEY_PURPOSES_FETCHED';

export const checkKeyPurposes = (key, identityAddress) => (dispatch) => {
  const id = new Identity(identityAddress);
  id.getKeyPurpose(key).then((purposes) => {
    dispatch({ type: KEY_PURPOSES_FETCHED, purposes });
  });
};

export const selectIdentity = address => (dispatch, getState) => {
  const key = getState().network.account;
  if (!!key && address) dispatch(checkKeyPurposes(key, address));
  if (address) dispatch(fetchIdentityDetail(address));
  else dispatch({ type: KEY_PURPOSES_FETCHED, purposes: [] });
  dispatch({ type: SELECT_IDENTITY, address: address || null });
};
