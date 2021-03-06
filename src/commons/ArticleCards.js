import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
// helpers
import * as stringHelpers from '../helpers/stringHelpers';
// components
import ArticleCard from './ArticleCard';
import EmptyArticleListScreen from './EmptyArticleListScreen';
import EmptyPublicArticleScreen from './EmptyPublicArticleScreen';

const ArticleCards = ({
  articles,
  articleCardsReducer,
  refreshing,
  noCardButtons,
  selectableArticlesMode,
  navigate,
  onRefresh,
  onCollectionIconClick,
  changeArticlePrivacy,
  selectArticleCard,
  addPublicArticleToMyArticles,
  openArticleCardSettingsModal,
  isPublicArticleScreen,
  updateArticleReadSetting,
}) => {
  // home article screen
  if (articles.length === 0 && !isPublicArticleScreen) return <EmptyArticleListScreen />;
  // public article screen
  if (articles.length === 0 && isPublicArticleScreen) return <EmptyPublicArticleScreen />;

  return (
    <FlatList
      key={'flatlistexample'}
      style={{ flex: 1 }}
      data={articles}
      refreshing={refreshing || false}
      onRefresh={() => onRefresh()}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => {
        const article = item;
        const validImageType = stringHelpers.isPathAImageExtension(article.imageURL);
        const imageSrc = article.imageURL && validImageType ? { uri: article.imageURL } : require('../../assets/images/no-image.jpg');
        return (
          <ArticleCard
            index={index}
            article={article}
            imageSrc={imageSrc}
            navigate={navigate}
            onCollectionIconClick={onCollectionIconClick}
            changeArticlePrivacy={changeArticlePrivacy}
            noCardButtons={noCardButtons}
            articleCardsReducer={articleCardsReducer}
            selectableArticlesMode={selectableArticlesMode}
            selectArticleCard={selectArticleCard}
            addPublicArticleToMyArticles={addPublicArticleToMyArticles}
            openArticleCardSettingsModal={openArticleCardSettingsModal}
            isPublicArticleScreen={isPublicArticleScreen}
            updateArticleReadSetting={updateArticleReadSetting}
          />
        );
      }}
    />
  );
};

ArticleCards.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  articleCardsReducer: PropTypes.shape({
    selectedArticles: PropTypes.array,
  }),
  refreshing: PropTypes.bool,
  noCardButtons: PropTypes.bool,
  selectableArticlesMode: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
  onCollectionIconClick: PropTypes.func,
  changeArticlePrivacy: PropTypes.func,
  selectArticleCard: PropTypes.func,
  addPublicArticleToMyArticles: PropTypes.func,
  openArticleCardSettingsModal: PropTypes.func,
  updateArticleReadSetting: PropTypes.func,
  isPublicArticleScreen: PropTypes.bool,
};

export default ArticleCards;
