import { NavigationActions } from 'react-navigation';
import ActionTypes from './ActionTypes';
import { User } from '../constants/api';

function loginSuccess(data) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user: data.user,
    token: data.token,
  };
}

function loginError(error) {
  return {
    type: ActionTypes.LOGIN_ERROR,
    error,
  };
}

export function login(token, provider) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN });
    try {
      const data = await User.login({ token, provider });
      // Because of await once the previous line is done it jumps to the next line.
      return dispatch(loginSuccess(data));
    } catch (error) {
      return dispatch(loginError(error));
    }
  };
}

export function logout() {
  return (dispatch => {
    // reset react-naviation state
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      })
    );
    dispatch({ type: ActionTypes.LOGOUT });
  });
}
