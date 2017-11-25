import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
// components
import AddArticleForm from './AddArticleForm';
// actions
import * as ArticlesActions from '../../actions/ArticlesActions';

class AddNewArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPublic: '',
      articleUrl: '',
    };
    this.onPrivacyChange = this.onPrivacyChange.bind(this);
    this._addNewArticle = this._addNewArticle.bind(this);
  }

  onPrivacyChange(value) {
    this.setState({
      isPublic: value,
    });
  }

  _addNewArticle = async (values) => {
    await this.props.addNewArticle(values.articleUrl, this.state.isPublic);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <AddArticleForm
          addNewArticle={this._addNewArticle}
          onPrivacyChange={this.onPrivacyChange}
          isPublic={this.state.isPublic}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const mapStateToProps = (state) => ({
  articlesReducer: state.articlesReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addNewArticle: (articleUrl, isPublic) => {
    dispatch(ArticlesActions.addNewArticle(articleUrl, isPublic));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewArticleScreen);
