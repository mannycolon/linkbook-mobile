import { connect } from 'react-redux';
import MyArticlesList from './MyArticlesList';
import * as ArticlesActions from '../../actions/ArticlesActions';
import * as CollectionsActions from '../../actions/collectionsActions';

const mapStateToProps = (state) => ({
  collectionsReducer: state.collectionsReducer,
  navigationReducer: state.navigationReducer,
  myArticles: state.articlesReducer.myArticles,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyArticles: () => dispatch(ArticlesActions.fetchMyArticles()),
  createAndValidateNewCollectionName: (newCollectionName) => dispatch(CollectionsActions.createAndValidateNewCollectionName(newCollectionName)),
  showModal: () => dispatch(CollectionsActions.showModal()),
  hideModal: () => dispatch(CollectionsActions.hideModal()),
  showNewCollectionScreen: () => dispatch(CollectionsActions.showNewCollectionScreen()),
  hideNewCollectionScreen: () => dispatch(CollectionsActions.hideNewCollectionScreen()),
  selectCollectionName: (collectionName) => dispatch(CollectionsActions.selectCollectionName(collectionName)),
  fetchMyCollections: () => dispatch(CollectionsActions.fetchMyCollections()),
  onCollectionNameSelected: (collectionName) => dispatch(CollectionsActions.onCollectionNameSelected(collectionName)),
  updateArticleCollectionNames: (articleId) => dispatch(CollectionsActions.updateArticleCollectionNames(articleId)),
  updateSelectedCollectionNames: (collectionNames) => dispatch(CollectionsActions.updateSelectedCollectionNames(collectionNames)),
  changeArticlePrivacy: (userId, articleId, isPublic) => dispatch(ArticlesActions.changeArticlePrivacy(userId, articleId, isPublic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyArticlesList);
