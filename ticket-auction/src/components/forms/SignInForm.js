import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import SPRING_SECURITY from '../../config_spring_keys.js'
import '../../css/SignInForm.css'


const base_url = `${SPRING_SECURITY.base_url}`
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      redirect: undefined,
      currentUser: undefined
    };
  }
  
  onInputChange = (event) => {
    const updatedState = {};
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;  
    this.setState(updatedState);
  }

  fetchUserByEmail = (email) => {
    const url = `${base_url}/users/email/${email}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    
    axios.get( url, headers).then((response) => {
        this.setState({currentUser: response.data})
      })
      .catch((error) => {
        this.setState({error})
      });
  }
  
  
  onSubmit = (event) => {
    event.preventDefault();
    this.fetchUserByEmail(this.state.email)
  }
  
  render() {
    const { redirect,currentUser  } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }

    if (currentUser !== undefined) {
      this.props.updateCurrentUser(currentUser);
      if (!this.props.redirect) {
        this.setState({redirect: `/myaccount/${currentUser.id}`})
      } else {
        this.setState({redirect: this.props.redirect})
      }
    }

    return (
      <section className="login-form">
        <form onSubmit={this.onSubmit}>

          <div>
          <label htmlFor="email"> Email:  </label>
          <input
            name="email"
            onChange={this.onInputChange}
            value={this.state.email}
            placeholder="user123@mail.com"
            className="login-input"
          />
        </div>
        <div className="login-submit-btn">
          <input type="submit" value="Sign In" className="btn btn-primary"/>
        </div>
      </form>
    </section>
    )
  }
}

export default SignInForm;
