import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, View, Text, Image } from 'react-native';// components
import BoxShadow from '../../commons/BoxShadow';
// actions
import * as ArticlesActions from '../../actions/ArticlesActions';

class PublicArticlesScreen extends Component {
  state = {
    refreshing: false,
  }

  componentDidMount() {
    this.props.fetchPublicArticles();
  }

  componentWillReceiveProps(nextProps) {
    const currentScreenIndex = this.props.navigationReducer.routes[0].index;
    const newScreenIndex = nextProps.navigationReducer.routes[0].index;
    if (currentScreenIndex !== 1 && newScreenIndex === 1) {
      this.props.fetchPublicArticles();
    }
    this.setState({ refreshing: false });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchPublicArticles();
  }

  render() {
    const {
      publicArticles: {
        articles,
      },
      navigation: {
        navigate,
      },
    } = this.props;

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
