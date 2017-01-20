import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import authStyles from '../styles/authentication.js';
import { primaryColor, secondaryColor } from '../styles/general';
import SelectField from 'react-md/lib/SelectFields';

const RenderSelectInput = field => {
  const { input, label, meta, loading, items, ...rest } = field;
  return (
      <SelectField
        label={label}
        menuItems={items}
        itemLabel="name"
        { ...rest }
        itemValue="id"
        className="md-cell"
        errorText={meta.error}
        error={ meta.invalid && meta.touched }
        onChange={(newValue, newActiveIndex, event) => input.onChange(newValue)}
        onBlur={()=>input.onBlur()}
      />
  );
};

export default RenderSelectInput;
