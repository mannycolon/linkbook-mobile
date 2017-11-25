import React from 'react';
import { AppLoading } from 'expo';
import { AsyncStorage, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
// redux
import store from './src/redux/store';
// components
import Root from './src/root';
import { fontAssets } from './src/helpers';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    ready: false,
  }

  componentDidMount() {
    this._loadAssetsAsync();
    persistStore(
      store,
      {
        storage: AsyncStorage,
        whitelist: [
          'userReducer',
        ],
      },
      () => this.setState({ ready: true })
    );
  }

  async _loadAssetsAsync() {
    await Promise.all(fontAssets);
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded || !this.state.ready) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
