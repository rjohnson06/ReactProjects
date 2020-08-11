import React, { Component } from 'react';
import classes from './App.css';
import Persons from './../components/Persons/Persons';
import Cockpit from './../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);

    console.log("[App.js] constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps " + props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMout");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("App.js shouldComponentUpdate");

    return true;
  }

  componentDidUpdate() {
    console.log("App.js componentDidUpdate");
  }

  state = {
    persons: [
      { id:"ogvbqerv", name: 'Max', age: 30 },
      { id:"[r4vp]", name: 'Manu', age: 29 },
      { id:"von4gb", name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
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


    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = (ind) => {
    // const newPersons = this.state.persons.slice();
    const newPersons = [...this.state.persons];
    newPersons.splice(ind, 1);

    this.setState({
      persons: newPersons
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({
      authenticated: true
    });
  };

  render() {
    console.log("[App.js] render");

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        isAuthenticated={this.state.authenticated}
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
      />;
    }

    // return (
    //   <div className={classes.App}>
    //     <button onClick={() => {this.setState({ showCockpit: false })}}>Remove Cockpit</button>
    //     {this.state.showCockpit ?
    //       <Cockpit
    //         title={this.props.appTitle}
    //         showPersons={this.state.showPersons}
    //         personsLength={this.state.persons.length}
    //         clicked={this.togglePersonsHandler} /> :
    //       null}
    //     {persons}
    //   </div>
    // );

    return (
      <Aux>
        <button onClick={() => {this.setState({ showCockpit: false })}}>Remove Cockpit</button>
        <AuthContext.Provider value={{ authenticated: this.state.authenticated, login: this.loginHandler }} >
          {this.state.showCockpit ?
            <Cockpit
              logIn={this.loginHandler}
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler} /> :
            null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
