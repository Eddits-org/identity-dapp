import Web3 from 'services/Web3.service';
import Storage from 'services/Storage.service';

export const FETCH_COST = 'FETCH_COST';
export const COST_ESTIMATED = 'COST_ESTIMATED';
export const DEPLOY_IDENTITY_REQUESTED = 'DEPLOY_IDENTITY_REQUESTED';
export const WAIT_IDENTITY_MINING = 'WAIT_IDENTITY_MINING';
export const IDENTITY_DEPLOYED = 'IDENTITY_DEPLOYED';
export const RESET_DEPLOYMENT = 'RESET_DEPLOYMENT';

export const estimateCost = () => (dispatch) => {
  dispatch({ type: FETCH_COST });
  Web3.estimateIdentityCreationCost().then((cost) => {
    dispatch({
      type: COST_ESTIMATED,
      cost
    });
  });
};

export const deployIdentity = account => (dispatch) => {
  dispatch({ type: DEPLOY_IDENTITY_REQUESTED });
  Web3.deployIdentity(account).then((txHash) => {
    dispatch({ type: WAIT_IDENTITY_MINING, txHash });
    Web3.waitForMining(txHash).then(({ block, address }) => {
      Storage.addIdentity({ address });
      dispatch({
        type: IDENTITY_DEPLOYED,
        block,
        address
      });
    });
  });
};

export const resetDeployment = () => ({
  type: RESET_DEPLOYMENT
});
