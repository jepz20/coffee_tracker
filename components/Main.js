import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
  routing: state.routing,
});

class MainSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <main>
          { this.props.children}
        </main>
    );
  }
}

MainSection = connect(mapStateToProps, actions)(MainSection);

export default MainSection;
