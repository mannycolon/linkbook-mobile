import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  isCollectionSettingsModalVisible: false,
};

const ModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_COLLECTION_SETTINGS_MODAL:
      return {
        ...state,
        isCollectionSettingsModalVisible: true,
      };
    case ActionTypes.CLOSE_COLLECTION_SETTINGS_MODAL:
      return {
        ...state,
        isCollectionSettingsModalVisible: false,
      };
    default:
      return state;
  }
};

export default ModalReducer;
