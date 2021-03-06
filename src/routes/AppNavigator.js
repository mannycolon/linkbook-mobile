import React, { Component } from 'react';
import { Alert, BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
// components
import Navigator from './Navigator';
import AppIntroSlider from '../commons/AppIntroSlider';
import { LoginScreen } from '../screens';
// actions
import * as ArticlesActions from '../actions/ArticlesActions';
import * as LoginActions from '../actions/LoginActions';
import * as ErrorAlertActions from '../actions/ErrorAlertActions';

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
      finalizeAppIntroSlider,
      errorsReducer: { onError, error },
    } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: navigationReducer,
    });

    if (userReducer.isLogged) {
      if (onError) {
        Alert.alert(
          error.title,
          error.message,
          [
            { text: 'OK', onPress: () => this.props.clearErrorReducer() },
          ]
        );
      }
      if (userReducer.showAppIntroSlider) return <AppIntroSlider finalizeAppIntroSlider={finalizeAppIntroSlider} />;
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
  dispatch: (value) => dispatch(value),
  clearAddArticleErrorMessage: () => dispatch(ArticlesActions.clearAddArticleErrorMessage()),
  finalizeAppIntroSlider: () => dispatch(LoginActions.finalizeAppIntroSlider()),
  clearErrorReducer: () => dispatch(ErrorAlertActions.clearErrorReducer()),
});

export const router = Navigator.router;

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
