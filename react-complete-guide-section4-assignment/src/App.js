import React, { Component } from 'react';
import './App.css';

import ValidationComponent from './ValidationComponent/ValidationComponent';
import Char from './Char/Char';

class App extends Component {
  state = {
    inputChars: []
  };

  inputChangedHandler = (event) => {
    this.setState({
      inputChars: event.target.value.split('')
    });
  };

  charClickedHandler = (index) => {
    const inputChars = this.state.inputChars.slice();
    inputChars.splice(index, 1);

    this.setState({
      inputChars: inputChars
    });
  };

  render() {
    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <br />
        <br />
        <input
          onChange={this.inputChangedHandler}
          value={this.state.inputChars.length > 0 ?
            this.state.inputChars.reduce((accum, currentValue) => accum + currentValue) :
            ''} />
        <br />
        <p>Length is: {this.state.inputChars.length}</p>
        <ValidationComponent inputLength={this.state.inputChars.length}/>

        {this.state.inputChars.map((char, index) => {
          return (<Char char={char} ind={index}, key={index} clickHandler={() => this.charClickedHandler(index)}/>);
        })}
      </div>
    );
  }
}

export default App;
