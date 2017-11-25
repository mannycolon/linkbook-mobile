/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import LoadingScreen from '../../commons/LoadingScreen';

const BoxShadow = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
  background-color: #FFFFFF;
  shadow-color: #000000;
  shadow-opacity: 0.5;
  shadow-radius: 2;
  shadow-offset: 0px 2px;
  margin-vertical: 2.5;
  elevation: 1;
`;

export default class MyArticlesList extends Component {
  componentDidMount() {
    this.props.fetchMyArticles();
  }

  componentWillReceiveProps(nextProps) {
    const currentScreenIndex = this.props.navigationReducer.routes[0].index;
    const newScreenIndex = nextProps.navigationReducer.routes[0].index;
    if (currentScreenIndex !== 0 && newScreenIndex === 0) {
      this.props.fetchMyArticles();
    }
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
      <ScrollView style={styles.container}>
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
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
