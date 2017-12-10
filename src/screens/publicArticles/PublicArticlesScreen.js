import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, View, Text, Image, Share, TouchableOpacity } from 'react-native';// components
import { SimpleLineIcons } from '@expo/vector-icons';
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

  _shareText(text) {
    Share.share({
      message: text,
    })
      .then(this._showResult)
      .catch(err => console.log(err));
  }

  _showResult = (result) => {
    console.log(result);
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
              <Text style={{ padding: 10, fontWeight: 'bold', opacity: 0.9 }} ellipsizeMode='tail' numberOfLines={3}>
                {item.title}
              </Text>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', marginHorizontal: 5, position: 'absolute', right: 0, bottom: '2%' }}
                onPress={() => this._shareText(item.articleUrl)}
              >
                <SimpleLineIcons size={23} name='share' />
              </TouchableOpacity>
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
