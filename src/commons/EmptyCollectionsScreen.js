import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const EmptyCollectionsScreen = () => (
  <View style={styles.container}>
    <MaterialIcons
      name='collections-bookmark'
      size={100}
    />
    <Text style={{ fontWeight: 'bold', color: Colors.blackColor, textAlign: 'center', fontSize: 24 }}>
      Welcome to your collections screen!
    </Text>
    <Text style={{ opacity: 0.7, color: Colors.blackColor, padding: 20, textAlign: 'center', fontSize: 16 }}>
      Once you add articles to a collection, they will show up here.
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

export default EmptyCollectionsScreen;
