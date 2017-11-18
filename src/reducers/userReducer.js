import consts from '../actions/ActionTypes';

const nameInitialState = {
  isLogged: false,
  isLoading: false,
  token: null,
  info: {},
  error: null,
};

const userReducer = (state = nameInitialState, action) => {
  switch (action.type) {
    case consts.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case consts.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: true,
        token: action.token,
        info: action.user,
      };
    case consts.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
