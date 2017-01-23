import React from 'react';
import { SecondaryButton } from './CoffeeButtons';
import { hashHistory } from 'react-router';
import { primaryColor } from '../styles/general';
class Error404 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const style = { width: '100%',
      height: '100%',
      backgroundColor: primaryColor.color,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    };

    return (
      <div style={ style }>
        <div style={{ width: '50%', textAlign: 'center', margin: 'auto' }}>
          <h2>Sorry This Page Doesn't Exists</h2>
          <SecondaryButton
            onClick={()=>hashHistory.push('/')}
            label="Go To Home"
          />
        </div>
      </div>
    );
  }
}

export default Error404;
