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

export const addNewArticle = (articleUrl, isPublic, collectionName) => async (dispatch, getState) => {
  const userId = getState().userReducer.user.id;
  dispatch({ type: ActionTypes.ADD_NEW_ARTICLE });
  try {
    await LinkBookAPI.addArticle(articleUrl, userId, isPublic, collectionName || 'none');
    dispatch({ type: ActionTypes.ADD_NEW_ARTICLE_SUCCESS });
  } catch (err) {
    console.log(err);
    return dispatch({ type: ActionTypes.ADD_NEW_ARTICLE_ERROR });
  }
  return await dispatch(fetchMyArticles());
};