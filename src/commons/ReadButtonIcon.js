import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const ReadButtonIcon = ({
  updateArticleReadSetting,
  iconSize,
  article,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => updateArticleReadSetting(article._id, !article.isRead)}
  >
    <MaterialCommunityIcons size={iconSize || 27} name='read' color={article.isRead ? Colors.blackColor : Colors.lightGreyColor} />
  </TouchableOpacity>
);

ReadButtonIcon.propTypes = {
  updateArticleReadSetting: PropTypes.func,
  iconSize: PropTypes.number,
  article: PropTypes.shape({
    _id: PropTypes.string,
    isRead: PropTypes.oneOfType([
      PropTypes.any,
      PropTypes.bool,
    ]),
  }),
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

export default ReadButtonIcon;
