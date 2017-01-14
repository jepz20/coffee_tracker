import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { PrimaryButton } from './CoffeeButtons.js';
import renderInput from './renderInput.js';
import { required, email, maxLength } from '../utils/validations.js';

const LoginEmailForm = props => (
  <form id="login" onSubmit= { props.handleSubmit(props.doSubmit) }>
    <Field
      name="loginEmail"
      component={renderInput}
      type="email"
      id="loginEmail"
      validate={ [required, email] }
      label="Email" />
    <Field
      name="loginPassword"
      component={renderInput}
      type="password"
      id="loginPassword"
      validate={ required }
      label="Password" />
    <br/>
    { props.loginError && <div className="form--error"> { props.loginError } </div> }
    <PrimaryButton label="Login" type="submit"
      disabled={ (props.submitting || props.invalid) && !props.pristine }
    />
  </form>
);

export default reduxForm({
  form: 'login',
})(LoginEmailForm);
