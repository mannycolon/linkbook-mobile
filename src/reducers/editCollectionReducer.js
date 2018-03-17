import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  newCollectionName: '',
  oldCollectionName: '',
};

const editCollectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.EDIT_COLLECTION_NAME_LABEL:
      return {
        ...state,
        newCollectionName: action.newCollectionName,
        oldCollectionName: action.oldCollectionName,
      };
    default:
      return state;
  }
};

export default editCollectionReducer;
