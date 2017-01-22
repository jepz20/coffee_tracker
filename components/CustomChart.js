import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Line, Bar, Pie } from 'react-chartjs';
import Loader from './Loader';

const possibleColors = [
  {
    color: '#F7464A',
    highlight: '#FF5A5E',
  }, {
    color: '#46BFBD',
    highlight: '#5AD3D1',
  }, {
    color: '#FDB45C',
    highlight: '#FFC870',
  }, {
    color: '#949FB1',
    highlight: '#A8B3C5',
  }, {
    color: '#4D5360',
    highlight: '#616774',
  },
];

const CustomChart = props => {
  const options =  {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
        },
      ],
    },
  };
  const customStyle = {
    fillColor: 'rgba(108, 200, 193,0.7)',

    pointColor: 'rgba(93, 64, 55,1)',
    pointStrokeColor: '#fff',
  };

  let chart;
  const { data, chartType, title, loading }  = props;

  if (!data) {
    chart =  <div>No Data</div>;
  };

  let type = chartType ? chartType : 'bar';
  if (type == 'pie') {
    data.forEach((item, index) => item = (item = Object.assign(item, possibleColors[index])));
  } else {
    data.datasets.forEach(item => item = (item = Object.assign(item, customStyle)));
  }

  if (loading === 0) {
    chart = <Loader />;
  } else {
    switch (type) {
      case 'line':
        chart = <Line data={data} options={options}/>;
        break;
      case 'bar':
        chart = <Bar data={data} options={options}/>;
        break;
      case 'pie':
        chart = <Pie data={data} options={options}/>;
        break;
      default:
        chart = <Bar data={data} options={options}/>;
        break;
    }
  };

  return (
    <div>
      <h4 className="graphs__title">{ title }</h4>
      { chart }
    </div>
  );
};

export default CustomChart;
