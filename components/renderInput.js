import React from 'react';
import TextField from 'material-ui/TextField';
import authStyles from '../styles/authentication.js';

const renderInput = (field) => {
  const { input, label, type, id, meta } = field;
  return (
    <TextField
      style={ authStyles.textField.general }
      floatingLabelText={label}
      { ...input}
      errorText={ meta.touched && meta.error }
      floatingLabelFixed={true}
      id={ id }
      type={ type }
    />
  );
};

export default renderInput;
