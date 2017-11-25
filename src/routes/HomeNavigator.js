import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import styled from 'styled-components/native';

import {
  HomeScreen,
  PublicArticlesScreen,
  ProfileScreen,
} from '../screens';

const AddButton = styled(TouchableOpacity)`
  marginRight: 10;
`;

export default TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#bd0826',
        height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
        paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
      },
      headerRight: (
        <AddButton onPress={() => navigation.navigate('AddNewArticle')}>
          <MaterialIcons
            name='add-circle'
            size={30}
            color="#FFFFFF"
          />
        </AddButton>
      ),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="home"
          size={25}
          color={tintColor}
        />
      ),
    }),
  },
  PublicArticles: {
    screen: PublicArticlesScreen,
    navigationOptions: () => ({
      title: 'Articles from other users',
      headerStyle: {
        backgroundColor: '#bd0826',
        height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
        paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          name='library-books'
          size={25}
          color={tintColor}
        />
      ),
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#bd0826',
        height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
        paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          name='account-circle'
          size={25}
          color={tintColor}
        />
      ),
    }),
  },
}, {
  swipeEnabled: true,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcon: true, // android doesn't show it automatically.
    inactiveTintColor: '#D3D3D3',
    activeTintColor: '#000000',
    pressColor: '#bd0826',
    indicatorStyle: {
      backgroundColor: '#FFFFFF',
    },
    style: {
      backgroundColor: '#FFFFFF',
    },
  },
});
