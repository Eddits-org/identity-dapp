import { combineReducers } from 'redux';

import { NetworkReducer } from 'reducers/Network.reducer';
import { RegisterReducer } from 'reducers/Register.reducer';
import { ManageReducer } from 'reducers/Manage.reducer';
import { KeyMgtReducer } from 'reducers/KeyMgt.reducer';
import { ClaimsReducer } from 'reducers/Claims.reducer';
import { LoginReducer } from 'reducers/Login.reducer';
import { IdentityReducer } from 'reducers/Identity.reducer';

const AppReducer = combineReducers({
  network: NetworkReducer,
  register: RegisterReducer,
  manage: ManageReducer,
  keyMgt: KeyMgtReducer,
  claims: ClaimsReducer,
  login: LoginReducer,
  identity: IdentityReducer
});

export default AppReducer;
