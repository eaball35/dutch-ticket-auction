import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import SPRING_SECURITY from '../../config_spring_keys.js'
import '../../css/SignInForm.css'


const base_url = `${SPRING_SECURITY.base_url}`
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
            <label htmlFor="username"> Username:  </label>
            <input
              name="username"
              onChange={this.onInputChange}
              value={this.state.name}
              className="login-input"
              placeholder="user123"
            />
          </div>
          <div>
          <label htmlFor="email"> Email:  </label>
          <input
            name="email"
            onChange={this.onInputChange}
            value={this.state.email}
            className="login-input"
            placeholder="user123@mail.com"
          />
        </div>
        <div className="login-submit-btn">
          <input type="submit" value="Register" className="btn btn-primary"/>
        </div>
      </form>
    </section>
    )
  }
}

export default RegisterForm;
