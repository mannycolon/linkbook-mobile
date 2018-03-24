import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const EmptyPublicArticleScreen = () => (
  <View style={styles.container}>
    <Entypo
      name='magnifying-glass'
      size={110}
    />
    <Text style={{ fontWeight: 'bold', color: Colors.blackColor, textAlign: 'center', fontSize: 24 }}>
      Welcome to the public articles screen!
    </Text>
    <Text style={{ opacity: 0.7, color: Colors.blackColor, padding: 20, textAlign: 'center', fontSize: 16 }}>
      Once other linkBook users add articles as public, they will show up here.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyPublicArticleScreen;
