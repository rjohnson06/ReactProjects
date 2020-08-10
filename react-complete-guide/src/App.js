import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id:"ogvbqerv", name: 'Max', age: 28 },
      { id:"[r4vp]", name: 'Manu', age: 29 },
      { id:"von4gb", name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const changeInd = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

   const person = {
     ...this.state.persons[changeInd],
     name: "ChangedName"
   }

   person.name = event.target.value;

   const persons = [...this.state.persons];
   persons[changeInd] = person;

    this.setState({
      persons: persons
    });
  };

  deletePersonHandler = (ind) => {
    // const newPersons = this.state.persons.slice();
    const newPersons = [...this.state.persons];
    newPersons.splice(ind, 1);

    this.setState(
      {
        persons: newPersons
      }
    );
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, ind) => {
            return (
              <ErrorBoundary key={person.id}>
                <Person
                  name={person.name}
                  age={person.age}
                  click={() => this.deletePersonHandler(ind)}
                  changed={(event) => this.nameChangedHandler(event, person.id)} />
              </ ErrorBoundary>
            );
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(" ")}>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Switch Name
        </button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
