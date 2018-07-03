import React from 'react';
import PropTypes from 'prop-types';

import {KEYS_PURPOSES} from 'services/Identity.service';

import AddKey from './keys/AddKey.component';
import KeyRow from './keys/KeyRow.component';

class TabKeysComponent extends React.Component {

  componentDidMount(){
    this.props.fetchPSPNames();
  }

  render() {
    const {
      keys,
      keyPurposes,
      pspNames,
      addKeyVisible,
      switchAddKeyVisibility,
      switchDuplicateKeyVisibility,
      addKey,
      removeKey,
      account
    } = this.props;
    const isManagementKey = !!keyPurposes.find(p => p === KEYS_PURPOSES.MANAGEMENT);
    return (
      <div className='content'>
        <table className='table is-fullwidth'>
          <thead>
          <tr>
            <th>Purpose</th>
            <th>Key</th>
            <th>Type</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {keys.map(key => (
            <KeyRow
              {...{
                key: `${key.purpose.code}_${key.key}`,
                data: key,
                account,
                isManagementKey,
                switchDuplicateKeyVisibility,
                addKey,
                removeKey
              }}
            />
          ))}
          </tbody>
        </table>
        {isManagementKey && !addKeyVisible && (
          <button
            className='button is-primary is-small'
            onClick={() => switchAddKeyVisibility(true)}
          >
          <span className='icon'>
            <i className='fa fa-plus'/>
          </span>&nbsp;
            Add key
          </button>
        )}
        {addKeyVisible && <AddKey {...{switchAddKeyVisibility, addKey, pspNames}} />}
      </div>
    );
  }
};

TabKeysComponent.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  addKeyVisible: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
  keyPurposes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pspNames: PropTypes.arrayOf(PropTypes.object),

  switchAddKeyVisibility: PropTypes.func.isRequired,
  switchDuplicateKeyVisibility: PropTypes.func.isRequired,
  addKey: PropTypes.func.isRequired,
  removeKey: PropTypes.func.isRequired,
  fetchPSPNames: PropTypes.func.isRequired
};

export default TabKeysComponent;
