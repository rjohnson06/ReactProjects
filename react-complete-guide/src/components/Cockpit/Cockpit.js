import React, { useEffect, useRef, useContext } from 'react';

import AuthContext from '../../context/auth-context';

import classes from './Cockpit.css';

const cockpit = (props) => {
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log("Cockpit.js useEffect");
    // send Http request
    // const timeout = setTimeout(() => {
    //   //alert("saved data to cloud");
    // }, 1000);

    toggleButtonRef.current.click();

    // because we provided a 2nd argument to the useeffect function, this cleanup function will only run when the component is destroyed
    return () => {
      //clearTimeout(timeout);
      console.log("Cockpit.js cleanup work");
    };
  }, []);

  useEffect(() => {
    console.log("Cockpit.js useEffect 2");

    // null 2nd argument to useEffect causes this cleanup function to run every time cockpit is about to re-render
    return () => {
      console.log("Cockpit.js cleanup work 2nd useEffect");
    };
  });

  let btnClass = '';

  if (props.showPersons) {
    btnClass = classes.Red;
  }

  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }

  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button
        ref={toggleButtonRef}
        className={btnClass}
        onClick={props.clicked}>Toggle Persons
      </button>
      <button onClick={authContext.login}>Log in</button> 
    </div>
  );
};

export default React.memo(cockpit);
