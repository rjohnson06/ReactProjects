import React from 'react';
import classes from './Booker.module.css';

import Aux from '../../../hox/Auxilliary';

const booker = (props) => {
  const backdrop = props.show ? <div className={classes.bookerBackdrop}></div> : null;
  const modal = props.show ? <div className={classes.booker}></div> : null;

  return (
    <Aux>
      {modal}
      {backdrop}
    </Aux>
  );
};

export default booker;
