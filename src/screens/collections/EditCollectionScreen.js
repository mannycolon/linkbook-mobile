import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image } from 'react-native';
import Hr from 'react-native-hr';
import Colors from '../../constants/Colors';

class EditCollectionScreen extends Component {
  state = {
    text: '',
  }

  componentWillMount() {
    const { collectionName } = this.props.navigation.state.params;
    this.setState({ text: collectionName });
  }

  componentDidMount() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    const { imageURL } = this.props.navigation.state.params;
    const imageSource = imageURL ? { uri: imageURL } : require('../../../assets/images/new-collection-placeholder.jpg');

    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Image source={imageSource} style={{ height: 80, width: 80, padding: 0, marginVertical: 25, marginHorizontal: 20, alignSelf: 'center' }} />
        <Text style={{ fontWeight: 'bold', marginHorizontal: 15, marginVertical: 22 }}>NAME</Text>
        <Hr lineStyle={{ backgroundColor: Colors.greyColor, height: 0.9 }} marginLeft={15} marginRight={15} />
        <TextInput
          ref={(input) => { this.textInput = input; }}
          autoFocus
          style={{ height: 45, borderBottomColor: Colors.blueColor, borderBottomWidth: 1, margin: 15 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  navigationReducer: state.navigationReducer,
});

export default connect(mapStateToProps)(EditCollectionScreen);
