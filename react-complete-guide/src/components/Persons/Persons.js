import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("Persons.js getDerivedStateFromProps");
  //   return state;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("Persons.js shouldComponentUpdate");
  //
  //   if (nextProps.persons !== this.props.persons) {
  //     return true;
  //   }
  //
  //   return false;
  // }

  // capture something that will be destroyed, like the scroll position in some UI
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("Perons.js getSnapshotBeforeUpdate");
    return { message: "snapshot" };
  }

  // re-apply state that you captured in getSnapshotBeforeUpdate, like the scroll position
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Persons.js componentDidUpdate " + snapshot.message);
  }

  componentWillUnmount() {
    console.log("Persons.js componentWillUnmount");
  }

  render () {
    console.log("[Persons.js] render");

    return this.props.persons.map((person, ind) => {
      return (
        <Person
          name={person.name}
          age={person.age}
          key={person.id}
          click={() => this.props.clicked(ind)}
          changed={(event) => this.props.changed(event, person.id)}
          isAuth={this.props.isAuthenticated}
        />
      );
    });
  }
};

export default Persons;
