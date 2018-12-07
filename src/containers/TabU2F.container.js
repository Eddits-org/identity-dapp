import { connect } from 'react-redux';

import { generateU2FKey, addU2FKey, removeU2FKey } from 'actions/U2F.action';
import TabU2FComponent from 'components/manage/TabU2F.component';

const mapStateToProps = store => ({
  keyPurposes: store.identity.keyPurposes,
  isKeyGenerated: store.manage.generatedU2Fkey !== null,
  u2fkeys: store.manage.u2fkeys
});

const mapDispatchToProps = dispatch => ({
  generateU2FKey: () => dispatch(generateU2FKey()),
  addU2FKey: label => dispatch(addU2FKey(label)),
  removeU2FKey: id => dispatch(removeU2FKey(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabU2FComponent);
