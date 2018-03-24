import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Spinner } from 'native-base';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

const FlexContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

export default class LoadingScreen extends Component {
  render() {
    return (
      <FlexContainer>
        <FontAwesome name='book' size={100} color={Colors.redColor} />
        <Text style={styles.authTitle}>LinkBook</Text>
        <Spinner color='#bd0826' />
      </FlexContainer>
    );
  }
}

const styles = StyleSheet.create({
  authTitle: {
    fontSize: 30,
    color: Colors.redColor,
    backgroundColor: 'transparent',
  },
});
