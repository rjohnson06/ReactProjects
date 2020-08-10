import React from 'react';

import './Char.css';

const Char = (props) => {
  return (
    <div onClick={props.clickHandler} className="Char">Char: {props.char}</div>
  );
};

export default Char;
