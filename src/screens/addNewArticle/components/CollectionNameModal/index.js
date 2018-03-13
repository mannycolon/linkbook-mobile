import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
// components
import ModalTopContainer from './ModalTopContainer';
import ModalBodyContent from './ModalBodyContent';
import ModalBottomContainer from './ModalBottomContainer';
// constants
const { height } = Dimensions.get('window');
const modalHeight = (height * 0.3) + 35;

class CollectionNameModal extends Component {
  componentWillMount() {
    this.props.fetchMyCollections();
  }

  render() {
    const {
      collections,
      isModalVisible,
      isNewCollectionScreenVisible,
      hideModal,
      showNewCollectionScreen,
      hideNewCollectionScreen,
      createAndValidateNewCollectionName,
      newCollectionNameIsDuplicate,
      tempCollectionName,
      onCollectionNameSelected,
      selectedCollectionNames,
      navigationReducer,
      updateArticleCollectionNames,
      articleId,
    } = this.props;

    return (
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => hideModal()}
        onBackdropPress={() => hideModal()}
        style={styles.modal}
      >
        <View style={styles.container}>
          <ModalTopContainer
            showNewCollectionScreen={showNewCollectionScreen}
            hideNewCollectionScreen={hideNewCollectionScreen}
            isNewCollectionScreenVisible={isNewCollectionScreenVisible}
          />
          <ModalBodyContent
            collections={collections}
            isNewCollectionScreenVisible={isNewCollectionScreenVisible}
            createAndValidateNewCollectionName={createAndValidateNewCollectionName}
            newCollectionNameIsDuplicate={newCollectionNameIsDuplicate}
            onCollectionNameSelected={onCollectionNameSelected}
            selectedCollectionNames={selectedCollectionNames}
          />
          <ModalBottomContainer
            hideModal={hideModal}
            tempCollectionName={tempCollectionName}
            isNewCollectionScreenVisible={isNewCollectionScreenVisible}
            newCollectionNameIsDuplicate={newCollectionNameIsDuplicate}
            onCollectionNameSelected={onCollectionNameSelected}
            selectedCollectionNames={selectedCollectionNames}
            navigationReducer={navigationReducer}
            updateArticleCollectionNames={updateArticleCollectionNames}
            articleId={articleId}
          />
        </View>
      </Modal>
    );
  }
}

CollectionNameModal.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object),
  isModalVisible:	PropTypes.bool.isRequired,
  isNewCollectionScreenVisible:	PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  updateArticleCollectionNames: PropTypes.func,
  showNewCollectionScreen: PropTypes.func.isRequired,
  hideNewCollectionScreen: PropTypes.func.isRequired,
  createAndValidateNewCollectionName: PropTypes.func.isRequired,
  newCollectionNameIsDuplicate: PropTypes.bool.isRequired,
  tempCollectionName: PropTypes.string.isRequired,
  onCollectionNameSelected: PropTypes.func.isRequired,
  selectedCollectionNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  navigationReducer: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }),
  articleId: PropTypes.string,
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: modalHeight,
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default CollectionNameModal;
