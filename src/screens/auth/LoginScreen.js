import React, { Component } from 'react';
import { Facebook, Google } from 'expo';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { LoadingScreen } from '../../commons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { login } from '../../actions/LoginActions';
import fbConfig from '../../constants/fbConfig';
import googleConfig from '../../constants/googleConfig';

const FlexContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const MeetupText = styled.Text`
  color: ${Colors.redColor};
  font-size: 18;
  font-family: montserratBold;
`;

const BottomButtonWrapper = styled.View`
  flex: 0.2;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ color }) => color};
  flex-direction: row;
  padding-horizontal: 10;
`;

class LoginScreen extends Component {
  state = {
    loading: false,
  }

  _onLoginPress = provider => {
    this.setState({ loading: true });
    if (provider === 'facebook') {
      this._loginWithFacebook();
    } else {
      this.loginWithGoogle();
    }
  }

  async _loginWithFacebook() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(fbConfig.APP_ID, {
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        this.props.login(token, 'facebook');
      } else {
        this.setState({ loading: false });
        throw new Error('Something went wrong with the Facebook authentication');
      }
    } catch (error) {
      this.setState({ loading: false });
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidClientId: googleConfig.CLIENT_ID_ANDROID,
        androidStandaloneAppClientId: googleConfig.CLIENT_ID_ANDROID_STANDALONE_APP,
        iosClientId: googleConfig.CLIENT_ID_IOS,
        scopes: ['profile', 'email'],
        behavior: 'web',
      });

      if (result.type === 'success') {
        this.props.login(result.accessToken, 'google');
      } else {
        this.setState({ loading: false });
        return { cancellled: true };
      }
    } catch (error) {
      this.setState({ loading: false });
      throw error;
    }
  }

  render() {
    if (this.props.userReducer.isLoading || this.state.loading) {
      return <LoadingScreen color={Colors.redColor} />;
    }
    return (
      <FlexContainer>
        <FlexContainer>
          <FontAwesome name='book' size={100} color={Colors.redColor} />
          <Text style={Fonts.authTitle}>LinkBook</Text>
        </FlexContainer>
        <FlexContainer>
          <FlexContainer>
            <FlexContainer>
              <Text style={Fonts.authWelcomeTitle}>Welcome!</Text>
            </FlexContainer>
            <FlexContainer>
              <Text style={Fonts.authWelcomeText}>
                Start managing your <MeetupText>reading list of articles</MeetupText> quickly and efficiently
              </Text>
            </FlexContainer>
          </FlexContainer>
          <BottomButtonWrapper>
            <Button color="#db3236" onPress={() => this._onLoginPress('google')}>
              <Text style={Fonts.buttonAuth}>Connect with</Text>
              <MaterialCommunityIcons name="google" size={30} color="#fff" />
            </Button>
            <Button color="#3b5998" onPress={() => this._onLoginPress('facebook')}>
              <Text style={Fonts.buttonAuth}>Connect with</Text>
              <MaterialCommunityIcons name="facebook" size={30} color="#fff" />
            </Button>
          </BottomButtonWrapper>
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  login: (token, provider) => {
    dispatch(login(token, provider));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
