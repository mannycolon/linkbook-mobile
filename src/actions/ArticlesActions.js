/* eslint-disable no-console */
import ActionTypes from './ActionTypes';
import { LinkBookAPI } from '../constants/api';

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
  const collectionName = getState().collectionsReducer.newCollectionName;

  dispatch({ type: ActionTypes.ADD_NEW_ARTICLE });
  try {
    await LinkBookAPI.addArticle(articleUrl, userId, isPublic, collectionName || 'none');
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
