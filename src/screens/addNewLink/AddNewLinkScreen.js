import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AddNewLinkScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add a new link</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
