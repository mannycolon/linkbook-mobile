import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
// components
import ArticleCards from '../../commons/ArticleCards';
import CollectionSettingsModal from './CollectionSettingsModal';
// actions
import * as ModalActions from '../../actions/ModalActions';
import * as CollectionsActions from '../../actions/CollectionsActions';
import * as ArticlesActions from '../../actions/ArticlesActions';

class CollectionArticlesScreen extends Component {
  state = {
    refreshing: false,
  }

  componentDidMount() {
    this.props.fetchMyArticles();
    this.props.navigation.setParams({ openCollectionSettingsModal: this.props.openCollectionSettingsModal });
  }

  componentWillReceiveProps() {
    this.setState({ refreshing: false });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchMyArticles();
  }

  render() {
    const {
      ModalReducer: {
        isCollectionSettingsModalVisible,
      },
      collectionsReducer: {
        collections,
      },
      navigation,
      closeCollectionSettingsModal,
      deleteCollection,
      changeArticlePrivacy,
      addArticlesToCollection,
      removeArticlesFromCollection,
      updateCollectionNameText,
    } = this.props;
    const {
      collectionId,
      collectionName,
    } = this.props.navigation.state.params;
    const currentCollection = collections.filter((collection) => collection._id === collectionId)[0];
    const articles = currentCollection.articles;
    const collectionImageUrl = articles && articles[0] && articles[0].imageURL ? articles[0].imageURL : null;

    return (
      <ScrollView style={{ flex: 1 }}>
        <ArticleCards
          articles={articles}
          navigate={navigation.navigate}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          changeArticlePrivacy={changeArticlePrivacy}
          noCardButtons
        />
        <CollectionSettingsModal
          navigation={navigation}
          isCollectionSettingsModalVisible={isCollectionSettingsModalVisible}
          closeCollectionSettingsModal={closeCollectionSettingsModal}
          imageURL={collectionImageUrl}
          collectionName={collectionName}
          collectionId={collectionId}
          deleteCollection={deleteCollection}
          updateCollectionNameText={updateCollectionNameText}
          addArticlesToCollection={addArticlesToCollection}
          removeArticlesFromCollection={removeArticlesFromCollection}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  ModalReducer: state.ModalReducer,
  collectionsReducer: state.collectionsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  openCollectionSettingsModal: () => dispatch(ModalActions.openCollectionSettingsModal()),
  closeCollectionSettingsModal: () => dispatch(ModalActions.closeCollectionSettingsModal()),
  deleteCollection: (collectionName) => dispatch(CollectionsActions.deleteCollection(collectionName)),
  fetchMyArticles: () => dispatch(ArticlesActions.fetchMyArticles()),
  changeArticlePrivacy: (userId, articleId, isPublic) => dispatch(ArticlesActions.changeArticlePrivacy(userId, articleId, isPublic)),
  addArticlesToCollection: (collectionName) => dispatch(CollectionsActions.addArticlesToCollection(collectionName)),
  removeArticlesFromCollection: (collectionName) => dispatch(CollectionsActions.removeArticlesFromCollection(collectionName)),
  updateCollectionNameText: () => dispatch(CollectionsActions.updateCollectionNameText()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionArticlesScreen);
