import ActionTypes from './ActionTypes';

export const selectArticleCard = (articleId) => ((dispacth, getState) => {
  const { selectedArticleCards } = getState().articleCardsReducer;
  let newSelectedArticleCards = Array.from(selectedArticleCards);
  const deselectedArticleCards = [];
  if (newSelectedArticleCards.includes(articleId)) {
    const deselectedArticleCard = newSelectedArticleCards.filter((articleCardId) => articleCardId === articleId)[0];
    deselectedArticleCards.push(deselectedArticleCard);
    newSelectedArticleCards = newSelectedArticleCards.filter((articleCardId) => articleCardId !== articleId);
  } else {
    newSelectedArticleCards.push(articleId);
  }
  dispacth({
    type: ActionTypes.ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS,
    selectedArticleCards: newSelectedArticleCards,
    deselectedArticleCards,
  });
});

export const setArticleCard = (selectedArticleCards) => ((dispacth) => {
  dispacth({
    type: ActionTypes.ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS,
    selectedArticleCards,
  });
});

export const openArticleCardSettingsModal = (settingsArticleId) => ({
  type: ActionTypes.SHOW_ARTICLE_SETTINGS_MODAL,
  settingsArticleId,
});

export const closeArticleCardSettingsModal = () => ({
  type: ActionTypes.HIDE_ARTICLE_SETTINGS_MODAL,
});
