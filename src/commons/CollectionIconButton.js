/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class CollectionIconButton extends Component {
  render() {
    const { collectionNames, onCollectionIconClick } = this.props;
    const iconColor = collectionNames && collectionNames.length > 0 ? '#000000' : Colors.lightGreyColor;
    const actionType = collectionNames && collectionNames.length > 0 ? 'remove' : 'add';

    return (
      <TouchableOpacity style={styles.container} onPress={() => onCollectionIconClick(actionType)}>
        <MaterialIcons
          name='collections-bookmark'
          size={25}
          color={iconColor}
        />
      </TouchableOpacity>
    );
  }
}

CollectionIconButton.propTypes = {
  collectionNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const styles = StyleSheet.create({
  container: {
    bottom: '0%',
    marginHorizontal: 5,
  },
});
