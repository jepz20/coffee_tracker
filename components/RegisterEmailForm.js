import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { PrimaryButton } from './CoffeeButtons.js';
import renderInput from './renderInput.js';
import {
  required, email,
  maxLength, minLength, includeNumber,
  includeLowercase, includeUppercase,
  isEqual,
} from '../utils/validations.js';

const RegisterEmailForm = props => (
  <form id="register" onSubmit= { props.handleSubmit(props.doSubmit) }>
    <Field
      name="registerEmail"
      component={renderInput}
      type="email"
      id="registerEmail"
      validate={ [required, email] }
      label="Email" />
    <Field
      name="registerPassword"
      component={renderInput}
      type="password"
      id="registerPassword"
      validate={ [
        required,
        includeLowercase,
        includeUppercase,
        includeNumber,
        minLength(6),
        maxLength(15),
      ] }
      label="Password" />
      <Field
        name="registerConfirmPassword"
        component={renderInput}
        type="password"
        id="registerConfirmPassword"
        validate={ [
          required,
          isEqual('registerPassword', 'Password'),
          includeLowercase,
          includeUppercase,
          includeNumber,
          minLength(6),
          maxLength(15),
        ] }
        label="Confirm Password" />
      <Field
        name="registerName"
        component={renderInput}
        id="registerName"
        validate={ [required, maxLength(50), minLength(2)] }
        label="Name" />
    { props.registerError && <div className="form--error"> { props.registerError } </div> }
    <PrimaryButton label="Create Account" type="submit" />
  </form>
);

export default reduxForm({
  form: 'register',
})(RegisterEmailForm);
