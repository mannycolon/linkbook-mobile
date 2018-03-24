import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const AddArticleIconButton = ({
  iconSize,
  articleUrl,
  addPublicArticleToMyArticles,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => addPublicArticleToMyArticles(articleUrl)}
  >
    <Ionicons
      name='ios-add-circle-outline'
      size={iconSize || 28}
      color={Colors.blackColor}
    />
  </TouchableOpacity>
);

AddArticleIconButton.propTypes = {
  iconSize: PropTypes.number,
  articleUrl: PropTypes.string.isRequired,
  addPublicArticleToMyArticles: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    bottom: '0%',
    marginHorizontal: 5,
  },
});

export default AddArticleIconButton;
