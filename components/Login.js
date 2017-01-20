import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import authStyles from '../styles/authentication.js';
import LoginEmailForm from './LoginEmailForm.js';
import { PrimaryButton, SecondaryButton } from './CoffeeButtons';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => ({
  login: state.login,
  routing: state.routing,
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginButton = this.onLoginButton.bind(this);
    this.onSignInWithGoogleButton = this.onSignInWithGoogleButton.bind(this);
    this.onCreateAccountButton = this.onCreateAccountButton.bind(this);
  }

  onLoginButton(value) {
    const { signInWithEmail } = this.props;
    const { loginEmail, loginPassword } = value;
    signInWithEmail(loginEmail, loginPassword);
  }

  onSignInWithGoogleButton() {
    const { signInWithGoogle, setUserInfo } = this.props;
    setUserInfo({ logged: -1, userInfo: {} });
    signInWithGoogle();
  }

  onCreateAccountButton() {
    const { setRegisterScreen } = this.props;
    hashHistory.push('/login?register=true');
    setRegisterScreen();
  }

  render() {
    const { loginError } = this.props.login;
    return (
      <div className="login--form">
        <Paper style={authStyles.form} zDepth={2}>
          <div className="login--form__brand">
            <h2>
              <FontIcon style={authStyles.logoIcon} className="fa fa-coffee" />
              CoffeeT
            </h2>
          </div>
          <div className="login--form__title">
            <h2>Log in To Your Account</h2>
          </div>
          <div className="login--form__inputs">
            <LoginEmailForm
              doSubmit={this.onLoginButton}
              loginError= { loginError }
            />
            <Divider style={ authStyles.divider }/>
            <br />
            <div>or</div>
            <PrimaryButton
              label="Signin With Google"
              icon={<FontIcon style={ authStyles.icon } className="fa fa-google" />}
              onClick = { this.onSignInWithGoogleButton }
            />
            <Divider style={ authStyles.divider }/>
            <br/>
            <h4> New to CoffeeT?</h4>
            <SecondaryButton
              label="Create your account"
              onClick = {this.onCreateAccountButton }
            />
          </div>
        </Paper>
      </div>
    );
  }
};

Login = connect(mapStateToProps, actions)(Login);
export default Login;
