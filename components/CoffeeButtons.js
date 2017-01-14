import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import authStyles from '../styles/authentication.js';

export const PrimaryButton = props => (
  <RaisedButton
    { ...props }
    primary={ true }
    style= { authStyles.button.root }
    labelStyle={ authStyles.button.label }
    overlayStyle = { authStyles.button.overlay }
  />
);

export const SecondaryButton = props => (
  <RaisedButton
    { ...props }
    style= { authStyles.button.root }
    secondary={ true }
    labelStyle={ authStyles.button.labelRegister }
    overlayStyle = { authStyles.button.overlay }
  />
);
