/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import LoadingScreen from '../../commons/LoadingScreen';
import BoxShadow from '../../commons/BoxShadow';

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
        renderItem={({ item, index }) => (
          <BoxShadow key={index} onPress={() => navigate('WebView', item)}>
            <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '45%', padding: 0, margin: 0 }} />
            <View style={{ width: 0, flexGrow: 1 }}>
              <Text style={{ padding: 10, fontWeight: 'bold', opacity: 0.9 }} ellipsizeMode='tail' numberOfLines={4}>
                {item.title}
              </Text>
            </View>
          </BoxShadow>
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
