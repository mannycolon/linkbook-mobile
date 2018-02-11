import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
// components
import ArticleCards from '../../commons/ArticleCards';
import CollectionSettingsModal from './CollectionSettingsModal';
// actions
import * as ModalActions from '../../actions/ModalActions';
import * as CollectionsActions from '../../actions/collectionsActions';
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
      collection: {
        articles,
        name,
      },
    } = this.props.navigation.state.params;
    const {
      ModalReducer: {
        isCollectionSettingsModalVisible,
      },
      navigation,
      closeCollectionSettingsModal,
      deleteCollection,
    } = this.props;
    const collectionImageUrl = articles && articles[0] && articles[0].imageURL ? articles[0].imageURL : null;

    return (
      <ScrollView style={{ flex: 1 }}>
        <ArticleCards
          articles={articles}
          navigate={navigation.navigate}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          onCollectionIconClick={() => console.log('missing function')}
        />
        <CollectionSettingsModal
          navigation={navigation}
          isCollectionSettingsModalVisible={isCollectionSettingsModalVisible}
          closeCollectionSettingsModal={closeCollectionSettingsModal}
          imageURL={collectionImageUrl}
          collectionName={name}
          deleteCollection={deleteCollection}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  ModalReducer: state.ModalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  openCollectionSettingsModal: () => dispatch(ModalActions.openCollectionSettingsModal()),
  closeCollectionSettingsModal: () => dispatch(ModalActions.closeCollectionSettingsModal()),
  deleteCollection: (collectionName) => dispatch(CollectionsActions.deleteCollection(collectionName)),
  fetchMyArticles: () => dispatch(ArticlesActions.fetchMyArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionArticlesScreen);
