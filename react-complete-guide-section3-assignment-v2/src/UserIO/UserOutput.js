import React from 'react';

import './UserOutput.css'

const UserOutput = (props) => {
  return (
    <div className="userOuput">
      <p>Username: {props.userName}</p>
      <p>{props.text2}</p>
    </div>
  );
};

export default UserOutput;
