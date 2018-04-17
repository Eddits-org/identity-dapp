import Web3 from 'services/Web3.service';
import { Identity } from 'services/Identity.service';

export const IDENTITY_BALANCE_FETCHED = 'IDENTITY_BALANCE_FETCHED';
export const IDENTITY_KEYS_FETCHED = 'IDENTITY_KEYS_FETCHED';
export const IDENTITY_CLAIMS_FETCHED = 'IDENTITY_CLAIMS_FETCHED';
export const IDENTITY_DETAIL_TAB_CHANGED = 'IDENTITY_DETAIL_TAB_CHANGED';
export const PENDING_TX_HIDDEN = 'PENDING_TX_HIDDEN';
export const PENDING_TX_ADDED = 'PENDING_TX_ADDED';
export const PENDING_TX_REMOVED = 'PENDING_TX_REMOVED';
export const DEPOSIT_PROCESSING_SWITCHED = 'DEPOSIT_PROCESSING_SWITCHED';

export const fetchIdentityDetail = address => (dispatch) => {
  const id = new Identity(address);
  id.getAllKeys().then((keys) => {
    dispatch({
      type: IDENTITY_KEYS_FETCHED,
      keys
    });
  });
  id.getAllClaims().then((claims) => {
    dispatch({
      type: IDENTITY_CLAIMS_FETCHED,
      claims
    });
  });
  Web3.getBalance(address).then((balance) => {
    dispatch({
      type: IDENTITY_BALANCE_FETCHED,
      balance
    });
  });
};

export const changeIdentityDetailTab = tab => ({
  type: IDENTITY_DETAIL_TAB_CHANGED,
  tab
});

export const addPendingTx = (hash, label) => ({
  type: PENDING_TX_ADDED,
  hash,
  label
});

export const hidePendingTx = hash => ({
  type: PENDING_TX_HIDDEN,
  hash
});

export const removePendingTx = hash => ({
  type: PENDING_TX_REMOVED,
  hash
});

export const deposit = amount => (dispatch, getState) => {
  const from = getState().network.account;
  const identityAddress = getState().identity.selectedIdentity;
  const id = new Identity(identityAddress);
  id.deposit(amount, from).then((hash) => {
    dispatch(addPendingTx(hash, 'Deposit ETH to identity'));
    dispatch({
      type: DEPOSIT_PROCESSING_SWITCHED,
      processing: true
    });
    Web3.waitForMining(hash).then(() => {
      dispatch(fetchIdentityDetail(identityAddress));
      dispatch({ type: DEPOSIT_PROCESSING_SWITCHED, processing: false });
      dispatch(removePendingTx(hash));
    });
  });
};
