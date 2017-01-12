import React from 'react';
import Header from './Header.js';
import Authentication from './Authentication.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let loggedIn = false;
    if (!loggedIn) {
      return (
        <Authentication />
      );
    }

    return (
      <div className="coffeet">
        <Header/>
        { this.props.children }
      </div>
    );
  }
}

export default App;
