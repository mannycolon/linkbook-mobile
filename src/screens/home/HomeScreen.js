/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// components
import LoadingScreen from '../../commons/LoadingScreen';
import ArticleCards from '../../commons/ArticleCards';
import CollectionNameModal from '../addNewArticle/components/CollectionNameModal';
import ArticleCardSettingsModal from '../../commons/ArticleCardSettingsModal';
// actions
import * as ArticlesActions from '../../actions/ArticlesActions';
import * as CollectionsActions from '../../actions/CollectionsActions';
import * as ArticleCardsActions from '../../actions/ArticleCardsActions';

class HomeScreen extends Component {
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
      openArticleCardSettingsModal,
      closeArticleCardSettingsModal,
      deleteArticle,
      updateArticleReadSetting,
    } = this.props;

    const {
      isArticleCardSettingsModalVisible,
      settingsArticleId,
    } = this.props.articleCardsReducer;

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
          openArticleCardSettingsModal={openArticleCardSettingsModal}
          updateArticleReadSetting={updateArticleReadSetting}
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
          fetchMyCollections={fetchMyCollections}
          selectedCollectionNames={selectedCollectionNames}
          currentArticleCollectionNames={this.state.currentArticleCollectionNames}
          navigationReducer={this.props.navigationReducer}
          updateArticleCollectionNames={updateArticleCollectionNames}
          articleId={this.state.articleId}
        />
        <ArticleCardSettingsModal
          deleteArticle={deleteArticle}
          settingsArticleId={settingsArticleId}
          isArticleCardSettingsModalVisible={isArticleCardSettingsModalVisible}
          closeArticleCardSettingsModal={closeArticleCardSettingsModal}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  articles:	PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape(),
};

const mapStateToProps = (state) => ({
  collectionsReducer: state.collectionsReducer,
  navigationReducer: state.navigationReducer,
  myArticles: state.articlesReducer.myArticles,
  articleCardsReducer: state.articleCardsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyArticles: () => dispatch(ArticlesActions.fetchMyArticles()),
  createAndValidateNewCollectionName: (newCollectionName) => dispatch(CollectionsActions.createAndValidateNewCollectionName(newCollectionName)),
  showModal: () => dispatch(CollectionsActions.showModal()),
  hideModal: () => dispatch(CollectionsActions.hideModal()),
  showNewCollectionScreen: () => dispatch(CollectionsActions.showNewCollectionScreen()),
  hideNewCollectionScreen: () => dispatch(CollectionsActions.hideNewCollectionScreen()),
  selectCollectionName: (collectionName) => dispatch(CollectionsActions.selectCollectionName(collectionName)),
  fetchMyCollections: () => dispatch(CollectionsActions.fetchMyCollections()),
  onCollectionNameSelected: (collectionName) => dispatch(CollectionsActions.onCollectionNameSelected(collectionName)),
  updateArticleCollectionNames: (articleId) => dispatch(CollectionsActions.updateArticleCollectionNames(articleId)),
  updateSelectedCollectionNames: (collectionNames) => dispatch(CollectionsActions.updateSelectedCollectionNames(collectionNames)),
  changeArticlePrivacy: (userId, articleId, isPublic) => dispatch(ArticlesActions.changeArticlePrivacy(userId, articleId, isPublic)),
  openArticleCardSettingsModal: (articleId) => dispatch(ArticleCardsActions.openArticleCardSettingsModal(articleId)),
  closeArticleCardSettingsModal: () => dispatch(ArticleCardsActions.closeArticleCardSettingsModal()),
  deleteArticle: (articleId) => dispatch(ArticlesActions.deleteArticle(articleId)),
  updateArticleReadSetting: (articleId, isRead) => dispatch(ArticlesActions.updateArticleReadSetting(articleId, isRead)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
