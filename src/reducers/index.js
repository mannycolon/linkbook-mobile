import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import userReducer from './userReducer';
import navigationReducer from './navigationReducer';

export default combineReducers({
  userReducer,
  navigationReducer,
  form,
});
