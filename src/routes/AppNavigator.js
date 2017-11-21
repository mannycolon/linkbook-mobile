import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import Navigator from './Navigator';
import { LoginScreen } from '../screens';

class AppNavigator extends Component {
  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.navigationReducer,
    });

    if (this.props.userReducer.isLogged) {
      return <Navigator navigation={navigation} />;
    }
    return <LoginScreen />;
  }
}

const mapStateToProps = (state) => ({
  navigationReducer: state.navigationReducer,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (value) => {
    dispatch(value);
  },
});

export const router = Navigator.router;

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
