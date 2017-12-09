import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Hr from 'react-native-hr';

const ModalTopContainer = ({
  showNewCollectionScreen,
  hideNewCollectionScreen,
  isNewCollectionScreenVisible,
}) => (
  <View>
    {
      isNewCollectionScreenVisible ?
        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={hideNewCollectionScreen} style={{ position: 'absolute', left: 0 }}>
            <MaterialIcons
              name="arrow-back"
              size={28}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
          <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 16 }}>New Collection</Text>
        </View>
        :
        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={{ alignSelf: 'center', margin: 15, fontWeight: 'bold', fontSize: 16 }}>Save to</Text>
          <TouchableOpacity onPress={showNewCollectionScreen} style={{ position: 'absolute', right: 0 }}>
            <Ionicons size={28} name='md-add' style={{ margin: 10 }} />
          </TouchableOpacity>
        </View>
    }
    <Hr lineStyle={{ backgroundColor: '#b3b3b3', height: 0.9 }} marginLeft={0} marginRight={0} />
  </View>
);

ModalTopContainer.propTypes = {
  showNewCollectionScreen: PropTypes.func.isRequired,
  hideNewCollectionScreen: PropTypes.func.isRequired,
  isNewCollectionScreenVisible: PropTypes.bool.isRequired,
};

export default ModalTopContainer;
