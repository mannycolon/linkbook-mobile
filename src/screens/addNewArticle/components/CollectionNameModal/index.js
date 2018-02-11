import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
// helpers
import isArrayEqual from '../../../../helpers/isArrayEqual';
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
      submitAction,
      selectedCollectionNames,
      inAddNewArticle,
    } = this.props;
    let { currentArticleCollectionNames } = this.props;
    let showSubmitButton;

    currentArticleCollectionNames = currentArticleCollectionNames || collections.map((collection) => collection.name);

    if (inAddNewArticle) {
      showSubmitButton = selectedCollectionNames.length > 0 && !isArrayEqual(currentArticleCollectionNames, selectedCollectionNames);
    } else {
      showSubmitButton = !isArrayEqual(currentArticleCollectionNames, selectedCollectionNames);
    }

    return (
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => hideModal()}
        onBackdropPress={() => hideModal()}
        style={{ justifyContent: 'flex-end', margin: 0, padding: 0 }}
      >
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: modalHeight, backgroundColor: 'white', padding: 0, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
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
            selectedCollectionNames={selectedCollectionNames}
            submitAction={submitAction}
            showSubmitButton={showSubmitButton}
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
  showNewCollectionScreen: PropTypes.func.isRequired,
  hideNewCollectionScreen: PropTypes.func.isRequired,
  createAndValidateNewCollectionName: PropTypes.func.isRequired,
  newCollectionNameIsDuplicate: PropTypes.bool.isRequired,
  tempCollectionName: PropTypes.string.isRequired,
  submitAction: PropTypes.func.isRequired,
  onCollectionNameSelected: PropTypes.func.isRequired,
  selectedCollectionNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CollectionNameModal;
