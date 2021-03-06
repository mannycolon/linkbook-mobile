/* eslint-disable no-console */
import { NavigationActions } from 'react-navigation';
import ActionTypes from './ActionTypes';
import { LinkBookAPI } from '../constants/api';
// actions
import * as ModalActions from './ModalActions';
import * as ArticlesActions from './ArticlesActions';
import * as ErrorAlertActions from './ErrorAlertActions';

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
  const { user: { id }, token } = getState().userReducer;
  dispatch({ type: ActionTypes.FETCHING_MY_COLLECTIONS });
  const collections = await LinkBookAPI.fetchMyCollections(id, token);
  dispatch({ type: ActionTypes.FETCH_MY_COLLECTIONS, collections });
};

export const deleteCollection = (collectionName) => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;

    dispatch(ModalActions.closeCollectionSettingsModal());
    await LinkBookAPI.deleteCollection(id, collectionName, token);
    dispatch(fetchMyCollections());
    dispatch(NavigationActions.back());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
};

export const updateArticleCollectionNames = (articleId) => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;
    const collectionNames = getState().collectionsReducer.selectedCollectionNames;

    if (collectionNames) {
      await LinkBookAPI.updateArticleCollectionNames(id, collectionNames, articleId, token);
      dispatch(ArticlesActions.fetchMyArticlesWithNoRefresh());
    }
    dispatch(hideModal());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
};

export const addArticlesToCollection = (collectionName) => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;
    const { selectedArticleCards } = getState().articleCardsReducer;

    await LinkBookAPI.addArticlesToCollection(id, selectedArticleCards, collectionName, token);
    dispatch(fetchMyCollections());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
  dispatch({ type: ActionTypes.RESET_ARTICLE_CARDS_REDUCER });
};

export const removeArticlesFromCollection = (collectionName) => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;
    const { deselectedArticleCards } = getState().articleCardsReducer;

    await LinkBookAPI.removeArticlesFromCollection(id, deselectedArticleCards, collectionName, token);
    dispatch(fetchMyCollections());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
  dispatch({ type: ActionTypes.RESET_ARTICLE_CARDS_REDUCER });
};

export const clearCollectionsReducer = () => ({
  type: ActionTypes.CLEAR_COLLECTIONS_REDUCER,
});

export const updateCollectionNameText = () => async (dispatch, getState) => {
  try {
    const { user: { id }, token } = getState().userReducer;
    const { oldCollectionName, newCollectionName } = getState().editCollectionReducer;
    const { index, routes } = getState().navigationReducer;
    const screenKey = routes[index].key;

    await LinkBookAPI.updateCollectionNameText(oldCollectionName, newCollectionName, id, token);
    const setParamsAction = NavigationActions.setParams({
      params: { title: newCollectionName },
      key: screenKey,
    });
    dispatch(setParamsAction);
    dispatch(fetchMyCollections());
  } catch (error) {
    dispatch(ErrorAlertActions.displayErrorAlert('Error', error.message));
  }
};

/**
 * Edits the the collection name label in the edit collection reducer.
 * @param {String} newCollectionName
 */
export const editCollectionNameLabel = (oldCollectionName, newCollectionName) => ({
  type: ActionTypes.EDIT_COLLECTION_NAME_LABEL,
  oldCollectionName,
  newCollectionName,
});
