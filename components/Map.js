import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import uuid from 'uuid';
import { hashHistory } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import GoogleMap from 'google-map-react';
import Svg from './Svg';

const mapStateToProps = (state) => ({
  routing: state.routing,
  map: state.map,
});

const API_KEY = 'AIzaSyCTCKi7arfd9BrRlCvZBVmnjPn9NoyHg_8';
class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = { googleApiLoaded: false, bounds: [] };
    this._onChildClick = this._onChildClick.bind(this);
    this._onChildMouseEnter = this._onChildMouseEnter.bind(this);
    this._onChildMouseLeave = this._onChildMouseLeave.bind(this);
    this.drawSvg = this.drawSvg.bind(this);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    this.onBoundsChange = this.onBoundsChange.bind(this);
  }

  componentDidMount() {
    const { fetchGeolocationDetail } = this.props;

    // fetchGeolocationDetail();
  }

  _onChildClick(key, childProps) {
    const { selectedKeyChange, centerChange } = this.props;
    console.log(key, 'onChildClicko');
    // centerChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter(key) {
    const { selectedKeyChange } = this.props;
    console.log(key, 'onChildMouseEnter');
    // selectedKeyChange(key);
  }

  _onChildMouseLeave(key) {
    console.log(key, 'onChildMouseLeave');
    const { selectedKeyChange } = this.props;
    // selectedKeyChange(key);
  }

  onBoundsChange(center, zoom, bounds, marginBounds) {
    const { boundsChanged } = this.props;
    boundsChanged(center, zoom, bounds);
  };

  drawSvg(ref) {
    const { googleApiLoaded } = this.state;
    const { bounds } = this.props.map;
    if (bounds.length == 0)
      return null;
    else {
      const { mapcontainer } = this.refs;
      const { map } = this.props;

      return (
        <Svg
          lat={ bounds[0] }
          key={uuid.v4()}
          lng={ bounds[1] }
          coordinates={ map.coordinates }
          bounds={ bounds }
          zoom={ map.zoom }
          possibleColors={ map.possibleColors}
          height={ mapcontainer ? mapcontainer.offsetHeight : 0 }
          width={ mapcontainer ? mapcontainer.offsetWidth : 0 }
        />
      );
    }
  }

  onGoogleApiLoaded({ map, maps }) {
    this.setState({
      googleApiLoaded: true,
    });
  }

  render() {
    const { map } = this.props;
    const createMapOptions = maps => (
      {
        navigationControl: false,
        scaleControl: false,
        mapTypeControlOptions: {
          position: maps.ControlPosition.TOP_RIGHT,
        },
        mapTypeControl: false,
        mapTypeId: maps.MapTypeId.SATELLITE,
        styles: [
          {
            stylers:
            [
              { saturation: -150 }, { gamma: 0.8 },
              { lightness: 4 }, { visibility: 'on' },
            ],
          },
        ],
      }
    );

    return (
      <div className="map-container" ref="mapcontainer">
        <GoogleMap
        bootstrapURLKeys={{
            key: API_KEY,
            language: 'en',
          }}
         options={createMapOptions}
         center={map.center}
         onChildClick={this._onChildClick}
         onChildMouseEnter={this._onChildMouseEnter}
         onChildMouseLeave={this._onChildMouseLeave}
         onBoundsChange={this.onBoundsChange}
        //  onGoogleApiLoaded={this.onGoogleApiLoaded}
         yesIWantToUseGoogleMapApiInternals
         defaultZoom={map.defaultZoom}>
           {this.drawSvg('mapcontainer')}
       </GoogleMap>
      </div>
    );
  }
}

Map = connect(mapStateToProps, actions)(Map);
export default Map;
