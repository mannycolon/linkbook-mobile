/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import CheckBox from 'react-native-check-box';
import Hr from 'react-native-hr';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';
// components
import ExternalShareButton from './ExternalShareButton';
import PrivacyIconButton from './PrivacyIconButton';
import CollectionIconButton from './CollectionIconButton';
import AddArticleIconButton from './AddArticleIconButton';
import ThreeDotIconButton from './ThreeDotIconButton';
import ReadButtonIcon from './ReadButtonIcon';

const BoxShadow = styled.TouchableOpacity`
  display: flex;
  height: 150px;
  background-color: #FFFFFF;
  shadow-color: #000000;
  shadow-opacity: 0.5;
  shadow-radius: 2;
  shadow-offset: 0px 2px;
  margin-vertical: 2.5;
  elevation: 1;
`;

const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 110px;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
  addPublicArticleToMyArticles,
  openArticleCardSettingsModal,
  isPublicArticleScreen,
  updateArticleReadSetting,
}) => {
  const onCardPress = selectableArticlesMode ? () => selectArticleCard(article._id) : () => navigate('WebView', article);
  const isSelected = selectableArticlesMode ? articleCardsReducer.selectedArticleCards.includes(article._id) : false;
  let cardButtons = <View />;

  if (noCardButtons && isPublicArticleScreen) {
    cardButtons = (
      <BottomContainer>
        <AddArticleIconButton
          articleUrl={article.articleUrl}
          addPublicArticleToMyArticles={addPublicArticleToMyArticles}
        />
        <ExternalShareButton contentToBeShared={article.articleUrl} />
      </BottomContainer>
    );
  } else if (noCardButtons) {
    cardButtons = <View />;
  } else {
    cardButtons = (
      <BottomContainer>
        <View style={{ marginRight: 'auto' }}>
          <ReadButtonIcon
            article={article}
            updateArticleReadSetting={updateArticleReadSetting}
          />
        </View>
        <PrivacyIconButton
          article={article}
          changeArticlePrivacy={changeArticlePrivacy}
        />
        <CollectionIconButton
          collectionNames={article.collectionNames}
          onCollectionIconClick={(actionType) => onCollectionIconClick(actionType, article._id, article.collectionNames)}
        />
        <ExternalShareButton contentToBeShared={article.articleUrl} />
      </BottomContainer>
    );
  }

  return (
    <BoxShadow key={index.toString()} onPress={onCardPress}>
      <TopContainer>
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
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  padding: 10,
                  fontWeight: 'bold',
                  opacity: 0.9,
                }}
                ellipsizeMode='tail'
                numberOfLines={5}
              >
                {article.title}
              </Text>
            </View>
            {
              noCardButtons ? null :
                <View style={{ flex: 0.1, marginRight: 5, marginTop: 5 }}>
                  <ThreeDotIconButton articleId={article._id} openArticleCardSettingsModal={openArticleCardSettingsModal} />
                </View>
            }
          </View>
        </View>
      </TopContainer>
      <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9, opacity: 0.4 }} marginLeft={0} marginRight={0} />
      {cardButtons}
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
  addPublicArticleToMyArticles: PropTypes.func,
  openArticleCardSettingsModal: PropTypes.func,
  updateArticleReadSetting: PropTypes.func,
  isPublicArticleScreen: PropTypes.any,
};

export default ArticleCard;
