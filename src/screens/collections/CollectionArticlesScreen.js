import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Container, Tab, Tabs, TabHeading, Text } from 'native-base';
import Colors from '../../constants/Colors';
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
    const unreadArticles = articles.filter((article) => article.isRead === false);
    const readArticles = articles.filter((article) => article.isRead);

    const unreadTab = (
      <TabHeading>
        <Entypo name="unread" size={25} />
        <Text style={{ color: Colors.blackColor }}>Unread</Text>
      </TabHeading>
    );

    const readTab = (
      <TabHeading>
        <MaterialCommunityIcons name="read" size={25} />
        <Text style={{ color: Colors.blackColor }}>Read</Text>
      </TabHeading>
    );

    return (
      <ScrollView style={{ flex: 1 }}>
        <Container>
          <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: Colors.redColor, height: 6 }}>
            <Tab heading={unreadTab} style={{ backgroundColor: '#F7F7F8', marginTop: 2 }}>
              {
                unreadArticles.length > 0 ?
                  <ArticleCards
                    articles={unreadArticles}
                    navigate={navigation.navigate}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    changeArticlePrivacy={changeArticlePrivacy}
                    noCardButtons
                  />
                :
                <View />
              }
            </Tab>
            <Tab heading={readTab} style={{ backgroundColor: '#F7F7F8', marginTop: 2 }}>
              {
                readArticles.length > 0 ?
                  <ArticleCards
                    articles={readArticles}
                    navigate={navigation.navigate}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    changeArticlePrivacy={changeArticlePrivacy}
                    noCardButtons
                  />
                :
                <View />
              }
            </Tab>
          </Tabs>
        </Container>
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
