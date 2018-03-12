import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { Thumbnail, List, ListItem, Left, Right, Body, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
// actions
import * as LoginActions from '../../actions/LoginActions';
// constants
const pkg = require('../../../package.json');

const Container = styled.View`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.redColor};
`;

const ProfileScreen = ({
  user: {
    avatar,
    fullName,
    email,
  },
  logout,
}) => (
  <ScrollView style={{ height: '100%', backgroundColor: Colors.redColor }}>
    <View style={{ display: 'flex', flex: 1, justifyContent: 'space-between', height: '100%' }}>
      <Container>
        <Thumbnail large source={{ uri: avatar }} style={{ margin: 10, borderColor: Colors.whiteColor, borderWidth: 2 }} />
        <Text style={{ fontWeight: 'bold', margin: 10, color: Colors.whiteColor }}>{fullName}</Text>
        <Text style={{ fontWeight: 'bold', margin: 10, color: Colors.whiteColor }}>{email}</Text>
      </Container>

      <View>
        <List style={{ backgroundColor: Colors.redColor }}>
          <ListItem icon style={{ backgroundColor: Colors.redColor }}>
            <Left>
              <Icon name="ios-settings" style={{ color: '#ffffff' }} />
            </Left>
            <Body>
              <Text style={{ color: Colors.whiteColor }}>Settings</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => logout()} style={{ backgroundColor: Colors.redColor }}>
            <Left>
              <FontAwesome size={23} name='sign-out' color='#ffffff' />
            </Left>
            <Body>
              <Text style={{ color: Colors.whiteColor }}>Logout</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
        <View>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', padding: 5, color: Colors.whiteColor }}>
            LinkBook version: {pkg.version}
          </Text>
        </View>
      </View>
    </View>
  </ScrollView>
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
