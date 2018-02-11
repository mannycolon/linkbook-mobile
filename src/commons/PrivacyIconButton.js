import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
// helpers
import * as ArticlePrivacyHelpers from '../helpers/ArticlePrivacyHelpers';

const PrivacyIconButton = ({
  changeArticlePrivacy,
  iconSize,
  article,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => ArticlePrivacyHelpers.changeArticlePrivacy(changeArticlePrivacy, article.userId, article._id)}
  >
    <Ionicons size={iconSize || 26} name='md-globe' color={article.isPublic ? '#000000' : Colors.lightGreyColor} />
  </TouchableOpacity>
);

PrivacyIconButton.propTypes = {
  iconSize: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginHorizontal: 6,
    position: 'absolute',
    right: 60,
    bottom: '0%',
  },
});

export default PrivacyIconButton;
