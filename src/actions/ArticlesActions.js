/* eslint-disable no-console */
import ActionTypes from './ActionTypes';
import { LinkBookAPI } from '../constants/api';
// actions
import * as collectionsActions from './CollectionsActions';
import * as ErrorAlertActions from './ErrorAlertActions';

export const fetchMyArticles = () => ((dispatch, getState) => {
  const { user: { id }, token } = getState().userReducer;
  dispatch({
    type: ActionTypes.FETCH_MY_ARTICLES,
    payload: LinkBookAPI.fetchMyArticles(id, token),
  });
});

export const fetchPublicArticles = () => ((dispatch, getState) => {
  const { id } = getState().userReducer.user;
  dispatch({
    type: ActionTypes.FETCH_PUBLIC_ARTICLES,
    payload: LinkBookAPI.fetchPublicArticles(id),
  });
});

export const addNewArticle = (articleUrl, isPublic) => async (dispatch, getState) => {
  const { user: { id }, token } = getState().userReducer;
  const { selectedCollectionNames } = getState().collectionsReducer;

  dispatch({ type: ActionTypes.ADD_NEW_ARTICLE });
  try {
    await LinkBookAPI.addArticle(articleUrl, id, isPublic, selectedCollectionNames, token);
    dispatch({ type: ActionTypes.ADD_NEW_ARTICLE_SUCCESS });
    await dispatch(fetchMyArticles());
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: ActionTypes.ADD_NEW_ARTICLE_ERROR, message });
  }
  dispatch({ type: ActionTypes.CLEAR_COLLECTIONS_REDUCER });
};

export const clearAddArticleErrorMessage = () => ({
  type: ActionTypes.ADD_NEW_ARTICLE_ERROR,
  message: '',
});

export const changeArticlePrivacy = (isPublic, articleId) => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;
    const privacy = isPublic === 'Public';
    console.log(privacy, id, articleId, token);
    await LinkBookAPI.changeArticlePrivacy(privacy, id, articleId, token);
    dispatch(fetchMyArticles());
    dispatch(collectionsActions.fetchMyCollections());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
};

export const deleteArticle = (articleId) => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;

    await LinkBookAPI.deleteArticle(id, articleId, token);
    dispatch(fetchMyArticles());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
};

/**
 * Updates the articles read setting. Either setting it as read or unread (bool).
 * @param {String} articleId
 * @param {bool} isRead
 */
export const updateArticleReadSetting = (articleId, isRead) => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;

    await LinkBookAPI.updateArticleReadSetting(id, articleId, isRead, token);
    dispatch(fetchMyArticles());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
};
