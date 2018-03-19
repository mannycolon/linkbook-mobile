import ActionTypes from '../actions/ActionTypes';

export const addNewArticleUrl = (newArticleUrl) => ({
  type: ActionTypes.ADD_NEW_ARTICLE_URL,
  newArticleUrl,
});
