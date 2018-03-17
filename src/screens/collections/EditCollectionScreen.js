import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image } from 'react-native';
import Hr from 'react-native-hr';
import Colors from '../../constants/Colors';
// actions
import * as CollectionsActions from '../../actions/CollectionsActions';

class EditCollectionScreen extends Component {
  componentWillMount() {
    const { collectionName } = this.props.navigation.state.params;
    this.props.editCollectionNameLabel(collectionName, collectionName);
  }

  componentDidMount() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    const { collectionName } = this.props.navigation.state.params;
    const { imageURL } = this.props.navigation.state.params;
    const { newCollectionName } = this.props.editCollectionReducer;
    const { editCollectionNameLabel } = this.props;
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
          onChangeText={(editedName) => editCollectionNameLabel(collectionName, editedName)}
          value={newCollectionName}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  navigationReducer: state.navigationReducer,
  editCollectionReducer: state.editCollectionReducer,
});

const mapDispatchToProps = (dispatch) => ({
  editCollectionNameLabel: (oldCollectionName, newCollectionName) => {
    dispatch(CollectionsActions.editCollectionNameLabel(oldCollectionName, newCollectionName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCollectionScreen);
