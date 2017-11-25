import { connect } from 'react-redux';
import MyArticlesList from './MyArticlesList';
import * as ArticlesActions from '../../actions/ArticlesActions';

const mapStateToProps = (state) => ({
  navigationReducer: state.navigationReducer,
  myArticles: state.articlesReducer.myArticles,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyArticles: () => {
    dispatch(ArticlesActions.fetchMyArticles());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyArticlesList);
