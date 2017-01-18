import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Polyline from './Polyline';
import toPoints from '../utils/toPoints';
import uuid from 'uuid';

const mapStateToProps = state => ({
  areaDetail: state.areaDetail,
});

class Svg extends React.Component {
  render() {
    const { coordinates, bounds, zoom, possibleColors } = this.props;
    const { coords, options } = coordinates;
    if (coords.length == 0)
        return null;

    let realOptions = options;

    const ptCorner = toPoints(bounds[0], bounds[1], zoom);

    const drawChildCoords = (coords, index=0) => {
      if (index !== 0) {
        realOptions = { ...realOptions, fill: possibleColors[index - 1] };
      }

      if (coords[0].hasOwnProperty('lat') && coords[0].hasOwnProperty('lng')) {
        return <Polyline
          coords={coords}
          ptCorner={ptCorner}
          zoom={zoom}
          key={uuid.v4()}
          options={realOptions} />;
      }

      var child = [];
      coords.map((coord, index) => child.push(drawChildCoords(coord, index)));

      return child;
    };

    const K_SIZE = 80;
    const markerStyle = {
      position: 'absolute',
      width: K_SIZE,
      height: K_SIZE,
      left: K_SIZE / 2,
      top: K_SIZE / 2,
      lineHeight: 1.7,
      backgroundColor: 'yellow',
      textAlign: 'center',
      fontSize: 12,
      padding: 4,
      cursor: 'pointer',
    };
    return (
      <div>
        <svg
          height={this.props.height}
          width={this.props.width}
        >
          {drawChildCoords(coords)}
        </svg>
        <div style= { markerStyle } className="hint__content">Hola</div>
      </div>
    );
  }
}

Svg = connect(mapStateToProps, actions)(Svg);
export default Svg;
