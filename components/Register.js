import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import authStyles from '../styles/authentication.js';
import RegisterEmailForm from '../components/RegisterEmailForm.js';
import Paper from 'material-ui/Paper';
import { PrimaryButton, SecondaryButton } from './CoffeeButtons';

const mapStateToProps = (state) => ({
  login: state.login,
  routing: state.routing,
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.onSignInWithGoogleButton = this.onSignInWithGoogleButton.bind(this);
    this.onLoginButton = this.onLoginButton.bind(this);
    this.onCreateAccountButton = this.onCreateAccountButton.bind(this);
  }

  onSignInWithGoogleButton() {
    const { signInWithGoogle } = this.props;
    signInWithGoogle();
  }

  onLoginButton() {
    const { toggleShowLogin } = this.props;
    toggleShowLogin();
  }

  onCreateAccountButton(value) {
    const { createNewUser } = this.props;
    const { registerEmail, registerPassword } = value;
    createNewUser(registerEmail, registerPassword);
  }

  render() {
    return (
      <main>
        <div className="login--form">
          <Paper style={authStyles.form} zDepth={2}>
            <div className="login--form__brand">
              <h2>
                <FontIcon style={authStyles.logoIcon} className="fa fa-coffee" />
                CoffeeT
              </h2>
            </div>
            <div className="login--form__title">
              <h2>Create Your Account</h2>
            </div>
            <div className="login--form__inputs">
              <RegisterEmailForm doSubmit={ this.onCreateAccountButton }/>
              <Divider style={ authStyles.divider }/>
              <br />
              <div>or</div>
              <PrimaryButton
                label="Register With Google"
                icon={<FontIcon style={ authStyles.icon } className="fa fa-google" />}
                onClick = { this.onSignInWithGoogleButton }
              />
              <Divider style={ authStyles.divider }/>
              <br/>
              <h4> Already Have an Account?</h4>
              <PrimaryButton
                label="Login"
                onClick = {this.onLoginButton }
              />
            </div>
          </Paper>
        </div>
      </main>

    );
  }
};

Register = connect(mapStateToProps, actions)(Register);
export default Register;