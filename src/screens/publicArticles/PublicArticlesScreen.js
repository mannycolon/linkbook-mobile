import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image } from 'react-native';// components
import BoxShadow from '../../commons/BoxShadow';
// actions
import * as ArticlesActions from '../../actions/ArticlesActions';

class PublicArticlesScreen extends Component {
  componentDidMount() {
    this.props.fetchPublicArticles();
  }

  componentWillReceiveProps(nextProps) {
    const currentScreenIndex = this.props.navigationReducer.routes[0].index;
    const newScreenIndex = nextProps.navigationReducer.routes[0].index;
    if (currentScreenIndex !== 1 && newScreenIndex === 1) {
      this.props.fetchPublicArticles();
    }
  }

  render() {
    const {
      articles,
    } = this.props.publicArticles;

    return (
      <ScrollView style={{ flex: 1 }}>
        {
          articles.map((article, index) => (
            <BoxShadow key={index.toString()} onPress={() => this.props.navigation.navigate('WebView', article)}>
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

PublicArticlesScreen.propTypes = {
  publicArticles: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      on: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  publicArticles: state.articlesReducer.publicArticles,
  navigationReducer: state.navigationReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublicArticles: () => {
    dispatch(ArticlesActions.fetchPublicArticles());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicArticlesScreen);
