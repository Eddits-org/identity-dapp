import merge from 'lodash/merge';
import Storage from 'services/Storage.service';
import { initialState as initialIdentityState } from 'reducers/Identity.reducer';
import { initialState as initialManageState } from 'reducers/Manage.reducer';
import { initialState as initialClaimsState } from 'reducers/Claims.reducer';
import { initialState as initialLoginState } from 'reducers/Login.reducer';

import { parseLoginRequest } from 'utils/LoginRequest.utils';

const ORLEY_TAG = '#response=';
const FC_TAG = '#fcResponse=';
const AUTH_TAG = '#loginRequest=';

const preloadStateFromURL = () => {
  const url = window.location.href;
  if (url.indexOf(ORLEY_TAG) > 0) {
    const orelyResponse = url.substring(url.indexOf(ORLEY_TAG) + ORLEY_TAG.length);
    const json = JSON.parse(atob(orelyResponse));
    return {
      identity: {
        selectedIdentity: json.address
      },
      manage: {
        identityDetailTab: 'claims'
      },
      claims: {
        addClaim: 'LT',
        orelyResponse: json
      }
    };
  }
  if (url.indexOf(FC_TAG) > 0) {
    const fcResponse = url.substring(url.indexOf(FC_TAG) + FC_TAG.length);
    const json = JSON.parse(atob(fcResponse));
    return {
      manage: {
        identityDetailTab: 'claims'
      },
      claims: {
        addClaim: 'FC',
        fcResponse: json
      }
    };
  }
  if (url.indexOf(AUTH_TAG) > 0) {
    const loginRequest = url.substring(url.indexOf(AUTH_TAG) + AUTH_TAG.length);
    return {
      login: {
        loginRequest: parseLoginRequest(loginRequest)
      }
    };
  }
  return {};
};

const preloadStateFromLocalStorage = () => ({
  identity: {
    identities: Storage.getIdentities()
  }
});

const preloadState = () => {
  const fromLocalStorage = preloadStateFromLocalStorage();
  const fromURL = preloadStateFromURL();
  const initial = {
    manage: initialManageState,
    claims: initialClaimsState,
    login: initialLoginState,
    identity: initialIdentityState
  };
  return merge(initial, fromLocalStorage, fromURL);
};

export default preloadState;
