import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
// components
import AddNewArticle from './components/AddNewArticle';
import CollectionNameModal from './components/CollectionNameModal';
// actions
import * as ArticlesActions from '../../actions/ArticlesActions';
import * as CollectionsActions from '../../actions/CollectionsActions';

class AddNewArticleScreen extends Component {
  state = {
    isPublic: '',
  }

  _onPrivacyChange = value => {
    if (value !== 'Cancel') {
      this.setState({
        isPublic: value,
      });
    }
  }

  _addNewArticle = async (values) => {
    const isPublic = this.state.isPublic === 'Public';
    await this.props.addNewArticle(values.articleUrl, isPublic);
    this.props.navigation.goBack();
  }

  render() {
    const {
      collections,
      newCollectionNameIsDuplicate,
      tempCollectionName,
      isModalVisible,
      isNewCollectionScreenVisible,
      selectedCollectionNames,
    } = this.props.collectionsReducer;
    const {
      showModal,
      hideModal,
      showNewCollectionScreen,
      hideNewCollectionScreen,
      createAndValidateNewCollectionName,
      fetchMyCollections,
      onCollectionNameSelected,
    } = this.props;
    return (
      <View style={styles.container}>
        <AddNewArticle
          addNewArticle={this._addNewArticle}
          isPublic={this.state.isPublic}
          onPrivacyChange={this._onPrivacyChange}
          showModal={showModal}
          selectedCollectionNames={selectedCollectionNames}
        />
        <CollectionNameModal
          inAddNewArticle
          onCollectionNameSelected={onCollectionNameSelected}
          selectedCollectionNames={selectedCollectionNames}
          collections={collections}
          isModalVisible={isModalVisible}
          isNewCollectionScreenVisible={isNewCollectionScreenVisible}
          hideModal={hideModal}
          showNewCollectionScreen={showNewCollectionScreen}
          hideNewCollectionScreen={hideNewCollectionScreen}
          createAndValidateNewCollectionName={createAndValidateNewCollectionName}
          newCollectionNameIsDuplicate={newCollectionNameIsDuplicate}
          tempCollectionName={tempCollectionName}
          submitAction={() => hideModal()}
          fetchMyCollections={fetchMyCollections}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const mapStateToProps = (state) => ({
  articlesReducer: state.articlesReducer,
  collectionsReducer: state.collectionsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addNewArticle: (articleUrl, isPublic) => dispatch(ArticlesActions.addNewArticle(articleUrl, isPublic)),
  createAndValidateNewCollectionName: (newCollectionName) => dispatch(CollectionsActions.createAndValidateNewCollectionName(newCollectionName)),
  showModal: () => dispatch(CollectionsActions.showModal()),
  hideModal: () => dispatch(CollectionsActions.hideModal()),
  showNewCollectionScreen: () => dispatch(CollectionsActions.showNewCollectionScreen()),
  hideNewCollectionScreen: () => dispatch(CollectionsActions.hideNewCollectionScreen()),
  selectCollectionName: (collectionName) => dispatch(CollectionsActions.selectCollectionName(collectionName)),
  fetchMyCollections: () => dispatch(CollectionsActions.fetchMyCollections()),
  onCollectionNameSelected: (collectionName) => dispatch(CollectionsActions.onCollectionNameSelected(collectionName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewArticleScreen);
