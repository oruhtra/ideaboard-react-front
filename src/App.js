import React, { Component } from 'react';
import IdeasContainer from './components/ideas-container'
import LoginForm from './components/login-form'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Idea Board</h1>
        </header>
        <LoginForm />
        <IdeasContainer />
      </div>
    );
  }
}

export default App;
