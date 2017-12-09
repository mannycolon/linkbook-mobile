import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';// components
import BoxShadow from '../../commons/BoxShadow';

export default class CollectionArticlesScreen extends Component {
  render() {
    const {
      collection: {
        articles,
      },
    } = this.props.navigation.state.params;
    return (
      <ScrollView style={{ flex: 1 }}>
        {
          articles.map((article, index) => (
            <BoxShadow key={index} onPress={() => this.props.navigation.navigate('WebView', article)}>
              <Image source={{ uri: article.imageURL }} style={{ height: '100%', width: '45%', padding: 0, margin: 0 }} />
              <View style={{ width: 0, flexGrow: 1 }}>
                <Text style={{ padding: 10, fontWeight: 'bold', opacity: 0.9 }} ellipsizeMode='tail' numberOfLines={4}>
                  {article.title}
                </Text>
              </View>
            </BoxShadow>
          ))
        }
      </ScrollView>
    );
  }
}
