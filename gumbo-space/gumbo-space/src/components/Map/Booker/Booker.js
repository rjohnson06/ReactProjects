import React from 'react';
import classes from './Booker.module.css';

const booker = (props) => {
  const backdrop = props.show ? <div className={classes.bookerBackdrop}></div> : null;
  const modal = props.show ? <div className={classes.booker}></div> : null;

  return (<div></div>);

};

export default booker;
