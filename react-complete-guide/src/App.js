import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, ind) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(ind)}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
