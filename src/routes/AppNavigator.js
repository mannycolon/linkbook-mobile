import React, { Component } from 'react';
import { Alert, BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Navigator from './Navigator';
import { LoginScreen } from '../screens';
// actions
import * as ArticlesActions from '../actions/ArticlesActions';

class AppNavigator extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addArticleErrorMessage) {
      Alert.alert('Error Adding New Article', nextProps.addArticleErrorMessage);
      this.props.clearAddArticleErrorMessage();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigationReducer } = this.props;
    if (navigationReducer.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const {
      dispatch,
      navigationReducer,
      userReducer,
      errorsReducer: { onError, error },
    } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: navigationReducer,
    });

    if (userReducer.isLogged) {
      if (onError) Alert.alert(error.title, error.message);
      return <Navigator navigation={navigation} />;
    }
    return <LoginScreen />;
  }
}

const mapStateToProps = (state) => ({
  errorsReducer: state.errorsReducer,
  navigationReducer: state.navigationReducer,
  userReducer: state.userReducer,
  addArticleErrorMessage: state.articlesReducer.addArticleErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (value) => {
    dispatch(value);
  },
  clearAddArticleErrorMessage: () => {
    dispatch(ArticlesActions.clearAddArticleErrorMessage());
  },
});

export const router = Navigator.router;

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
