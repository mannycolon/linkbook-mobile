/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Share } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default class ExternalShareButton extends Component {
  _shareText(text) {
    Share.share({
      message: text,
    })
      .then(this._showResult)
      .catch(err => console.log(err));
  }

  _showResult = (result) => {
    console.log(result);
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
    alignSelf: 'flex-end',
    marginHorizontal: 5,
    position: 'absolute',
    right: 0,
    bottom: '2%',
  },
});
