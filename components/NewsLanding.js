import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  routing: state.routing,
});

let NewsLanding = props => {
  return <div>Soy un Landing con id {props.params.id}</div>;
};

NewsLanding = connect(mapStateToProps, actions)(NewsLanding);
export default NewsLanding;
