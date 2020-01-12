import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import SPRING_SECURITY from '../../config_spring_keys.js'


const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class RegisterForm extends Component {
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

  
  registerNewUser = () => {
    const url = `${base_url}/users`
    
    const data = {
      "username": this.state.username,
      "email": this.state.email,
    }
  
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    } 

    axios.post(url, data, headers)
      .then((response) => {
        this.props.updateCurrentUser(response.data)
        this.setState({
          username: "",
          email: "",
          redirect: `/myaccount/${response.data.id}`
        })
      })
      .catch((error) => {
        console.log(error.response);
      });
    }
  
  
  onSubmit = (event) => {
    event.preventDefault();
    this.registerNewUser();
  }
  
  render() {
    const { redirect } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }

    return (
      <section className="login-form">
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
          <input type="submit" value="Register"/>
        </div>
      </form>
    </section>
    )
  }
}

export default RegisterForm;
