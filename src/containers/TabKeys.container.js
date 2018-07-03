import { connect } from 'react-redux';

import { switchAddKeyVisibility, switchDuplicateKeyVisibility, addKey, removeKey } from 'actions/KeyMgt.action';
import TabKeysComponent from 'components/manage/TabKeys.component';
import {fetchPSPNames} from "../actions/Manage.action";

const mapStateToProps = store => ({
  account: store.network.account,
  keyPurposes: store.identity.keyPurposes,
  keys: store.keyMgt.keys,
  addKeyVisible: store.keyMgt.addKeyVisible,
  pspNames: store.manage.pspNames
});

const mapDispatchToProps = dispatch => ({
  switchAddKeyVisibility: visible => dispatch(switchAddKeyVisibility(visible)),
  switchDuplicateKeyVisibility: (visible, key, purpose) =>
    dispatch(switchDuplicateKeyVisibility(visible, key, purpose)),
  addKey: (key, purpose, type) => dispatch(addKey(key, purpose, type)),
  removeKey: (key, purpose) => dispatch(removeKey(key, purpose)),
  fetchPSPNames: _ => dispatch(fetchPSPNames())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabKeysComponent);
