import {
  ADD_KEY_VISIBILITY_SWITCHED,
  DUPLICATE_VISIBILITY_SWITCHED,
  REMOVE_KEY
} from 'actions/KeyMgt.action';

import {
  IDENTITY_KEYS_FETCHED
} from 'actions/Manage.action';

export const initialState = {
  keys: [],
  addKeyVisible: false,
  duplicateKeyVisible: false
};

export const KeyMgtReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDENTITY_KEYS_FETCHED:
      return {
        ...state,
        keys: action.keys
      };

    case ADD_KEY_VISIBILITY_SWITCHED:
      return {
        ...state,
        addKeyVisible: action.visible
      };

    case DUPLICATE_VISIBILITY_SWITCHED:
      return {
        ...state,
        duplicateKeyVisible: action.visible
      };

    case REMOVE_KEY:
      return {
        ...state,
        keys: state.keys.map((key) => {
          if (key.key === action.key && key.purpose.code === action.purpose) {
            // eslint-disable-next-line no-param-reassign
            key.isRemoving = true;
            return key;
          }
          return key;
        })
      };

    default:
      return state;
  }
};
