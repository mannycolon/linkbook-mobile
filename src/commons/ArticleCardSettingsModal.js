import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Hr from 'react-native-hr';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

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

class ArticleCardSettingsModal extends Component {
  _onDeletePress = () => {
    const { settingsArticleId } = this.props;
    Alert.alert(
      'Confirm Deletion',
      'Delete this article?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            this.props.deleteArticle(settingsArticleId);
          },
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const {
      isArticleCardSettingsModalVisible,
      closeArticleCardSettingsModal,
    } = this.props;
    return (
      <Modal
        isVisible={isArticleCardSettingsModalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => closeArticleCardSettingsModal()}
        onBackdropPress={() => closeArticleCardSettingsModal()}
      >
        <ModalContent>
          <ModalButton
            onPress={() => {
              this.props.closeArticleCardSettingsModal();
              this._onDeletePress();
            }}
          >
            <Text style={{ color: Colors.redColor }}>Delete Article</Text>
          </ModalButton>
          <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9, opacity: 0.4 }} marginLeft={0} marginRight={0} />
          <ModalButton onPress={() => closeArticleCardSettingsModal()}>
            <Text style={{ color: Colors.blueColor }}>Cancel</Text>
          </ModalButton>
        </ModalContent>
      </Modal>
    );
  }
}

ArticleCardSettingsModal.propTypes = {
  isArticleCardSettingsModalVisible: PropTypes.bool.isRequired,
  closeArticleCardSettingsModal: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  settingsArticleId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default ArticleCardSettingsModal;
