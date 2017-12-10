/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Image, Text, StyleSheet, RefreshControl } from 'react-native';
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
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {
          articles.map((article, index) => (
            <BoxShadow key={index} onPress={() => navigate('WebView', article)}>
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

MyArticlesList.propTypes = {
  articles:	PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
