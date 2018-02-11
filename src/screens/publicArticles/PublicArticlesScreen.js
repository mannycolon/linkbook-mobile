/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// components
import ArticleCards from '../../commons/ArticleCards';
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
      <ArticleCards
        articles={articles}
        navigate={navigate}
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        onCollectionIconClick={() => console.log('misisng func')}
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
