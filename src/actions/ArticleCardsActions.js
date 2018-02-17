import ActionTypes from './ActionTypes';

export const selectArticleCard = (articleId) => ((dispacth, getState) => {
  const { selectedArticleCards } = getState().articleCardsReducer;
  let newSelectedArticleCards = Array.from(selectedArticleCards);
  if (newSelectedArticleCards.includes(articleId)) {
    newSelectedArticleCards = newSelectedArticleCards.filter((articleCardId) => articleCardId !== articleId);
  } else {
    newSelectedArticleCards.push(articleId);
  }
  dispacth({
    type: ActionTypes.ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS,
    selectedArticleCards: newSelectedArticleCards,
  });
});

export const setArticleCard = (selectedArticleCards) => ((dispacth) => {
  dispacth({
    type: ActionTypes.ADD_ARTICLE_TO_SELECTED_ARTICLE_CARDS,
    selectedArticleCards,
  });
});
