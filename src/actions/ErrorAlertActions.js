import ActionTypes from './ActionTypes';

export const displayErrorAlert = (errorTitle, errorMessage) => async (dispatch) => {
  let message;
  if (errorMessage.includes('401')) message = 'You are not authorized to perform this action. Verify your login credentials';
  message = message || 'Something went wrong';

  dispatch({
    type: ActionTypes.DISPLAY_ERROR_ALERT,
    errorTitle,
    errorMessage: message,
  });
};

