import ActionTypes from './ActionTypes';
import { LinkBookAPI } from '../constants/api';

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

export const selectCollectionName = (collectionName) => ((dispatch, getState) => {
  const { tempCollectionName } = getState().collectionsReducer;
  const newCollectionName = collectionName === 'none' ? '' : collectionName || tempCollectionName;

  dispatch({
    type: ActionTypes.SELECT_COLLECTION_NAME,
    newCollectionName,
  });
});

export const fetchMyCollections = () => async (dispatch, getState) => {
  const { id } = getState().userReducer.user;

  dispatch({
    type: ActionTypes.FETCH_MY_COLLECTIONS,
    collections: await LinkBookAPI.fetchMyCollections(id),
  });
};
