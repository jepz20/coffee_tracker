import React from 'react';
import toPoints from '../utils/toPoints';
import uuid from 'uuid';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = state => ({
  map: state.map,
});

class Polyline extends React.Component {
  constructor(props) {
    super(props);
    this.showHint = this.showHint.bind(this);
    this.hideHint = this.hideHint.bind(this);
  }

  showHint(e) {
    const { setActionDetail, map } = this.props;
    const actionDetail = map.coordinates.coords.filter(coord => coord.id == e.target.id)[0];
    setActionDetail({ ...actionDetail.info });
    e.stopPropagation();
  }

  hideHint(e) {
    const { hideAreaDetail } = this.props;
    hideAreaDetail();
  }

  render() {
    const { ptCorner, bounds, zoom, coords, id, options } = this.props;
    const ptCornerPoli = ptCorner
      || toPoints(bounds[0], bounds[1], zoom);
    const points = [];
    for (var i = 0; i < coords.length; i++) {
      const ptScreen = toPoints(coords[i].lat,
        coords[i].lng,
        zoom);
      const point = {
        x: ptScreen.x - ptCornerPoli.x,
        y: ptScreen.y - ptCornerPoli.y,
      };
      points.push(point.x + ',' + point.y);
    };

    return (
        <polyline
          points={ points.join(' ') }
          id={ id }
          onMouseEnter = { this.showHint }
          onMouseLeave = { this.hideHint }
          onClick = {this.showHint}
          { ...options }

        />
    );
  }
}

Polyline = connect(mapStateToProps, actions)(Polyline);
export default Polyline;
