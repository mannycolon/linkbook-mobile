import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  onError: false,
  error: {
    title: null,
    message: null,
  },
};

const errorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_ERROR_ALERT:
      return {
        ...state,
        onError: true,
        error: {
          title: action.errorTitle,
          message: action.errorMessage,
        },
      };
    case ActionTypes.CLEAR_ERRORS_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default errorsReducer;
