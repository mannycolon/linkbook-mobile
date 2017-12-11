import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
// components
import ExternalShareButton from '../../commons/ExternalShareButton';
import BoxShadow from '../../commons/BoxShadow';
// helpers
import * as stringHelpers from '../../helpers/stringHelpers';

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
          articles.map((article, index) => {
            const validImageType = stringHelpers.isPathAImageExtension(article.imageURL);
            const imageSrc = article.imageURL && validImageType ? { uri: article.imageURL } : require('../../../assets/images/no-image.jpg');
            return (
              <BoxShadow key={index.toString()} onPress={() => this.props.navigation.navigate('WebView', article)}>
                <Image source={imageSrc} style={{ height: '100%', width: '45%', padding: 0, margin: 0 }} />
                <View style={{ width: 0, flexGrow: 1 }}>
                  <Text style={{ padding: 10, fontWeight: 'bold', opacity: 0.9 }} ellipsizeMode='tail' numberOfLines={4}>
                    {article.title}
                  </Text>
                  <ExternalShareButton contentToBeShared={article.articleUrl} />
                </View>
              </BoxShadow>
            );
          })
        }
      </ScrollView>
    );
  }
}
