import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import userReducer from './userReducer';
import navigationReducer from './navigationReducer';
import articlesReducer from './articlesReducer';
import collectionsReducer from './collectionsReducer';

export default combineReducers({
  userReducer,
  navigationReducer,
  form,
  articlesReducer,
  collectionsReducer,
});
