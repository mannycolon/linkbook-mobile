import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import styled from 'styled-components/native';
import HomeNavigator from './HomeNavigator';

import {
  AddNewLinkScreen,
  WebViewScreen,
} from '../screens';

const CloseButton = styled(TouchableOpacity)`
  marginLeft: 10;
`;

export default StackNavigator({
  Home: { screen: HomeNavigator },
  AddNewLink: {
    screen: AddNewLinkScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Add a new link',
      headerStyle: {
        backgroundColor: '#bd0826',
        height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
        paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
      headerLeft:
        <CloseButton onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="close"
            size={30}
            color="#ffffff"
          />
        </CloseButton>,
    }),
  },
  WebView: {
    screen: WebViewScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#bd0826',
        height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
        paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
      headerLeft:
        <CloseButton onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={30}
            color="#ffffff"
          />
        </CloseButton>,
    }),
  },
}, {
  mode: 'modal',
});
