import ActionTypes from '../actions/ActionTypes';

const initialState = {
  isLogged: false,
  isLoading: false,
  token: null,
  user: {},
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: true,
        token: action.token,
        user: action.user,
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
