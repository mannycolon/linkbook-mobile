import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  newArticleUrl: null,
};

const addNewArticleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ARTICLE_URL:
      return {
        ...state,
        newArticleUrl: action.newArticleUrl,
      };
    case ActionTypes.CLEAR_ADD_NEW_ARTICLE_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default addNewArticleReducer;
