import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const ThreeDotIconButton = ({
  iconSize,
  articleId,
  openArticleCardSettingsModal,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => openArticleCardSettingsModal(articleId)}
  >
    <Entypo
      name='dots-three-vertical'
      size={iconSize || 28}
      color={Colors.blackColor}
    />
  </TouchableOpacity>
);

ThreeDotIconButton.propTypes = {
  iconSize: PropTypes.number,
  articleId: PropTypes.string.isRequired,
  openArticleCardSettingsModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
});

export default ThreeDotIconButton;
