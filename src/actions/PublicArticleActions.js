import { NavigationActions } from 'react-navigation';
// actions
import * as AddNewArticleActions from './AddNewArticleActions';

export function addPublicArticleToMyArticles(articleUrl) {
  return ((dispatch) => {
    dispatch(AddNewArticleActions.addNewArticleUrl(articleUrl));
    dispatch(
      NavigationActions.navigate({
        routeName: 'AddNewArticle',
      })
    );
  });
}
