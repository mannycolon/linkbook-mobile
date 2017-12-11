import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import { LoadingScreen } from '../../commons';

export default class WebViewScreen extends Component {
  render() {
    const { articleUrl } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: articleUrl,
            method: 'GET',
          }}
          renderLoading={() => <LoadingScreen />}
          javaScriptEnabledAndroid
          startInLoadingState
          thirdPartyCookiesEnabled
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
