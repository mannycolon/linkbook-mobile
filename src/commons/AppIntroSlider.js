import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'intro',
    title: 'Save, Manage and Organize Articles',
    text: "LinkBook is easy to use. All you need is your article's url and you can add it to your linkBook account to read later.",
    icon: 'ios-bookmarks-outline',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'intro1',
    title: 'Super customizable',
    text: 'You can group together your artciles into collections so you can keep article readings organized.',
    icon: 'md-bookmarks',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'intro2',
    title: 'Make your reading Social',
    text: "Other LinkBook users will see the articles that you've added to your list as public.",
    icon: 'ios-people-outline',
    colors: ['#29ABE2', '#4F00BC'],
  },
];

export default class AppIntroductionSlider extends Component {
  _renderItem = props => (
    <LinearGradient
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }} end={{ x: 0.1, y: 1 }}
    >
      <Ionicons style={{ backgroundColor: 'transparent' }} name={props.icon} size={200} color="white" />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={this.props.finalizeAppIntroSlider}
        onSkip={this.props.finalizeAppIntroSlider}
        showSkipButton
      />
    );
  }
}
