import React from 'react';

import "./UserInput.css"

const UserInput = (props) => {
  return (
    <input className="userInput" onChange={props.onChange} type="text" value={props.username} />
  );
};

export default UserInput;
