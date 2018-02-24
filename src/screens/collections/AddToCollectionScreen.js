import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
// components
import ArticleCards from '../../commons/ArticleCards';
// actions
import * as ArticleCardsActions from '../../actions/ArticleCardsActions';

const AddToCollectionScreen = ({
  navigation,
  myArticles,
  articleCardsReducer,
  selectArticleCard,
}) => {
  const currentCollectionName = navigation.state.params.collectionName;
  // filter out articles from the current collection where new articles will be added.
  const articles = myArticles.articles.filter((article) => !article.collectionNames.includes(currentCollectionName));
  return (
    <ScrollView style={{ flex: 1 }}>
      <ArticleCards
        articles={articles}
        navigate={navigation.navigate}
        articleCardsReducer={articleCardsReducer}
        selectArticleCard={selectArticleCard}
        selectableArticlesMode
        noCardButtons
      />
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  myArticles: state.articlesReducer.myArticles,
  articleCardsReducer: state.articleCardsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  selectArticleCard: (articleId) => dispatch(ArticleCardsActions.selectArticleCard(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCollectionScreen);
