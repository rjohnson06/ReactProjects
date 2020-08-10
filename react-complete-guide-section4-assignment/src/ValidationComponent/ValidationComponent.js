import React from 'react';

import './ValidationComponent.css';

const ValidationComponent = (props) => {
  const output = props.inputLength >= 5 ?
    "Text is long enough" :
    "Text too short";

  return (
    <p>{output}</p>
  );
};

export default ValidationComponent;
