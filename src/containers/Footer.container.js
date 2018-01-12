import { connect } from 'react-redux';

import FooterComponent from 'components/Footer.component';

const mapStateToProps = store => ({
  network: store.network.network,
  account: store.network.account
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterComponent);
