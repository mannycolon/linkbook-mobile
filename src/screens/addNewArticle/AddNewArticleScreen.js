import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
// components
import AddNewArticle from './components/AddNewArticle';
import SelectCollectionNameModal from './components/CollectionNameModal';
// actions
import * as ArticlesActions from '../../actions/ArticlesActions';
import * as CollectionsActions from '../../actions/collectionsActions';

class AddNewArticleScreen extends Component {
  state = {
    isPublic: '',
  }

  componentWillMount() {
    this.props.fetchMyCollections();
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
      newCollectionName,
      tempCollectionName,
      isModalVisible,
      isNewCollectionScreenVisible,
    } = this.props.collectionsReducer;
    const {
      showModal,
      hideModal,
      showNewCollectionScreen,
      hideNewCollectionScreen,
      createAndValidateNewCollectionName,
      selectCollectionName,
    } = this.props;
    return (
      <View style={styles.container}>
        <AddNewArticle
          addNewArticle={this._addNewArticle}
          isPublic={this.state.isPublic}
          onPrivacyChange={this._onPrivacyChange}
          showModal={showModal}
          newCollectionName={newCollectionName}
        />
        <SelectCollectionNameModal
          collections={collections}
          isModalVisible={isModalVisible}
          isNewCollectionScreenVisible={isNewCollectionScreenVisible}
          hideModal={hideModal}
          showNewCollectionScreen={showNewCollectionScreen}
          hideNewCollectionScreen={hideNewCollectionScreen}
          createAndValidateNewCollectionName={createAndValidateNewCollectionName}
          newCollectionNameIsDuplicate={newCollectionNameIsDuplicate}
          tempCollectionName={tempCollectionName}
          selectCollectionName={selectCollectionName}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewArticleScreen);
