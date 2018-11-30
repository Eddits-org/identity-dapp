import { connect } from 'react-redux';

import { generateU2FKey } from 'actions/U2F.action';
import TabU2FComponent from 'components/manage/TabU2F.component';

const mapStateToProps = store => ({
  keyPurposes: store.identity.keyPurposes
});

const mapDispatchToProps = dispatch => ({
  generateU2FKey: () => dispatch(generateU2FKey())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabU2FComponent);
