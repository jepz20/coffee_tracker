import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';

import FontIcon from 'material-ui/FontIcon';

const mapStateToProps = (state) => ({
  header: state.header,
});

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { logout } = this.props;
    const styles = {
      white: {
        color: 'white',
        fontSize: '30px',
      },
    };

    return (
      <header>
        <AppBar
          title="CoffeeT"
          onLeftIconButtonTouchTap = { this.handleToggle }
          iconElementRight = {
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Sign out" onTouchTap={logout}/>
              <MenuItem role="perro" children={<a href="https://github.com/jepz20/coffee_tracker">Github</a>} />
            </IconMenu>
          }
        />
        <Drawer
          open={ this.state.open }
          docked={false}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem>News</MenuItem>
          <MenuItem>Map</MenuItem>
          <MenuItem>Budget</MenuItem>
          <MenuItem>Events</MenuItem>
          <MenuItem>Graphs</MenuItem>
        </Drawer>
      </header>
    );
  }
}

Header = connect(mapStateToProps, actions)(Header);
export default Header;
