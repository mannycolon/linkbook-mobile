import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Hr from 'react-native-hr';
import Colors from '../../../../constants/Colors';

const ModalBottomContainer = ({
  hideModal,
  tempCollectionName,
  newCollectionNameIsDuplicate,
  selectCollectionName,
}) => (
  <View>
    {
      tempCollectionName && !newCollectionNameIsDuplicate ?
        <TouchableOpacity style={{ alignItems: 'center', backgroundColor: Colors.blueColor }} onPress={() => selectCollectionName()}>
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

ModalBottomContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  tempCollectionName: PropTypes.string.isRequired,
  newCollectionNameIsDuplicate: PropTypes.bool.isRequired,
  selectCollectionName: PropTypes.func.isRequired,
};

export default ModalBottomContainer;
