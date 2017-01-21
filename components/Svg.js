import React from 'react';
import Polyline from './Polyline';
import toPoints from '../utils/toPoints';
import { connect } from 'react-redux';
import * as actions from '../actions';
import dateformat from 'dateformat';
import { formatNumber } from '../utils/numbers';

const mapStateToProps = state => ({
  areaDetail: state.areaDetail,
});

class Svg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { coordinates, bounds, zoom, possibleColors } = this.props;
    const { coords, options } = coordinates;
    if (coords.length == 0)
        return null;

    let realOptions = options;

    const ptCorner = toPoints(bounds[0], bounds[1], zoom);

    const drawChildCoords = (coordsToDraw, index=-1) => {
      if (index > 0) {
        realOptions = { ...realOptions, fill: possibleColors[index - 1] };
      }

      if (index != -1) {
        return <Polyline
          coords={coordsToDraw.coords}
          ptCorner={ptCorner}
          zoom={zoom}
          id={coordsToDraw.id}
          key={coordsToDraw.id}
          options={realOptions} />;
      }

      var child = [];
      coords.map((coord, index) => child.push(drawChildCoords(coord, index)));

      return child;
    };

    const K_SIZE = 180;
    const markerStyle = {
      position: 'absolute',
      width: K_SIZE,
      height: 150,
      left: K_SIZE / 6,
      top: K_SIZE / 6,
      lineHeight: 1.7,
      background: '#fff',
      color: 'rgba(0, 0, 0, 0.870588)',
      textAlign: 'left',
      fontSize: 12,
      padding: 4,
      cursor: 'pointer',
      zIndex: '1000000',
    };
    const { areaDetail } = this.props;

    const Detail =
        <div style={markerStyle} className="hint__content">
          <h3>{ areaDetail.info.name} </h3>
          <div>
            Total Expenses:
            <b>
              $ {
                  areaDetail.info.totalExpenses
                  ? formatNumber(areaDetail.info.totalExpenses)
                  : 0
                }
            </b>
          </div>
          <div>Total Plants: <b> { areaDetail.info.totalPlants} </b></div>
          <div>Plantation Date: <b> {
              areaDetail.info.dateItWasPlanted
                ? dateformat(new Date(areaDetail.info.dateItWasPlanted * 1000), 'dd-mm-yyyy')
                : ''
            }
            </b>
          </div>
          <div>Last Fertilization: <b> {
              areaDetail.info.dateItWasPlanted
                ? dateformat(new Date(areaDetail.info.lastFertilized * 1000), 'dd-mm-yyyy')
                : ''
            }
            </b>
          </div>
          <div>Last Pest Control: <b> {
              areaDetail.info.dateItWasPlanted
                ? dateformat(new Date(areaDetail.info.lastPestControl * 1000), 'dd-mm-yyyy')
                : ''
            }
            </b>
          </div>
        </div>;

    return (
      <div>
        <svg
          height={this.props.height}
          width={this.props.width}
          onClick={this.props.hideAreaDetail}
        >
          {drawChildCoords(coords)}
        </svg>
        { areaDetail.show && Detail }
      </div>
    );
  }
}

Svg = connect(mapStateToProps, actions)(Svg);
export default Svg;
