import React, { Component } from 'react';
import './App.css';
import UserInput from './UserIO/UserInput';
import UserOutput from './UserIO/UserOutput';

class App extends Component {
  state = {
    username: "appUserName"
  };

  changeUsernameHandler = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <UserOutput userName={this.state.username} text2="1 second paragraph" />
        <UserOutput userName={this.state.username} text2="2 second paragraph" />
        <UserInput onChange={this.changeUsernameHandler} username={this.state.username} />
      </div>
    );
  }
}

export default App;
