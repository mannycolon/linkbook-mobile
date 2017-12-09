import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { ActionSheet, List, ListItem, Left, Right, Body, Icon } from 'native-base';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';

const BUTTONS = [
  { text: 'Public', icon: 'md-people', iconColor: Colors.blueColor },
  { text: 'Private', icon: 'md-person', iconColor: Colors.blueColor },
  { text: 'Cancel', icon: 'close', iconColor: Colors.redColor },
];
const DESTRUCTIVE_INDEX = 2;
const CANCEL_INDEX = 2;

const NewArticleButtonList = ({
  onPrivacyChange,
  showModal,
  isPublic,
  newCollectionName,
}) => (
  <List style={{ marginRight: 20, marginTop: 40 }}>
    <ListItem
      style={{ margin: 10 }}
      icon
      onPress={() =>
        ActionSheet.show(
          {
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            title: 'Select the privacy setting for your article',
          },
          buttonIndex => {
            onPrivacyChange(BUTTONS[buttonIndex].text);
          }
        )
      }
    >
      <Left>
        <Ionicons size={28} name='md-globe' />
      </Left>
      <Body>
        <Text style={{ fontSize: 16 }}>Article's Privacy Setting</Text>
      </Body>
      <Right>
        <Text style={{ color: Colors.greyColor }}>{isPublic}</Text>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
    <ListItem
      style={{ margin: 10 }}
      icon
      onPress={() => showModal()}
    >
      <Left>
        <MaterialIcons size={23} name='collections-bookmark' />
      </Left>
      <Body>
        <Text style={{ fontSize: 16 }}>Collections</Text>
      </Body>
      <Right>
        <Text style={{ color: Colors.greyColor }}>{newCollectionName}</Text>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  </List>
);

NewArticleButtonList.propTypes = {
  onPrivacyChange: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  isPublic: PropTypes.string.isRequired,
  newCollectionName: PropTypes.string.isRequired,
};

export default NewArticleButtonList;
