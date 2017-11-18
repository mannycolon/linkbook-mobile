import React, { Component } from 'react';
import { View, WebView, StyleSheet, BackAndroid } from 'react-native';
import Spinner from '../../common/Spinner';
import { Container, Header, Content, Toast, Button, Text, Icon } from 'native-base';

export default class WebViewScreen extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnMount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    const { goBack, state } = this.props.navigation;
    // if (_navigator.getCurrentRoutes().length === 1) {
    //  return false;
    // }
    Toast.show({
      text: 'Wrong$',
      position: 'bottom',
      buttonText: 'Okay',
    });
    goBack();
    return true;
  }

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
          renderLoading={() => <Spinner />}
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
