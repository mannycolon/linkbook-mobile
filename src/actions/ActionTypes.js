const ActionTypes = {
  // USER
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
  // ARTICLES
  FETCH_MY_ARTICLES: 'FETCH_MY_ARTICLES',
  FETCH_ALL_PUBLIC_ARTICLES: 'FETCH_ALL_PUBLIC_ARTICLES',
  ADD_NEW_ARTICLE: 'ADD_NEW_ARTICLE',
  ADD_NEW_ARTICLE_SUCCESS: 'ADD_NEW_ARTICLE_SUCCESS',
  ADD_NEW_ARTICLE_ERROR: 'ADD_NEW_ARTICLE_ERROR',
  FETCH_PUBLIC_ARTICLES: 'FETCH_PUBLIC_ARTICLES',
  // COLLECTIONS
  CREATE_NEW_COLLECTION_NAME: 'CREATE_NEW_COLLECTION_NAME',
  FETCHING_MY_COLLECTIONS: 'FETCHING_MY_COLLECTIONS',
  FETCH_MY_COLLECTIONS: 'FETCH_MY_COLLECTIONS',
  SHOW_TYPE_NEW_COLLECTION_SCREEN: 'SHOW_TYPE_NEW_COLLECTION_SCREEN',
  HIDE_TYPE_NEW_COLLECTION_SCREEN: 'HIDE_TYPE_NEW_COLLECTION_SCREEN',
  SELECT_COLLECTION_NAME: 'SELECT_COLLECTION_NAME',
  CLEAR_COLLECTIONS_REDUCER: 'CLEAR_COLLECTIONS_REDUCER',
  UPDATE_SELECTED_COLLECTION_NAMES: 'UPDATE_SELECTED_COLLECTION_NAMES',
  // MODAL ACTIONS
  SHOW_NEW_COLLECTION_MODAL: 'SHOW_NEW_COLLECTION_MODAL',
  HIDE_NEW_COLLECTION_MODAL: 'HIDE_NEW_COLLECTION_MODAL',
  OPEN_COLLECTION_SETTINGS_MODAL: 'OPEN_COLLECTION_SETTINGS_MODAL',
  CLOSE_COLLECTION_SETTINGS_MODAL: 'CLOSE_COLLECTION_SETTINGS_MODAL',
  // ArticleCardsReducer
  ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS: 'ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS',
  RESET_ARTICLE_CARDS_REDUCER: 'RESET_ARTICLE_CARDS_REDUCER',
  // ErrorsReducer
  DISPLAY_ERROR_ALERT: 'DISPLAY_ERROR_ALERT',
  // editCollectionReducer
  EDIT_COLLECTION_NAME_LABEL: 'EDIT_COLLECTION_NAME_LABEL',
};

export default ActionTypes;
