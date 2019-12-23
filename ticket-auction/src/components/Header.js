import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
  const leftWelcomeMessage = () => {
    if (this.props.loggedIn) {
      return <p> Welcome {this.props.currentUserId}! </p>
    } else {
      return <p> Welcome! Please 
                <strong><Link to='/sign-in'> Sign in </Link></strong> or 
                <strong><Link to='/register'> Register </Link></strong> 
                to start selling! 
              </p>
    }  
  }

  const rightLinks = () => {
    if (this.props.loggedIn) {
      return (
        <section>
          <p> Start Selling  |  Seller Stats  |  My Untitled Account </p>
        </section>
      )
    } else {
      return (
        <section>
          <button> Sign In </button>
          <button> Register </button>
        </section>
      )
    }  
  }
    
    
    return (
      <header>
        {leftWelcomeMessage()}
        {rightLinks()}
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/sign-in'>Sign in</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/ticket/23'>Ticket</NavLink>
        <NavLink to='/myaccount/2'>My Account</NavLink>
      </header>
    )
  };
}

Header.propTypes = {
};

export default Header;
