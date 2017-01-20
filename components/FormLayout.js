import React from 'react';
import IconButton from 'material-ui/IconButton';
import { icons, forms } from '../styles/general.js';
import Paper from 'material-ui/Paper';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

export const AddBudget = props => {
  const goBack = () => {
    hashHistory.goBack();
  };

  return (
    <div>
      <Paper style={forms} zDepth={1}>
        <AppBar
          title= {props.title}
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
        <div className="general--form__inputs">
          {props.children}
        </div>
      </Paper>
    </div>
  );
};

export default AddBudget;
