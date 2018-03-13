import ActionTypes from './ActionTypes';

export const displayErrorAlert = (errorTitle, errorMessage) => ({
  type: ActionTypes.DISPLAY_ERROR_ALERT,
  errorTitle,
  errorMessage: errorMessage || 'Something went wrong',
});

