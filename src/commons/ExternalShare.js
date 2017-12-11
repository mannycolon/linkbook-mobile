/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Share } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default class ExternalShare extends Component {
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
    const { contentToBeShared } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => this._shareText(contentToBeShared)}>
        <SimpleLineIcons size={23} name='share' />
      </TouchableOpacity>
    );
  }
}

ExternalShare.propTypes = {
  contentToBeShared:	PropTypes.string.isRequired,
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
