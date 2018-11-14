import { Identity } from 'services/Identity.service';
import Storage from 'services/Storage.service';
import { fetchIdentityDetail } from 'actions/Manage.action';
import Web3 from 'services/Web3.service';

export const SELECT_IDENTITY = 'SELECT_IDENTITY';
export const KEY_PURPOSES_FETCHED = 'KEY_PURPOSES_FETCHED';
export const IDENTITY_ADDEDD = 'IDENTITY_ADDED';
export const IDENTITY_REMOVED = 'IDENTITY_REMOVED';
export const ADD_IDENTITY_VISIBILITY_CHANGED = 'ADD_IDENTITY_VISIBILITY_CHANGED';
export const SET_IDENTITY_OPERATION_RESULT = 'SET_IDENTITY_OPERATION_RESULT';

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

export const switchAddIdentityVisibility = value => ({
  type: ADD_IDENTITY_VISIBILITY_CHANGED,
  value
});

export const setIdentityOperationResult = (state, message) => ({
  type: SET_IDENTITY_OPERATION_RESULT,
  state,
  message
});



export const addIdentity = address => (dispatch) => {
  if(Web3.web3._extend.utils.isAddress(address) === false) {
    dispatch(setIdentityOperationResult(false, "This is not a valid address."));
    return;
  }
  
  dispatch({
    type: IDENTITY_ADDEDD,
    address
  });
  dispatch(switchAddIdentityVisibility(false));
  dispatch(selectIdentity(address));
  dispatch(setIdentityOperationResult(true, "Congratulation, your identity is added."));

};

export const removeIdentity = address => (dispatch) => {

  dispatch({
    type: IDENTITY_REMOVED,
    address
  });
  dispatch(switchAddIdentityVisibility(false));
  dispatch(selectIdentity(null));
};
