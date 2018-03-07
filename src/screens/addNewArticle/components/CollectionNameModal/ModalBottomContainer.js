import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Hr from 'react-native-hr';
import Colors from '../../../../constants/Colors';

const ModalBottomContainer = ({
  hideModal,
  tempCollectionName,
  newCollectionNameIsDuplicate,
  isNewCollectionScreenVisible,
  onCollectionNameSelected,
  navigationReducer,
  updateArticleCollectionNames,
  articleId,
}) => {
  let condition;
  if (isNewCollectionScreenVisible) {
    condition = tempCollectionName && !newCollectionNameIsDuplicate;
  } else {
    condition = true;
  }
  let isInHomeScreen = false;

  if (navigationReducer) {
    const routesLength = navigationReducer.routes.length - 1;
    isInHomeScreen = navigationReducer.routes[routesLength].routeName === 'Home';
  }
  console.log(articleId);

  return (
    <View>
      {condition ?
        <TouchableOpacity
          style={{ alignItems: 'center', backgroundColor: Colors.blueColor }}
          onPress={() => {
            if (isNewCollectionScreenVisible) onCollectionNameSelected(tempCollectionName);
            if (isInHomeScreen) updateArticleCollectionNames(articleId);
            hideModal();
          }}
        >
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
  isNewCollectionScreenVisible: PropTypes.bool.isRequired,
  onCollectionNameSelected: PropTypes.func.isRequired,
  navigationReducer: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }),
  updateArticleCollectionNames: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
};

export default ModalBottomContainer;
