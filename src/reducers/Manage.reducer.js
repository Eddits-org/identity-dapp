import {
  IDENTITY_BALANCE_FETCHED,
  IDENTITY_DETAIL_TAB_CHANGED,
  PENDING_TX_HIDDEN,
  PENDING_TX_ADDED,
  PENDING_TX_REMOVED,
  DEPOSIT_PROCESSING_SWITCHED
} from 'actions/Manage.action';

export const initialState = {
  identityDetailTab: 'keys',
  addKeyVisible: false,
  pendingTransactions: [],
  balance: null,
  processingDeposit: false
};

export const ManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDENTITY_BALANCE_FETCHED:
      return {
        ...state,
        balance: action.balance
      };

    case IDENTITY_DETAIL_TAB_CHANGED:
      return {
        ...state,
        identityDetailTab: action.tab
      };

    case PENDING_TX_ADDED:
      return {
        ...state,
        pendingTransactions: [...state.pendingTransactions, {
          hash: action.hash,
          label: action.label,
          show: true
        }]
      };

    case PENDING_TX_HIDDEN:
      return {
        ...state,
        pendingTransactions: state.pendingTransactions.map((tx) => {
          if (tx.hash === action.hash) {
            // eslint-disable-next-line no-param-reassign
            tx.show = false;
            return tx;
          }
          return tx;
        })
      };

    case PENDING_TX_REMOVED:
      return {
        ...state,
        pendingTransactions: state.pendingTransactions.filter(tx => tx.hash !== action.hash)
      };

    case DEPOSIT_PROCESSING_SWITCHED:
      return {
        ...state,
        processingDeposit: action.processing
      };

    default:
      return state;
  }
};
