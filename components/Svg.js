import React from 'react';
import Polyline from './Polyline';
import toPoints from '../utils/toPoints';
import { connect } from 'react-redux';
import * as actions from '../actions';
import dateformat from 'dateformat';
import { formatNumber } from '../utils/numbers';

const mapStateToProps = state => ({
  areaDetail: state.areaDetail,
  eventTypes: state.eventTypes,
});

class Svg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { coordinates, bounds, zoom, possibleColors, eventTypes } = this.props;
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
    const { info } = this.props.areaDetail;

    const Detail =
        <div style={markerStyle} className="hint__content">
          <h3>{ info.name} </h3>
          <div>
            Total Expenses:
            <b>
               {  ' $' + (
                  info.totalExpenses
                  ? formatNumber(info.totalExpenses)
                  : 0
                )
                }
            </b>
          </div>
          <div>Total Plants: <b> { info.totalPlants} </b></div>
          <div>Plantation Date: <b> {
              info.dateItWasPlanted
                ? dateformat(new Date(info.dateItWasPlanted * 1000), 'dd-mm-yyyy')
                : ''
            }
            </b>
          </div>
            { info.lastEventAdded
              && eventTypes[info.lastEventAdded.eventsType]
              &&
              <div>
                Last Event Added:
                <div style={{ marginLeft: '16px' }}>
                  <div>Type:
                    <b>
                      { ' ' + eventTypes[info.lastEventAdded.eventsType].name}
                    </b>
                  </div>
                  <div>Date:
                    <b>
                      {
                        ' ' +
                        dateformat(
                          new Date(info.lastEventAdded.eventsExecutionDate * 1000),
                          'dd-mm-yyyy'
                        )
                      }
                    </b>
                  </div>
                </div>
              </div>
            }
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
        { this.props.areaDetail.show && Detail }
      </div>
    );
  }
}

Svg = connect(mapStateToProps, actions)(Svg);
export default Svg;
