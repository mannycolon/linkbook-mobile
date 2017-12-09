import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
// components
import ModalTopContainer from './ModalTopContainer';
import ModalBodyContent from './ModalBodyContent';
import ModalBottomContainer from './ModalBottomContainer';
// constants
const { height } = Dimensions.get('window');
const modalHeight = (height * 0.3) + 35;

const CollectionNameModal = ({
  collections,
  isModalVisible,
  isNewCollectionScreenVisible,
  hideModal,
  showNewCollectionScreen,
  hideNewCollectionScreen,
  createAndValidateNewCollectionName,
  newCollectionNameIsDuplicate,
  tempCollectionName,
  selectCollectionName,
}) => (
  <Modal isVisible={isModalVisible} style={{ justifyContent: 'flex-end', margin: 0, padding: 0 }}>
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
        selectCollectionName={selectCollectionName}
      />
      <ModalBottomContainer
        hideModal={hideModal}
        tempCollectionName={tempCollectionName}
        newCollectionNameIsDuplicate={newCollectionNameIsDuplicate}
        selectCollectionName={selectCollectionName}
      />
    </View>
  </Modal>
);

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
  selectCollectionName: PropTypes.func.isRequired,
};

export default CollectionNameModal;
