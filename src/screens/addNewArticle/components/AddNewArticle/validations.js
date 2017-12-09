export const addNewArticleValidations = values => {
  const errors = {};
  const requiredFields = ['articleUrl'];
  const warning = 'Please fill out this field.';
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.title && values.title.length === 0) {
    errors.title = warning;
  }

  return errors;
};
