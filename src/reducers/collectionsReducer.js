import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  collections: [],
  isModalVisible: false,
  isNewCollectionScreenVisible: false,
  tempCollectionName: '',
  newCollectionName: '',
  newCollectionNameIsDuplicate: false,
};

const collectionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_COLLECTION_NAME:
      return {
        ...state,
        tempCollectionName: action.tempCollectionName,
        newCollectionNameIsDuplicate: action.newCollectionNameIsDuplicate,
      };
    case ActionTypes.FETCH_MY_COLLECTIONS:
      return {
        ...state,
        collections: action.collections,
      };
    case ActionTypes.SHOW_NEW_COLLECTION_MODAL:
      return {
        ...state,
        isModalVisible: true,
        tempCollectionName: '',
      };
    case ActionTypes.HIDE_NEW_COLLECTION_MODAL:
      return {
        ...state,
        isModalVisible: false,
        tempCollectionName: '',
        isNewCollectionScreenVisible: false,
      };
    case ActionTypes.SHOW_TYPE_NEW_COLLECTION_SCREEN:
      return {
        ...state,
        isNewCollectionScreenVisible: true,
      };
    case ActionTypes.HIDE_TYPE_NEW_COLLECTION_SCREEN:
      return {
        ...state,
        isNewCollectionScreenVisible: false,
        tempCollectionName: '',
      };
    case ActionTypes.SELECT_COLLECTION_NAME:
      return {
        ...state,
        newCollectionName: action.newCollectionName,
        tempCollectionName: '',
        isNewCollectionScreenVisible: false,
        isModalVisible: false,
      };
    case ActionTypes.CLEAR_COLLECTIONS_REDUCER:
      return INITIAL_STATE;
    case ActionTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default collectionsReducer;
