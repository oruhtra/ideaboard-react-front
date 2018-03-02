import React, { Component } from 'react'
import Cookies from 'universal-cookie';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  login = () => {
    const request = {"auth": {"email": this.state.email, "password": this.state.password}}
    fetch('http://localhost:3001/api/v1/user_token',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(
        request
      )
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const cookies = new Cookies();
      cookies.set("jwt", data.jwt, {path: "/"});
    })
  }
  render () {
    return (
      <div>
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.handleInput}
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInput}
          />
        </form>
        <br />
        <button
          onClick={this.login}
        >
            Login
        </button>
      </div>
    )
  }
}

export default LoginForm
