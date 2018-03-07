/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import CheckBox from 'react-native-check-box';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';
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
  noCardButtons,
  articleCardsReducer,
  selectableArticlesMode,
  selectArticleCard,
}) => {
  const onCardPress = selectableArticlesMode ? () => selectArticleCard(article._id) : () => navigate('WebView', article);
  const isSelected = selectableArticlesMode ? articleCardsReducer.selectedArticleCards.includes(article._id) : false;
  return (
    <BoxShadow key={index.toString()} onPress={onCardPress}>
      <Image source={imageSrc} style={{ height: '100%', width: '45%', padding: 0, margin: 0 }}>
        <View style={{ flex: 1, backgroundColor: isSelected ? 'rgba(0,0,0,.4)' : 'transparent' }}>
          {
            isSelected &&
            <CheckBox
              isChecked
              checkBoxColor={Colors.whiteColor}
              style={{
                position: 'absolute',
                padding: 5,
              }}
              onClick={onCardPress}
            />
          }
        </View>
      </Image>
      <View
        style={{
          width: 0,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: isSelected ? 'rgba(0,0,0,.4)' : 'transparent',
        }}
      >
        <Text
          style={{
            padding: 10,
            fontWeight: 'bold',
            opacity: 0.9,
          }}
          ellipsizeMode='tail'
          numberOfLines={3}
        >
          {article.title}
        </Text>
        {
          noCardButtons ? null :
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <PrivacyIconButton
                article={article}
                changeArticlePrivacy={changeArticlePrivacy}
              />
              <CollectionIconButton
                collectionNames={article.collectionNames}
                onCollectionIconClick={(actionType) => onCollectionIconClick(actionType, article._id, article.collectionNames)}
              />
              <ExternalShareButton contentToBeShared={article.articleUrl} />
            </View>
        }
      </View>
    </BoxShadow>
  );
};

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
  onCollectionIconClick: PropTypes.func,
  changeArticlePrivacy: PropTypes.func,
  noCardButtons: PropTypes.bool,
  articleCardsReducer: PropTypes.shape({
    selectedArticles: PropTypes.array,
  }),
  selectableArticlesMode: PropTypes.bool,
  selectArticleCard: PropTypes.func,
};

export default ArticleCard;
