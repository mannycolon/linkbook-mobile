import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { Thumbnail, List, ListItem, Left, Right, Body, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
// actions
import * as LoginActions from '../../actions/LoginActions';
// constants
const pkg = require('../../../package.json');

const ProfileScreen = ({
  user: {
    avatar,
    fullName,
    email,
  },
  logout,
}) => (
  <ScrollView style={{ display: 'flex', flex: 1, height: '100%', backgroundColor: Colors.redColor }}>
    <View style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'space-between' }}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Thumbnail large source={{ uri: avatar }} style={{ margin: 10, borderColor: Colors.whiteColor, borderWidth: 2 }} />
        <Text style={{ fontWeight: 'bold', margin: 10, color: Colors.whiteColor }}>{fullName}</Text>
        <Text style={{ fontWeight: 'bold', margin: 10, color: Colors.whiteColor }}>{email}</Text>
      </View>
      <List style={{ backgroundColor: Colors.redColor }}>
        <ListItem icon style={{ backgroundColor: Colors.redColor }}>
          <Left>
            <Icon name="ios-settings" style={{ color: '#ffffff' }} />
          </Left>
          <Body>
            <Text style={{ color: Colors.whiteColor }}>Settings</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" style={{ color: '#ffffff' }} />
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
            <Icon name="arrow-forward" style={{ color: '#ffffff' }} />
          </Right>
        </ListItem>
      </List>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', padding: 5, color: Colors.whiteColor }}>
        LinkBook version: {pkg.version}
      </Text>
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
