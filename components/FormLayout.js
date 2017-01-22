import React from 'react';
import IconButton from 'material-ui/IconButton';
import { icons, forms } from '../styles/general.js';
import Paper from 'material-ui/Paper';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { primaryTextSize } from '../styles/general';

export const FormLayout = props => {
  const goBack = () => {
    console.log(hashHistory);
    hashHistory.goBack();
  };

  return (
    <div>
      <Paper style={forms} zDepth={1}>
        <AppBar
          title= {props.title}
          titleStyle={ { ...primaryTextSize, fontWeight: '800' } }
          zDepth={ 0 }
          style={ { height: '50px', zIndex: '0', marginBottom: '15px' } }
          onLeftIconButtonTouchTap = { goBack }
          iconElementLeft={
            <IconButton
              iconStyle={ icons.white }
              iconClassName='fa fa-chevron-left'
              aria-label="Go back"
            />
          }
        />
        {props.children}
      </Paper>
    </div>
  );
};

export default FormLayout;
