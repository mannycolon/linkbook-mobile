import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import styled from 'styled-components/native';

import {
  HomeScreen,
  NotificationsScreen,
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
        <AddButton onPress={() => navigation.navigate('AddNewLink')}>
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
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#bd0826',
        height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
        paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
      },
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          name='notifications'
          size={25}
          color={tintColor}
        />
      ),
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#bd0826',
        height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
        paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
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
