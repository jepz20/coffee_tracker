import React from 'react';
import TextField from 'material-ui/TextField';
import authStyles from '../styles/authentication';
import { primaryColor, secondaryColor } from '../styles/general';

const renderInput = (field) => {
  const { input, label, meta, ...rest } = field;
  return (
    <TextField
      style={ authStyles.textField.general }
      floatingLabelText={label}
      { ...input}
      errorText={ meta.touched && meta.error }
      floatingLabelFixed={ true }
      floatingLabelStyle={ { ...secondaryColor, left: 0 } }
      floatingLabelFocusStyle={ primaryColor }
      onChange={(e) => {
          input.onChange(e.target.value);
          if (!meta.touched) {
            input.onBlur();
            input.onFocus();
          }
        }
      }
      { ...rest }
    />
  );
};

export default renderInput;
