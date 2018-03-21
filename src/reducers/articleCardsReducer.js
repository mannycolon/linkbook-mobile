import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  selectedArticleCards: [],
  deselectedArticleCards: [],
  isArticleCardSettingsModalVisible: false,
  settingsArticleId: null,
};

const articleCardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS:
      return {
        ...state,
        selectedArticleCards: action.selectedArticleCards,
        deselectedArticleCards: action.deselectedArticleCards,
      };
    case ActionTypes.SHOW_ARTICLE_SETTINGS_MODAL:
      return {
        ...state,
        isArticleCardSettingsModalVisible: true,
        settingsArticleId: action.settingsArticleId,
      };
    case ActionTypes.HIDE_ARTICLE_SETTINGS_MODAL:
      return {
        ...state,
        isArticleCardSettingsModalVisible: false,
        settingsArticleId: null,
      };
    case ActionTypes.RESET_ARTICLE_CARDS_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default articleCardsReducer;
