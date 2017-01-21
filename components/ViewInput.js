import React from 'react';
import { primaryTextSize, primaryColor } from '../styles/general';

const ViewInput = props => {
  const styles = {
    base: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
    label: { ...primaryColor, ...primaryTextSize, fontWeight: '600' },
    content: { primaryTextSize, paddingBottom: '16px' },
  };
  return (
    <div style={ { ...styles.base, ...props.style } }>
      <div style={ { ...styles.label, ...props.labelStyle } }>
        { props.label }
      </div>
      <div style={ { ...styles.content, ...props.contentStyle } }>
        { props.content }
      </div>
    </div>
  );
};

export default ViewInput;
