import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { TextInputWithValidations } from '../../../../commons';
import { addNewArticleValidations } from './validations';
import Colors from '../../../../constants/Colors';
// components
import NewArticleButtonList from './NewArticleButtonList';

const AddNewArticle = ({
  addNewArticle,
  onPrivacyChange,
  isPublic,
  showModal,
  newCollectionName,
  handleSubmit, // comes from reduxForm
  invalid, // comes from reduxForm
  submitting, // comes from reduxForm
}) => (
  <View style={{ flex: 1, width: '100%' }}>
    <Field
      component={TextInputWithValidations}
      name="articleUrl"
      label="Article's URL"
      labelStyle={{ fontWeight: 'bold', fontSize: 16, color: Colors.blackColor }}
      selectionColor={Colors.redColor}
      containerStyle={{ marginVertical: '2%', marginTop: 40 }}
    />
    <NewArticleButtonList
      onPrivacyChange={onPrivacyChange}
      showModal={showModal}
      isPublic={isPublic}
      newCollectionName={newCollectionName}
    />
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: '0%' }}>
      <Button
        full
        success
        fontFamily="montserrat"
        disabled={isPublic === '' ? true : invalid || submitting}
        onPress={handleSubmit(addNewArticle)}
        style={{ height: 55 }}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Add New Article</Text>
      </Button>
    </View>
  </View>
);

AddNewArticle.propTypes = {
  addNewArticle: PropTypes.func.isRequired,
  onPrivacyChange: PropTypes.func.isRequired,
  isPublic: PropTypes.string.isRequired,
  newCollectionName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired, // comes from reduxForm
  invalid: PropTypes.bool.isRequired, // comes from reduxForm
  submitting: PropTypes.bool.isRequired, // comes from reduxForm
};

export default reduxForm({
  form: 'addNewArticle',
  validate: addNewArticleValidations,
})(AddNewArticle);