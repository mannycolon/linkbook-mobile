import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export default class NotificationsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NotificationsScreen</Text>
      </View>
    );
  }
}

// NotificationsScreen.propTypes = {
//   variable:	PropTypes.variableType.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
