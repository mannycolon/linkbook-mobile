/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Share } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default class ExternalShareButton extends Component {
  _shareText(text) {
    Share.share({
      title: 'Share This Article',
      message: text,
    })
      .catch(err => console.log(err));
  }

  render() {
    const { contentToBeShared, iconColor, iconSize } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => this._shareText(contentToBeShared)}>
        <SimpleLineIcons size={iconSize || 23} name='share' color={iconColor || '#000000'} />
      </TouchableOpacity>
    );
  }
}

ExternalShareButton.propTypes = {
  contentToBeShared: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});
