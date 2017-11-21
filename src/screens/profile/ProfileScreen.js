import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Thumbnail, List, ListItem, Left, Right, Body, Icon } from 'native-base';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import * as LoginActions from '../../actions/LoginActions';

const TopContainer = styled.View`
  display: flex;
  flex: 0.6;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.redColor};
  shadow-color: #000000;
  shadow-opacity: 0.5;
  shadow-radius: 2;
  shadow-offset: 0px 4px;
  elevation: 1;
`;

const BottomContainer = styled.View`
  display: flex;
  flex: 0.4;
  margin-top: 6;
`;

const ProfileScreen = ({
  user: {
    avatar,
    fullName,
    email,
  },
  logout,
}) => (
  <View style={{ flex: 1 }}>
    <TopContainer>
      <Thumbnail large source={{ uri: avatar }} style={{ margin: 10, borderColor: Colors.whiteColor, borderWidth: 2 }} />
      <Text style={{ fontWeight: 'bold', margin: 10, color: Colors.whiteColor }}>{fullName}</Text>
      <Text style={{ fontWeight: 'bold', margin: 10, color: Colors.whiteColor }}>{email}</Text>
    </TopContainer>
    <BottomContainer>
      <List>
        <ListItem icon>
          <Left>
            <MaterialIcons size={23} name='collections-bookmark' />
          </Left>
          <Body>
            <Text>Collections</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <MaterialCommunityIcons size={23} name='read' />
          </Left>
          <Body>
            <Text>Marked as Read</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <MaterialIcons size={25} name='link' />
          </Left>
          <Body>
            <Text>Linked Accounts</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon name="ios-settings" />
          </Left>
          <Body>
            <Text>Settings</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon onPress={() => logout()}>
          <Left>
            <FontAwesome size={23} name='sign-out' />
          </Left>
          <Body>
            <Text>Logout</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </BottomContainer>
  </View>
);

ProfileScreen.propTypes = {
  user:	PropTypes.shape({
    fullName: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(LoginActions.logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
