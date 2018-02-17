import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
// components
import ArticleCards from '../../commons/ArticleCards';
// actions
import * as ArticleCardsActions from '../../actions/ArticleCardsActions';

class RemoveFromCollectionScreen extends Component {
  componentDidMount() {
    const {
      navigation,
      collectionsReducer: {
        collections,
      },
    } = this.props;
    const collectionId = navigation.state.params.collectionId;
    const currentCollection = collections.filter((collection) => collection._id === collectionId)[0];
    const newArticleCards = currentCollection.articles.map((article) => article._id);
    this.props.setArticleCard(newArticleCards);
  }

  render() {
    const {
      navigation,
      articleCardsReducer,
      selectArticleCard,
      collectionsReducer: {
        collections,
      },
    } = this.props;
    const collectionId = navigation.state.params.collectionId;
    const currentCollection = collections.filter((collection) => collection._id === collectionId)[0];

    return (
      <ScrollView style={{ flex: 1 }}>
        <ArticleCards
          articles={currentCollection.articles}
          navigate={navigation.navigate}
          articleCardsReducer={articleCardsReducer}
          selectArticleCard={selectArticleCard}
          selectableArticlesMode
          noCardButtons
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  myArticles: state.articlesReducer.myArticles,
  articleCardsReducer: state.articleCardsReducer,
  collectionsReducer: state.collectionsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  selectArticleCard: (articleId) => dispatch(ArticleCardsActions.selectArticleCard(articleId)),
  setArticleCard: (articles) => dispatch(ArticleCardsActions.setArticleCard(articles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFromCollectionScreen);
