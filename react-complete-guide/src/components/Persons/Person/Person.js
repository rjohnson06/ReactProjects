import React from 'react';

import './Person.css';
import classes from './Person.css';

const Person = (props) => {
  return (
    <div className={classes.Person}>
      <p onClick={props.click}>I'm a {props.name} and I am {props.age} years young</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default Person;
