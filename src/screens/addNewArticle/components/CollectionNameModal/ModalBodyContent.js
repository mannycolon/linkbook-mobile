import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import Colors from '../../../../constants/Colors';

const ModalBodyContent = ({
  collections,
  isNewCollectionScreenVisible,
  createAndValidateNewCollectionName,
  newCollectionNameIsDuplicate,
  onCollectionNameSelected,
  selectedCollectionNames,
}) => (
  <View style={{ flex: 1 }}>
    {
      isNewCollectionScreenVisible ?
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../../../assets/images/new-collection-placeholder.jpg')}
            style={{ height: 60, width: 60, padding: 0, marginTop: 10 }}
          />
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
          {
            collections.map((collection, index) => {
              const imageSource = collection.articles[0] && collection.articles[0].imageURL ?
                { uri: collection.articles[0].imageURL }
                : require('../../../../../assets/images/new-collection-placeholder.jpg');
              const isSelected = selectedCollectionNames.includes(collection.name);

              return (
                <TouchableOpacity
                  key={index.toString()}
                  style={{ margin: 10 }}
                  onPress={() => onCollectionNameSelected(collection.name)}
                >
                  <Image source={imageSource} style={{ height: 80, width: 80, padding: 0 }}>
                    <View style={{ flex: 1, backgroundColor: isSelected ? 'rgba(0,0,0,.4)' : 'transparent' }}>
                      {
                        isSelected &&
                        <CheckBox
                          isChecked
                          checkBoxColor={Colors.whiteColor}
                          style={{
                            position: 'absolute',
                            padding: 5,
                          }}
                          onClick={() => {}}
                        />
                      }
                    </View>
                  </Image>
                  <Text style={{ alignSelf: 'center' }}>{collection.name}</Text>
                </TouchableOpacity>
              );
            })
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
  selectedCollectionNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ModalBodyContent;
