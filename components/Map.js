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

class Map extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <main>
        <div>Hola SOY UN MAPA</div>
      </main>
    );
  }
}

Map = connect(mapStateToProps, actions)(Map);
export default Map;
