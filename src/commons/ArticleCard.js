/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
// components
import ExternalShareButton from './ExternalShareButton';
import PrivacyIconButton from './PrivacyIconButton';
import CollectionIconButton from './CollectionIconButton';

const BoxShadow = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
  background-color: #FFFFFF;
  shadow-color: #000000;
  shadow-opacity: 0.5;
  shadow-radius: 2;
  shadow-offset: 0px 2px;
  margin-vertical: 2.5;
  elevation: 1;
`;

const ArticleCard = ({
  index,
  article,
  imageSrc,
  navigate,
  onCollectionIconClick,
  changeArticlePrivacy,
}) => (
  <BoxShadow key={index.toString()} onPress={() => navigate('WebView', article)}>
    <Image source={imageSrc} style={{ height: '100%', width: '45%', padding: 0, margin: 0 }} />
    <View style={{ width: 0, flexGrow: 1 }}>
      <Text style={{ padding: 10, fontWeight: 'bold', opacity: 0.9 }} ellipsizeMode='tail' numberOfLines={3}>
        {article.title}
      </Text>
      <CollectionIconButton
        collectionNames={article.collectionNames}
        onCollectionIconClick={(actionType) => onCollectionIconClick(actionType, article._id, article.collectionNames)}
      />
      <PrivacyIconButton
        article={article}
        changeArticlePrivacy={changeArticlePrivacy}
      />
      <ExternalShareButton contentToBeShared={article.articleUrl} />
    </View>
  </BoxShadow>
);

ArticleCard.propTypes = {
  index: PropTypes.number.isRequired,
  article: PropTypes.shape({
    _id: PropTypes.string,
    articleUrl: PropTypes.string,
    title: PropTypes.string,
    collectionNames: PropTypes.array,
  }).isRequired,
  imageSrc: PropTypes.any,
  navigate: PropTypes.func.isRequired,
  onCollectionIconClick: PropTypes.func.isRequired,
  changeArticlePrivacy: PropTypes.func.isRequired,
};

export default ArticleCard;
