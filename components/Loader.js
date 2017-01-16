import { ThreeBounce } from 'better-react-spinkit';
import { loaderStyle } from '../styles/loader';
import React from 'react';

const Loader = props => {
  const { size } = props;
  let realSize = size ? size : 15;
  return (
    <div style={ loaderStyle }>
      <ThreeBounce size={ realSize } color='#6CC8C1'/>
    </div>
  );
};

export default Loader;
