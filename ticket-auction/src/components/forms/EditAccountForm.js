import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

class EditAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      adddress1: this.props.currentUser.address.adddress1,
      address2: this.props.currentUser.address.adddress2,
      city: this.props.currentUser.address.city.name,
      state: this.props.currentUser.address.city.state,
      zipcode: this.props.currentUser.address.zipcode,
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
    // do something
  }
  
  render() {
    const { redirect, currentUser } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }

    if (currentUser) {
    return (
      <section className="edit-account-form">
        <form onSubmit={this.onSubmit}>

          <div>
            <label htmlFor="firstName"> First Name: </label>
            <input
              name="firstName"
              onChange={this.onInputChange}
              value={this.state.firstName}
            />
          </div>

          <div>
            <label htmlFor="lastName"> Last Name: </label>
            <input
              name="lastName"
              onChange={this.onInputChange}
              value={this.state.lastName}
            />
          </div>

          <div>
            <label htmlFor="email"> Email: </label>
            <input
              name="email"
              onChange={this.onInputChange}
              value={this.state.email}
            />
          </div>

          <div>
            <label htmlFor="adddress1"> Adddress 1: </label>
            <input
              name="adddress1"
              onChange={this.onInputChange}
              value={this.state.adddress1}
            />
          </div>

          <div>
            <label htmlFor="city"> City: </label>
            <input
              name="city"
              onChange={this.onInputChange}
              value={this.state.city}
            />
          </div>

          <div>
            <label htmlFor="state"> State: </label>
            <input
              name="state"
              onChange={this.onInputChange}
              value={this.state.state}
            />
          </div>

          <div>
            <label htmlFor="zipCode"> Zip Code: </label>
            <input
              name="zipCode"
              onChange={this.onInputChange}
              value={this.state.zipCode}
            />
          </div>
        
          <div>
            <input type="submit" value="Submit Updates"/>
          </div>
        </form>
      </section>
    )
  } else {
    return ""
  }
}
}

export default EditAccountForm;
