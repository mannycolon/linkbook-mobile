/* eslint-disable no-console */
import ActionTypes from './ActionTypes';
import { LinkBookAPI } from '../constants/api';
// actions
import * as collectionsActions from './CollectionsActions';
import * as ErrorAlertActions from './ErrorAlertActions';

export const fetchMyArticles = () => ((dispatch, getState) => {
  const { id } = getState().userReducer.user;
  dispatch({
    type: ActionTypes.FETCH_MY_ARTICLES,
    payload: LinkBookAPI.fetchMyArticles(id),
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
  const userId = getState().userReducer.user.id;
  const { selectedCollectionNames } = getState().collectionsReducer;

  dispatch({ type: ActionTypes.ADD_NEW_ARTICLE });
  try {
    await LinkBookAPI.addArticle(articleUrl, userId, isPublic, selectedCollectionNames);
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

export const changeArticlePrivacy = (isPublic, userId, articleId) => async (dispatch) => {
  try {
    const privacy = isPublic === 'Public';
    await LinkBookAPI.changeArticlePrivacy(privacy, userId, articleId);
    dispatch(fetchMyArticles());
    dispatch(collectionsActions.fetchMyCollections());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
    console.error(error);
  }
};

export const deleteArticle = (articleId) => async (dispatch, getState) => {
  try {
    const userId = getState().userReducer.user.id;

    await LinkBookAPI.deleteArticle(userId, articleId);
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
    const userId = getState().userReducer.user.id;

    await LinkBookAPI.updateArticleReadSetting(userId, articleId, isRead);
    dispatch(fetchMyArticles());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
};
