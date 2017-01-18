import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMap from 'google-map-react';
import Loader from '../components/Loader';
import Svg from './Svg';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => ({
  map: state.map,
});

const API_KEY = 'AIzaSyCTCKi7arfd9BrRlCvZBVmnjPn9NoyHg_8';
class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = { googleApiLoaded: false };
    this.drawSvg = this.drawSvg.bind(this);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    this.onBoundsChange = this.onBoundsChange.bind(this);
  }

  componentDidMount() {
    const { fetchMapDetailById, params } = this.props;

    fetchMapDetailById(params.id);
  }

  onBoundsChange(center, zoom, bounds, marginBounds) {
    const { boundsChanged } = this.props;
    boundsChanged(center, zoom, bounds);
  };

  drawSvg(ref) {
    const { bounds } = this.props.map;
    if (!this.state.googleApiLoaded || bounds.length == 0)
      return null;
    else {
      const { mapcontainer } = this.refs;
      const { map } = this.props;

      return (
        <Svg
          lat={ bounds[0] }
          lng={ bounds[1] }
          coordinates={ { ...map.coordinates, options: map.options } }
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

    const bounds = new maps.LatLngBounds();

    const extendBounds = (lat, lng) => {
      const latLng = new maps.LatLng(lat, lng);
      bounds.extend(latLng);
    };

    const extendCoordsBounds = coords => {
      coords.forEach(coord => {
        if (coord.hasOwnProperty('lat') && coord.hasOwnProperty('lng')) {
          extendBounds(coord.lat, coord.lng);
        } else if (Array.isArray(coord)) {
          extendCoordsBounds(coord);
        }
      });
    };

    const allCoords = this.props.map.coordinates.coords.map(coord => coord.coords);
    extendCoordsBounds(allCoords);

    map.fitBounds(bounds);
  }

  render() {
    const { map } = this.props;

    if (!map.loaded) {
      return <Loader />;
    };

    if (!map.hasData) {
      hashHistory.push('/404');
      return null;
    }

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
         defaultCenter={map.defaultCenter}
         onBoundsChange={this.onBoundsChange}
         onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
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
