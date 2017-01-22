import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory, Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import { icons, primaryColor } from '../styles/general.js';
import FontIcon from 'material-ui/FontIcon';

const mapStateToProps = (state) => ({
  header: state.header,
  user: state.user,
  routing: state.routing,
});

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { setHeadersValues, headerValues } = this.props;
    setHeadersValues(headerValues);
  }

  render() {
    const { logout, user, header, toggleDrawerOpen, closeDrawer, routing } = this.props;
    const displayName = user.userInfo.displayName && user.userInfo.displayName.split(' ')[0];
    const goToRoute = (route) => {
      if (routing.locationBeforeTransitions.pathname !== route) {
        hashHistory.push(route);
      }

      closeDrawer();
    };

    const drawerTabIndex = header.drawerOpen ? 0 : -1;
    let focusableElements = header.menuItems.map(item => `drawerItem${item.index}`);
    focusableElements.unshift('drawerItemHeader');
    let firstTab = true;
    let lastTabIndex = -1;
    const handleTab = e => {
      // if drawer is open and is the tab Key handle focus
      if (header.drawerOpen && e.which === 9) {
        e.preventDefault();
        if (!e.shiftKey) {
          lastTabIndex++;
        } else {
          lastTabIndex--;
        }

        if (lastTabIndex >= focusableElements.length) {
          lastTabIndex = 0;
        }

        if (lastTabIndex < 0) {
          lastTabIndex = focusableElements.length - 1;
        }

        document.getElementById(focusableElements[lastTabIndex]).focus();
      }
    };

    return (
      <header onKeyDown= { handleTab }>
        <AppBar
          title= { <Link to="/" className="header__title">{ header.title }</Link>  }
          onLeftIconButtonTouchTap = { toggleDrawerOpen }
          iconElementLeft={
            <IconButton
              iconStyle={ icons.primaryTextColor }
              iconClassName='fa fa-bars'
              aria-label="Toggle Menu"
            />
          }
          iconElementRight = {
            <div>
              <IconButton
                iconStyle={ icons.primaryTextColor }
                iconClassName='fa fa-sign-out'
                aria-label="logout"
                onTouchTap={ logout }
              />
              <IconButton
                iconStyle={ icons.primaryTextColor }
                aria-label="go to github"
                style={{ paddingTop: 0 }}
                iconClassName='fa fa-github'
                href={ header.githubLink }
              />
            </div>
          }
        />
        <Drawer
          open={ header.drawerOpen }
          docked={false}
          onRequestChange={(open) => toggleDrawerOpen()}
          tabIndex={ drawerTabIndex }
        >
          <MenuItem
            tabIndex={ drawerTabIndex }
            aria-hidden={!header.drawerOpen}
            id="drawerItemHeader"
            onTouchTap={ () => goToRoute('/') }
          >
            <h2>{ `Hello ${displayName || ''}` }</h2>
          </MenuItem>
          {
            header.menuItems.map(item => (
              <MenuItem
                tabIndex={ drawerTabIndex }
                aria-hidden={!header.drawerOpen}
                leftIcon={ <FontIcon
                  style= { { ...primaryColor, marginTop: '0px' } }
                  className={item.icon}
                /> }
                key={item.index}
                id={`drawerItem${item.index}`}
                onTouchTap={ () => goToRoute(item.route) }
              >
                { item.label }
              </MenuItem>
            ))
        }
        </Drawer>
      </header>
    );
  }
}

Header = connect(mapStateToProps, actions)(Header);
export default Header;
