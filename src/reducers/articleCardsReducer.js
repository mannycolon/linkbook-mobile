import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  selectedArticleCards: [],
};

const articleCardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS:
      return {
        ...state,
        selectedArticleCards: action.selectedArticleCards,
      };
    case ActionTypes.RESET_ARTICLE_CARDS_REDUCER:
      return state;
    default:
      return state;
  }
};

export default articleCardsReducer;
