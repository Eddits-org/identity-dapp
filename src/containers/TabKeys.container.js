import { connect } from 'react-redux';

import { switchAddKeyVisibility, switchDuplicateKeyVisibility, addKey, removeKey } from 'actions/KeyMgt.action';
import TabKeysComponent from 'components/manage/TabKeys.component';

const mapStateToProps = store => ({
  account: store.network.account,
  keyPurposes: store.identity.keyPurposes,
  keys: store.keyMgt.keys,
  addKeyVisible: store.keyMgt.addKeyVisible,
  duplicateKeyVisible: store.keyMgt.duplicateKeyVisible
});

const mapDispatchToProps = dispatch => ({
  switchAddKeyVisibility: visible => dispatch(switchAddKeyVisibility(visible)),
  switchDuplicateKeyVisibility: visible => dispatch(switchDuplicateKeyVisibility(visible)),
  addKey: (key, purpose, type) => dispatch(addKey(key, purpose, type)),
  removeKey: (key, purpose) => dispatch(removeKey(key, purpose))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabKeysComponent);
