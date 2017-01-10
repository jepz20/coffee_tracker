import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';
const mapStateToProps = (state) => ({
});

const styles = {
  form: {
    height: '100%',
    width: '100%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    paddingBottom: '40px',
  },
  textField: {
    general: {
      width: '100%',
      margin: '20px',
      fontSize: '25px',
      height: '80px',
    },
  },
  submitButton: {
    label: {
      fontSize: '20px',
      verticalAlign: 'middle',
      textTransform: 'capitalize',
    },
    root: {
      width: '100%',
      height: '50px',
      margin: 20,
    },
    overlay: {
      display: 'inline-block',
      width: '100%',
      lineHeight: '50px',
    },
  },
  divider: {
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
  },
  icon: {
    fontSize: 35,
    display: 'inline-block',
    marginRight: 30,
  },
  logoIcon: {
    color: '#fff',
    marginRight: '10px',
  }
};

class Login extends React.Component {
  render() {
    return (
      <main>
        <div className="login--form">
          <Paper style={styles.form} zDepth={2}>
            <div className="login--form__brand">
              <h2>
                <FontIcon style={styles.logoIcon} className="fa fa-coffee" />
                CoffeeT
              </h2>
            </div>
            <div className="login--form__title">
              <h2>Log in To Your Account</h2>
            </div>
            <div className="login--form__inputs">
              <form>
                <TextField
                  style={ styles.textField.general }
                  floatingLabelText="Email"
                  type="email"
                  id="loginEmail"
                  required="true"
                  floatingLabelFixed={true}
                  onChange={this._onFilterChange}
                /><br />
                <TextField
                  style={ styles.textField.general }
                  floatingLabelText="Password"
                  id="loginPassword"
                  type="password"
                  required="true"
                  floatingLabelFixed={true}
                  onChange={this._onFilterChange}
                /><br />
                <RaisedButton
                  type="submit"
                  label="Log in"
                  style= { styles.submitButton.root }
                  primary={ true }
                  labelStyle={ styles.submitButton.label }
                  overlayStyle = { styles.submitButton.overlay }
                />
              </form>
              <Divider style={ styles.divider }/>
              <br />
              <div>or</div>
              <RaisedButton
                label="Sign in with Google"
                overlayStyle = { styles.submitButton.overlay }
                primary={ true }
                style= { styles.submitButton.root }
                icon={<FontIcon style={ styles.icon } className="fa fa-google" />}
                labelStyle={ styles.submitButton.label }
              />
              <Divider style={ styles.divider }/>
              <br/>
              <h4> New to CoffeeT?</h4>
              <RaisedButton
                label="Create your account"
                style= { styles.submitButton.root }
                secondary={ true }
                labelStyle={ styles.submitButton.label }
                overlayStyle = { styles.submitButton.overlay }
              />
            </div>
          </Paper>
        </div>
      </main>

    );
  }
}

Login = connect(mapStateToProps, actions)(Login);

export default Login;
