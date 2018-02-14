import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
// helpers
import * as stringHelpers from '../helpers/stringHelpers';
// components
import ArticleCard from './ArticleCard';

const ArticleCards = ({
  articles,
  navigate,
  refreshing,
  onRefresh,
  onCollectionIconClick,
  changeArticlePrivacy,
  noCardButtons,
}) => (
  <FlatList
    key={'flatlistexample'}
    style={{ flex: 1 }}
    data={articles}
    refreshing={refreshing}
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
        />
      );
    }}
  />
);

ArticleCards.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigate: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  onCollectionIconClick: PropTypes.func.isRequired,
  changeArticlePrivacy: PropTypes.func.isRequired,
  noCardButtons: PropTypes.bool,
};

export default ArticleCards;
