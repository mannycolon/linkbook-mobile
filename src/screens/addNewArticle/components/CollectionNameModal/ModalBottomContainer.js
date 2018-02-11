import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Hr from 'react-native-hr';
import Colors from '../../../../constants/Colors';

const ModalBottomContainer = ({
  hideModal,
  tempCollectionName,
  newCollectionNameIsDuplicate,
  submitAction,
  showSubmitButton,
  isNewCollectionScreenVisible,
}) => {
  let condition;
  if (isNewCollectionScreenVisible) {
    condition = tempCollectionName && !newCollectionNameIsDuplicate;
  } else {
    condition = (tempCollectionName && !newCollectionNameIsDuplicate) || showSubmitButton;
  }
  return (
    <View>
      {condition ?
        <TouchableOpacity style={{ alignItems: 'center', backgroundColor: Colors.blueColor }} onPress={() => submitAction()}>
          <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9 }} marginLeft={0} marginRight={0} />
          <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 14, color: '#ffffff' }}>Done</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={hideModal}>
          <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9 }} marginLeft={0} marginRight={0} />
          <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 14 }}>Cancel</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

ModalBottomContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  tempCollectionName: PropTypes.string.isRequired,
  newCollectionNameIsDuplicate: PropTypes.bool.isRequired,
  submitAction: PropTypes.func.isRequired,
  showSubmitButton: PropTypes.bool.isRequired,
  isNewCollectionScreenVisible: PropTypes.bool.isRequired,
};

export default ModalBottomContainer;
