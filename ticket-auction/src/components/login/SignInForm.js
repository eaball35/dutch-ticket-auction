import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import SPRING_SECURITY from '../../config_keys.js'


const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      redirect: undefined,
    };
  }
  
  onInputChange = (event) => {
    const updatedState = {};
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;  
    this.setState(updatedState);
  }

  
  
  onSubmit = (event) => {
    event.preventDefault();
    this.updateCurrentUser();
  }
  
  render() {
    const { redirect } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="username"> username  </label>
          <input
            name="username"
            onChange={this.onInputChange}
            value={this.state.name}
          />
        </div>
        <div>
        <label htmlFor="email"> email  </label>
        <input
          name="email"
          onChange={this.onInputChange}
          value={this.state.email}
        />
      </div>
      <div>
        <input type="submit" value="Sign In"/>
      </div>
    </form>
    )
  }
}

export default SignInForm;
