import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Spinner color='#bd0826' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
