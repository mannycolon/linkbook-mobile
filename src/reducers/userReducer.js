import ActionTypes from '../actions/ActionTypes';

const initialState = {
  showAppIntroSlider: true,
  isLogged: false,
  isLoading: false,
  token: null,
  user: {
    email: '',
    fullName: '',
    id: '',
    avatar: '',
  },
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
    case ActionTypes.FINALIZE_APP_INTRO_SLIDER:
      return {
        ...state,
        showAppIntroSlider: false,
      };
    case ActionTypes.LOGOUT:
      return {
        ...initialState,
        showAppIntroSlider: state.showAppIntroSlider,
      };
    default:
      return state;
  }
};

export default userReducer;
