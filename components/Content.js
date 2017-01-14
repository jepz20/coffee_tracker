import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const mapStateToProps = (state) => ({
  header: state.header,
});

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      white: {
        color: 'white',
        fontSize: '30px',
      },
    };

    return (
      <main>
        <div>Hola Perrada</div>
        { this.props.children}
      </main>
    );
  }
}

Header = connect(mapStateToProps, actions)(Header);
export default Header;
