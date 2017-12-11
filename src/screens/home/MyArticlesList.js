/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Image, Text } from 'react-native';
// components
import LoadingScreen from '../../commons/LoadingScreen';
import BoxShadow from '../../commons/BoxShadow';
import ExternalShareButton from '../../commons/ExternalShareButton';
// helpers
import * as stringHelpers from '../../helpers/stringHelpers';

export default class MyArticlesList extends Component {
  state = {
    refreshing: false,
  }

  componentDidMount() {
    this.props.fetchMyArticles();
  }

  componentWillReceiveProps(nextProps) {
    const currentScreenIndex = this.props.navigationReducer.routes[0].index;
    const newScreenIndex = nextProps.navigationReducer.routes[0].index;
    if (currentScreenIndex !== 0 && newScreenIndex === 0) {
      this.props.fetchMyArticles();
    }
    this.setState({ refreshing: false });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchMyArticles();
  }

  render() {
    const {
      myArticles: {
        isFetched,
        articles,
        error,
      },
      navigation: {
        navigate,
      },
    } = this.props;

    if (!isFetched) {
      return <LoadingScreen />;
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }

    return (
      <FlatList
        key={'flatlistexample'}
        style={{ flex: 1 }}
        data={articles}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          const validImageType = stringHelpers.isPathAImageExtension(item.imageURL);
          const imageSrc = item.imageURL && validImageType ? { uri: item.imageURL } : require('../../../assets/images/no-image.jpg');
          return (
            <BoxShadow key={index.toString()} onPress={() => navigate('WebView', item)}>
              <Image source={imageSrc} style={{ height: '100%', width: '45%', padding: 0, margin: 0 }} />
              <View style={{ width: 0, flexGrow: 1 }}>
                <Text style={{ padding: 10, fontWeight: 'bold', opacity: 0.9 }} ellipsizeMode='tail' numberOfLines={3}>
                  {item.title}
                </Text>
                <ExternalShareButton contentToBeShared={item.articleUrl} />
              </View>
            </BoxShadow>
          );
        }}
        refreshing={this.state.refreshing}
        onRefresh={() => this._onRefresh}
      />
    );
  }
}

MyArticlesList.propTypes = {
  articles:	PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape(),
};
