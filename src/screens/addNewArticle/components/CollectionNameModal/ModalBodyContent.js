import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';

const ModalBodyContent = ({
  collections,
  isNewCollectionScreenVisible,
  createAndValidateNewCollectionName,
  newCollectionNameIsDuplicate,
  selectCollectionName,
}) => (
  <View style={{ flex: 1 }}>
    {
      isNewCollectionScreenVisible ?
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: 'https://cdn.patricktriest.com/blog/images/posts/async-await/async_await_header.png' }} style={{ height: 60, width: 60, padding: 0, marginTop: 10 }} />
          <FormInput
            autoFocus
            onChangeText={createAndValidateNewCollectionName}
            style={{ width: 120, textAlign: 'center', margin: 5, padding: 5 }}
          />
          { 
            newCollectionNameIsDuplicate &&
            <FormValidationMessage>
              {'Collection name already exists'}
            </FormValidationMessage>
          }
        </View>
        :
        <ScrollView horizontal contentContainerStyle={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity key={'none'} onPress={() => selectCollectionName('none')}>
            <Image source={require('../../../../../assets/images/none.png')} style={{ height: 80, width: 80, padding: 0, margin: 10 }} />
            <Text style={{ alignSelf: 'center' }}>None</Text>
          </TouchableOpacity>
          {
            collections.map((collection, index) => (
              <TouchableOpacity key={index.toString()} onPress={() => selectCollectionName(collection.name)}>
                <Image source={{ uri: collection.articles[0].imageURL }} style={{ height: 80, width: 80, padding: 0, margin: 10 }} />
                <Text style={{ alignSelf: 'center' }}>{collection.name}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
    }
  </View>
);

ModalBodyContent.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object),
  isNewCollectionScreenVisible: PropTypes.bool.isRequired,
  createAndValidateNewCollectionName: PropTypes.func.isRequired,
  newCollectionNameIsDuplicate: PropTypes.bool.isRequired,
  selectCollectionName: PropTypes.func.isRequired,
};

export default ModalBodyContent;
