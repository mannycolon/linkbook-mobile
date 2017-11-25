import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item as FormItem } from 'native-base';
import Colors from '../../constants/Colors';

const Item = Picker.Item;

const PrivacyPicker = ({
  onPrivacyChange,
  isPublic,
}) => (
  <View style={styles.container}>
    <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 16, fontWeight: 'bold' }}>Article's Privacy</Text>
    <Container>
      <Content>
        <Form>
          <Picker
            renderHeader={backAction =>
              (<Header style={{ backgroundColor: Colors.redColor }}>
                <Left>
                  <Button transparent onPress={backAction}>
                    <Icon name="arrow-back" style={{ color: '#ffffff' }} />
                  </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                  <Title style={{ color: '#ffffff' }}>Select Article's Privacy</Title>
                </Body>
                <Right />
              </Header>)
            }
            iosHeader="Privacy"
            placeholder="Select Article's Privacy"
            mode="dropdown"
            selectedValue={isPublic}
            onValueChange={onPrivacyChange}
          >
            <Item label="Private" value="false" />
            <Item label="Public" value="true" />
          </Picker>
        </Form>
      </Content>
    </Container>
  </View>
);

PrivacyPicker.propTypes = {
  // variable:	PropTypes.variableType.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5,
  },
});

export default PrivacyPicker;
