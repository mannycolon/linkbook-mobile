/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
// components
import LoadingScreen from '../../commons/LoadingScreen';
import ArticleCards from '../../commons/ArticleCards';
import CollectionNameModal from '../addNewArticle/components/CollectionNameModal';

export default class MyArticlesList extends Component {
  state = {
    refreshing: false,
    articleId: '',
    actionType: '',
    currentArticleCollectionNames: [],
  }

  componentDidMount() {
    this.props.fetchMyArticles();
  }

  componentWillReceiveProps(nextProps) {
    const currentScreenIndex = this.props.navigationReducer.routes[0].index;
    const newScreenIndex = nextProps.navigationReducer.routes[0].index;
    if (currentScreenIndex !== 0 && newScreenIndex === 0) {
      this.props.fetchMyArticles();
    }
    this.setState({ refreshing: false });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchMyArticles();
  }

  _onCollectionIconClick = (actionType, articleId, currentArticleCollectionNames) => {
    this.setState({ articleId, actionType, currentArticleCollectionNames });
    this.props.updateSelectedCollectionNames(currentArticleCollectionNames);
    this.props.showModal();
  }

  render() {
    const {
      myArticles: {
        isFetched,
        articles,
        error,
      },
      navigation: {
        navigate,
      },
      hideModal,
      showNewCollectionScreen,
      hideNewCollectionScreen,
      createAndValidateNewCollectionName,
      fetchMyCollections,
      onCollectionNameSelected,
      changeArticlePrivacy,
      updateArticleCollectionNames,
    } = this.props;

    const {
      collections,
      newCollectionNameIsDuplicate,
      tempCollectionName,
      isModalVisible,
      isNewCollectionScreenVisible,
      selectedCollectionNames,
    } = this.props.collectionsReducer;

    if (!isFetched) {
      return <LoadingScreen />;
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ArticleCards
          articles={articles}
          navigate={navigate}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          onCollectionIconClick={this._onCollectionIconClick}
          changeArticlePrivacy={changeArticlePrivacy}
        />
        <CollectionNameModal
          collections={collections}
          isModalVisible={isModalVisible}
          isNewCollectionScreenVisible={isNewCollectionScreenVisible}
          hideModal={hideModal}
          showNewCollectionScreen={showNewCollectionScreen}
          hideNewCollectionScreen={hideNewCollectionScreen}
          createAndValidateNewCollectionName={createAndValidateNewCollectionName}
          newCollectionNameIsDuplicate={newCollectionNameIsDuplicate}
          tempCollectionName={tempCollectionName}
          onCollectionNameSelected={onCollectionNameSelected}
          homeSubmitAction={this._submitAction}
          fetchMyCollections={fetchMyCollections}
          selectedCollectionNames={selectedCollectionNames}
          currentArticleCollectionNames={this.state.currentArticleCollectionNames}
          navigationReducer={this.props.navigationReducer}
          updateArticleCollectionNames={updateArticleCollectionNames}
          articleId={this.state.articleId}
        />
      </View>
    );
  }
}

MyArticlesList.propTypes = {
  articles:	PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape(),
};
