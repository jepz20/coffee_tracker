import Paper from 'material-ui/Paper';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const InfoCard = props => {
  const { title }  = props;

  const style = {
    height: '150px',
    width: 'calc(100% - 40px)',
    margin: 20,
    display: 'inline-block',
  };

  return (
    <Paper style={style} zDepth={2}>
      <h2 className="graphs__title">{ title }</h2>
      <div className="graphs__issues--value">
        { props.children}
      </div>
    </Paper>
  );
};

export default InfoCard;
