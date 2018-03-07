/* eslint-disable no-console */
import { NavigationActions } from 'react-navigation';
import ActionTypes from './ActionTypes';
import { LinkBookAPI } from '../constants/api';
// actions
import * as ModalActions from './ModalActions';
import * as ArticlesActions from './ArticlesActions';

export const createAndValidateNewCollectionName = (tempCollectionName) => ((dispatch, getState) => {
  const { collections } = getState().collectionsReducer;
  let newCollectionNameIsDuplicate;
  collections.forEach(collection => {
    if (collection.name.toLowerCase() === tempCollectionName.toLowerCase()) {
      newCollectionNameIsDuplicate = true;
    }
  });

  if (newCollectionNameIsDuplicate) {
    dispatch({
      type: ActionTypes.CREATE_NEW_COLLECTION_NAME,
      newCollectionNameIsDuplicate,
      tempCollectionName: '',
    });
  } else {
    dispatch({
      type: ActionTypes.CREATE_NEW_COLLECTION_NAME,
      newCollectionNameIsDuplicate: false,
      tempCollectionName,
    });
  }
});

export const showModal = () => ({
  type: ActionTypes.SHOW_NEW_COLLECTION_MODAL,
});

export const hideModal = () => ({
  type: ActionTypes.HIDE_NEW_COLLECTION_MODAL,
});

export const showNewCollectionScreen = () => ({
  type: ActionTypes.SHOW_TYPE_NEW_COLLECTION_SCREEN,
});

export const hideNewCollectionScreen = () => ({
  type: ActionTypes.HIDE_TYPE_NEW_COLLECTION_SCREEN,
});

export const selectCollectionName = (newCollectionName) => ({
  type: ActionTypes.SELECT_COLLECTION_NAME,
  newCollectionName,
});

export const onCollectionNameSelected = (collectionName) => ((dispacth, getState) => {
  const { selectedCollectionNames } = getState().collectionsReducer;
  let newSelectedCollectionNames;

  if (selectedCollectionNames.includes(collectionName)) {
    newSelectedCollectionNames = selectedCollectionNames.filter((selectedCollectionName) =>
      selectedCollectionName !== collectionName
    );
  } else {
    newSelectedCollectionNames = Array.from(selectedCollectionNames);
    newSelectedCollectionNames.push(collectionName);
  }

  dispacth({
    type: ActionTypes.UPDATE_SELECTED_COLLECTION_NAMES,
    selectedCollectionNames: newSelectedCollectionNames,
  });
});

export const updateSelectedCollectionNames = (selectedCollectionNames) => ({
  type: ActionTypes.UPDATE_SELECTED_COLLECTION_NAMES,
  selectedCollectionNames,
});

export const fetchMyCollections = () => async (dispatch, getState) => {
  const { id } = getState().userReducer.user;
  dispatch({ type: ActionTypes.FETCHING_MY_COLLECTIONS });
  const collections = await LinkBookAPI.fetchMyCollections(id);
  dispatch({ type: ActionTypes.FETCH_MY_COLLECTIONS, collections });
};

export const deleteCollection = (collectionName) => async (dispatch, getState) => {
  const userId = getState().userReducer.user.id;
  try {
    dispatch(ModalActions.closeCollectionSettingsModal());
    await LinkBookAPI.deleteCollection(userId, collectionName);
    dispatch(fetchMyCollections());
    dispatch(NavigationActions.back());
  } catch (error) {
    console.error(error);
    // dispatch({ type: })
  }
};

export const updateArticleCollectionNames = (articleId) => async (dispatch, getState) => {
  const userId = getState().userReducer.user.id;
  const collectionNames = getState().collectionsReducer.selectedCollectionNames;
  console.log(collectionNames);
  try {
    if (collectionNames) {
      await LinkBookAPI.updateArticleCollectionNames(userId, collectionNames, articleId);
      dispatch(ArticlesActions.fetchMyArticles());
    }
    dispatch(hideModal());
  } catch (error) {
    console.error(error);
    // dispatch({ type: })
  }
};

export const addArticlesToCollection = (collectionName) => async (dispatch, getState) => {
  try {
    const { selectedArticleCards } = getState().articleCardsReducer;
    const userId = getState().userReducer.user.id;
    await LinkBookAPI.addArticlesToCollection(userId, selectedArticleCards, collectionName);
    dispatch(fetchMyCollections());
  } catch (error) {
    // TODO: create a component to render error messages.
    console.error(error);
  }
  dispatch({ type: ActionTypes.RESET_ARTICLE_CARDS_REDUCER });
};

export const removeArticlesFromCollection = (collectionName) => async (dispatch, getState) => {
  try {
    const { deselectedArticleCards } = getState().articleCardsReducer;
    const userId = getState().userReducer.user.id;
    await LinkBookAPI.removeArticlesFromCollection(userId, deselectedArticleCards, collectionName);
    dispatch(fetchMyCollections());
  } catch (error) {
    // TODO: create a component to render error messages.
    console.error(error);
  }
  dispatch({ type: ActionTypes.RESET_ARTICLE_CARDS_REDUCER });
};

export const clearCollectionsReducer = () => ({
  type: ActionTypes.CLEAR_COLLECTIONS_REDUCER,
});
