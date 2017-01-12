import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Paper from 'material-ui/Paper';
const mapStateToProps = (state) => ({
  login: state.login,
  routing: state.routing,
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onLoginButton = this.onLoginButton.bind(this);
    this.onSignInWithGoggleButton = this.onSignInWithGoggleButton.bind(this);
    this.onCreateAccountButton = this.onCreateAccountButton.bind(this);
  }

  onEmailChanged(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  onLoginButton() {
    const { signInWithEmail } = this.props;
    const { email, password } = this.state;
    signInWithEmail(email, password);
  }

  onSignInWithGoggleButton() {
    const { signInWithGoogle } = this.props;
    signInWithGoogle();
  }

  onCreateAccountButton() {
    const { toggleShowLogin } = this.props;
    toggleShowLogin();
  }

  render() {
    const { primary1Color, accent2Color } = this.props.muiTheme.palette;
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
      button: {
        label: {
          fontSize: '20px',
          verticalAlign: 'middle',
          textTransform: 'capitalize',
        },
        labelRegister: {
          fontSize: '20px',
          verticalAlign: 'middle',
          textTransform: 'capitalize',
          color: accent2Color,
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
        color: '#4E342E',
        fontSize: 35,
        marginRight: '10px',
      },
    };

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
              <h2>Create Your Account</h2>
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
                  onChange={this.onEmailChanged}
                /><br />
                <TextField
                  style={ styles.textField.general }
                  floatingLabelText="Password"
                  id="loginPassword"
                  type="password"
                  required="true"
                  floatingLabelFixed={true}
                  onChange={this.onPasswordChanged}
                /><br />
                <RaisedButton
                  type="submit"
                  label="Create Account"
                  onClick={ this.onLoginButton }
                  style= { styles.button.root }
                  primary={ true }
                  labelStyle={ styles.button.label }
                  overlayStyle = { styles.button.overlay }
                />
              </form>
              <Divider style={ styles.divider }/>
              <br />
              <RaisedButton
                label="Login"
                style= { styles.button.root }
                secondary={ true }
                labelStyle={ styles.button.labelRegister }
                overlayStyle = { styles.button.overlay }
                onClick = {this.onCreateAccountButton }
              />
            </div>
          </Paper>
        </div>
      </main>

    );
  }
};

Register = connect(mapStateToProps, actions)(Register);
export default muiThemeable()(Register);
