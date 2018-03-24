import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const EmptyArticleListScreen = () => (
  <View style={styles.container}>
    <FontAwesome name='book' size={100} />
    <Text style={{ fontWeight: 'bold', color: Colors.blackColor, fontSize: 28 }}>
      Welcome to linkBook!
    </Text>
    <Text style={{ opacity: 0.7, color: Colors.blackColor, padding: 20, textAlign: 'center', fontSize: 16 }}>
      Tap the <MaterialIcons name='add-circle' size={30} /> icon to add a new article to your article list.
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

export default EmptyArticleListScreen;
