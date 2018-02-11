import { ActionSheet } from 'native-base';
import Colors from '../constants/Colors';
// constants
const DESTRUCTIVE_INDEX = 2;
const CANCEL_INDEX = 2;
const BUTTONS = [
  { text: 'Public', icon: 'md-people', iconColor: Colors.blueColor },
  { text: 'Private', icon: 'md-person', iconColor: Colors.blueColor },
  { text: 'Cancel', icon: 'close', iconColor: Colors.redColor },
];

export const changeArticlePrivacy = (callback, userId, articleId) => {
  ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      title: 'Select the privacy setting for your article',
    },
    buttonIndex => {
      callback(BUTTONS[buttonIndex].text, userId, articleId);
    }
  );
};
