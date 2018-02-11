import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text } from 'react-native';
import { List, ListItem, Left, Right, Body, Icon } from 'native-base';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
// helpers
import * as ArticlePrivacyHelpers from '../../../../helpers/ArticlePrivacyHelpers';

const NewArticleButtonList = ({
  onPrivacyChange,
  showModal,
  isPublic,
  selectedCollectionNames,
}) => {
  let collections = '';
  selectedCollectionNames.forEach((name) => {
    collections = `${collections} ${name}`;
  });

  return (
    <ScrollView>
      <List style={{ marginRight: 20, marginTop: 40 }}>
        <ListItem
          style={{ margin: 10 }}
          icon
          onPress={() => ArticlePrivacyHelpers.changeArticlePrivacy(onPrivacyChange)}
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
            <Text style={{ color: Colors.greyColor }}>
              {collections}
            </Text>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </ScrollView>
  );
};

NewArticleButtonList.propTypes = {
  onPrivacyChange: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  isPublic: PropTypes.string.isRequired,
  selectedCollectionNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewArticleButtonList;
