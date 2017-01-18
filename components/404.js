import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import App from './App.js';

const mapStateToProps = (state) => ({
  header: state.header,
});

class Error404 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div>I'm not, therefore I don't Exist</div>
        <Link to="/"><button>I do Exist</button></Link>
      </div>
    );
  }
}

Error404 = connect(mapStateToProps, actions)(Error404);
export default Error404;
