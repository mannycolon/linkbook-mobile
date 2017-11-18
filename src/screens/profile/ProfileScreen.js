import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ProfileScreen</Text>
      </View>
    );
  }
}

// ProfileScreen.propTypes = {
//   variable:	PropTypes.variableType.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
