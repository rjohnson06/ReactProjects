import React, { Component } from 'react';
import classes from './App.css';
import Persons from './../components/Persons/Persons';
import Cockpit from './../components/Cockpit/Cockpit';

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

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler} 
        changed={this.nameChangedHandler} />
      );
    }

    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
