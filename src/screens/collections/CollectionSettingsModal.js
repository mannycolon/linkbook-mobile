import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Hr from 'react-native-hr';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';

const ModalContent = styled.View`
  background-color: #ffffff;
  justify-content: flex-start;
  border-radius: 4;
  border-color: #000000;
`;

const ModalButton = styled.TouchableOpacity`
  margin-vertical: 15;
  margin-horizontal: 15;
  align-items: center;
`;

class CollectionSettingsModal extends Component {
  _onDeletePress = () => {
    const { collectionName } = this.props;
    Alert.alert(
      'Delete Collection?',
      'When you delete this collection the articles will still be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => this.props.deleteCollection(collectionName) },
      ],
      { cancelable: false }
    );
  }

  render() {
    const {
      navigation,
      isCollectionSettingsModalVisible,
      closeCollectionSettingsModal,
      imageURL,
      collectionName,
      collectionId,
      addArticlesToCollection,
      removeArticlesFromCollection,
      updateCollectionNameText,
    } = this.props;
    return (
      <Modal
        isVisible={isCollectionSettingsModalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => closeCollectionSettingsModal()}
        onBackdropPress={() => closeCollectionSettingsModal()}
      >
        <ModalContent>
          <ModalButton
            onPress={() => {
              closeCollectionSettingsModal();
              navigation.navigate('EditCollection', { title: 'Edit Collection', imageURL, collectionName, updateCollectionNameText });
            }}
          >
            <Text>Edit Collection</Text>
          </ModalButton>
          <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9, opacity: 0.4 }} marginLeft={0} marginRight={0} />
          <ModalButton
            onPress={() => {
              closeCollectionSettingsModal();
              navigation.navigate('AddToCollection', { finalize: () => addArticlesToCollection(collectionName), collectionName });
            }}
          >
            <Text>Add to Collection</Text>
          </ModalButton>
          <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9, opacity: 0.4 }} marginLeft={0} marginRight={0} />
          <ModalButton
            onPress={() => {
              closeCollectionSettingsModal();
              navigation.navigate('RemoveFromCollection', { finalize: () => removeArticlesFromCollection(collectionName), collectionId });
            }}
          >
            <Text>Remove from Collection</Text>
          </ModalButton>
          <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9, opacity: 0.4 }} marginLeft={0} marginRight={0} />
          <ModalButton onPress={() => this._onDeletePress()}>
            <Text style={{ color: Colors.redColor }}>Delete Collection</Text>
          </ModalButton>
          <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9, opacity: 0.4 }} marginLeft={0} marginRight={0} />
          <ModalButton onPress={() => closeCollectionSettingsModal()}>
            <Text style={{ color: Colors.blueColor }}>Cancel</Text>
          </ModalButton>
        </ModalContent>
      </Modal>
    );
  }
}

export default CollectionSettingsModal;
