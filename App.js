import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { AppLoading } from 'expo';
import store from './src/redux/store';
import Root from './src/root';

export default class App extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    persistStore(
      store,
      {
        storage: AsyncStorage,
        whitelist: [
          'user',
        ],
      },
      () => this.setState({ ready: true })
    );
  }

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
