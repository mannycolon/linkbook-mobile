import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import { LoadingScreen } from '../../commons';

export default class WebViewScreen extends Component {
  render() {
    const { uri } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          source={{
            uri,
            method: 'GET',
          }}
          renderLoading={() => <LoadingScreen />}
          javaScriptEnabledAndroid
          startInLoadingState
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
