import { connect } from 'react-redux';

import TabPSPComponent from 'components/manage/TabPSP.component';
import {fetchPayments} from "../actions/Manage.action";

const mapStateToProps = store => ({
  payments: store.manage.payments
});

const mapDispatchToProps = dispatch => ({
  fetchPayments: () => dispatch(fetchPayments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPSPComponent);
