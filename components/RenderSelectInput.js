import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import authStyles from '../styles/authentication.js';
import { primaryColor, secondaryColor } from '../styles/general';

const RenderSelectInput = field => {
  const { input, label, meta, items, ...rest } = field;
  return (
    <SelectField
      style={ authStyles.textField.general }
      floatingLabelText={label}
      { ...input}
      errorText={ meta.touched && meta.error }
      floatingLabelFixed={true}
      floatingLabelStyle={ { ...secondaryColor, left: 0 } }
      floatingLabelFocusStyle={ primaryColor }
      onChange={(event, index, value) => input.onChange(value)}
      { ...rest }
    >
      {
        items.map(item => <MenuItem key={item.id} value={item.id} primaryText={item.name} />)
      }
    </SelectField>
  );
};

export default RenderSelectInput;
