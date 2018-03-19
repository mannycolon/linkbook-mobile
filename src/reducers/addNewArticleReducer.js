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
    default:
      return state;
  }
};

export default addNewArticleReducer;
