import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import styled from 'styled-components/native';
import HomeNavigator from './HomeNavigator';
import ExternalShareButton from '../commons/ExternalShareButton';
import {
  AddNewArticleScreen,
  WebViewScreen,
  CollectionArticlesScreen,
  EditCollectionScreen,
  AddToCollectionScreen,
} from '../screens';

const CloseButton = styled(TouchableOpacity)`
  marginLeft: 10;
`;

const HeaderRight = styled(TouchableOpacity)`
  marginRight: 10;
`;

export default StackNavigator({
  Home: { screen: HomeNavigator },
  AddNewArticle: {
    screen: AddNewArticleScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Add New Article',
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
  CollectionArticles: {
    screen: CollectionArticlesScreen,
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
      headerRight:
        <HeaderRight onPress={() => navigation.state.params.openCollectionSettingsModal()}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="#ffffff"
          />
        </HeaderRight>,

    }),
  },
  EditCollection: {
    screen: EditCollectionScreen,
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
            name="close"
            size={30}
            color="#ffffff"
          />
        </CloseButton>,
      headerRight:
        <HeaderRight onPress={() => console.log('check-mark')}>
          <MaterialIcons
            name="check"
            size={30}
            color="#ffffff"
          />
        </HeaderRight>,
    }),
  },
  AddToCollection: {
    screen: AddToCollectionScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Select articles to add',
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
      headerRight:
        <HeaderRight
          onPress={() => {
            navigation.goBack();
            navigation.state.params.finalize();
          }}
        >
          <MaterialIcons
            name="check"
            size={30}
            color="#ffffff"
          />
        </HeaderRight>,
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
      headerRight:
        <ExternalShareButton
          iconColor="#ffffff"
          iconSize={26}
          contentToBeShared={navigation.state.params.articleUrl}
        />,
    }),
  },
}, {
  mode: 'modal',
});
