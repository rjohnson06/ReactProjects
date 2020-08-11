import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Person.css';
import Aux from '../../../hoc/Auxilliary';
import AuthContext from '../../../context/auth-context';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    //this.inputEl.focus();
    this.inputElRef.current.focus();
    console.log(this.context.authenticated);
  }

  render () {
    console.log("[Person.js] render");

    // return (
    //   <div className={classes.Person}>
    //     <p onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} years young</p>
    //     <p>{this.props.children}</p>
    //     <input type="text" onChange={this.props.changed} value={this.props.name} />
    //   </div>
    // );

    // adjacent element examples

    return (
      <Aux>
        { this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p> }
        <p key="0" onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} years young</p>
        <p key="1">{this.props.children}</p>
        <input
          key="2"
          //ref={ (inputEl) => { this.inputEl = inputEl; } }
          ref={this.inputElRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );

    // return (
    //   <Fragment>
    //     <p key="0" onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} years young</p>
    //     <p key="1">{this.props.children}</p>
    //     <input key="2" type="text" onChange={this.props.changed} value={this.props.name} />
    //   </Fragment>
    // );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);
