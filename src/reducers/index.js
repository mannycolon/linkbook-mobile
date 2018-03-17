import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import userReducer from './userReducer';
import navigationReducer from './navigationReducer';
import articlesReducer from './articlesReducer';
import collectionsReducer from './collectionsReducer';
import ModalReducer from './ModalReducer';
import articleCardsReducer from './articleCardsReducer';
import errorsReducer from './errorsReducer';
import editCollectionReducer from './editCollectionReducer';

export default combineReducers({
  userReducer,
  navigationReducer,
  form,
  articlesReducer,
  collectionsReducer,
  ModalReducer,
  articleCardsReducer,
  errorsReducer,
  editCollectionReducer,
});
