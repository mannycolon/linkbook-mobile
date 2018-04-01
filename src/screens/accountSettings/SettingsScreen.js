import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
import { List, ListItem, Text, Left, Right, Body, Icon } from 'native-base';
import Colors from '../../constants/Colors';
// actions
import * as LoginActions from '../../actions/LoginActions';

class SettingsScreen extends Component {
  _onDeletePress = () => {
    const message = 'Are you sure you want to delete your LinkBook account? You will not be able to recover your saved articles and collections.';
    Alert.alert(
      'Confirm Deletion',
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            this.props.deleteAccount();
          },
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <ScrollView style={{ display: 'flex', flex: 1, height: '100%' }}>
        <List style={{ backgroundColor: Colors.whiteColor }}>
          <ListItem itemDivider>
            <Text>Account</Text>
          </ListItem>
          <ListItem icon onPress={() => this._onDeletePress()}>
            <Left>
              <Icon name="md-person" style={{ color: Colors.redColor }} />
            </Left>
            <Body>
              <Text style={{ color: Colors.redColor }}>Delete your Account</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" style={{ color: Colors.lightGreyColor }} />
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}

SettingsScreen.propTypes = {
  deleteAccount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAccount: () => dispatch(LoginActions.deleteAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
