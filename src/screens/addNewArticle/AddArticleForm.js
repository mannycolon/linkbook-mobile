import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-native-elements';
import { TextInputWithValidations } from '../../commons';
import { addNewArticleValidations } from './validations';
import Colors from '../../constants/Colors';
// components
import PrivacyPicker from './PrivacyPicker';

const AddArticleForm = ({
  addNewArticle,
  onPrivacyChange,
  isPublic,
  handleSubmit, // comes from reduxForm
  invalid, // comes from reduxForm
  submitting, // comes from reduxForm
}) => (
  <View style={{ flex: 1, width: '100%' }}>
    <Text style={{ margin: 20, marginBottom: -20, fontWeight: 'bold', fontSize: 16 }}>Article URL</Text>
    <Field
      component={TextInputWithValidations}
      name="articleUrl"
      selectionColor={Colors.redColor}
      containerStyle={{ marginVertical: '2%' }}
    />
    <PrivacyPicker
      onPrivacyChange={onPrivacyChange}
      isPublic={isPublic}
    />
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: '10%' }}>
      <Button
        backgroundColor={Colors.blackBlueColor}
        title="Add New Article"
        raised
        fontFamily="montserrat"
        disabled={isPublic === '' ? true : invalid || submitting}
        onPress={handleSubmit(addNewArticle)}
      />
    </View>
  </View>
);

AddArticleForm.propTypes = {
  addNewArticle: PropTypes.func.isRequired,
  onPrivacyChange: PropTypes.func.isRequired,
  isPublic: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired, // comes from reduxForm
  invalid: PropTypes.bool.isRequired, // comes from reduxForm
  submitting: PropTypes.bool.isRequired, // comes from reduxForm
};

export default reduxForm({
  form: 'addNewArticle',
  validate: addNewArticleValidations,
})(AddArticleForm);
