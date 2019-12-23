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
                <strong><Link to='/sign-in' onClick={this.props.logInCallback}> Sign in </Link></strong> or 
                <strong><Link to='/register'> Register </Link></strong> 
                to start selling! 
              </p>
    }  
  }

  const rightLinks = () => {
    if (this.props.loggedIn) {
      return (
        <section>
          <Link to='/new-ticket/2'> Start Selling</Link>  |  
          <Link to='/seller-stats/2'> Seller Stats</Link>  |  
          <Link to='/myaccount/2'>  My Untitled Account </Link>
          <button onClick={this.props.logInCallback}> Sign Out </button>
        </section>
      )
    } else {
      return (
        <section>
          <button onClick={this.props.logInCallback}> Sign In </button>
          <button> <Link to='/register'> Register </Link> </button>
        </section>
      )
    }  
  }
    return (
      <section>
        <section className='nav-header'>
          <div className='left-welcome'>{leftWelcomeMessage()}</div>
          <div className='right-links'>{rightLinks()}</div>
        </section>

        <NavLink to='/'> Untitle Capstone </NavLink>
        {/* <NavLink to='/ticket/23'> Ticket </NavLink> */}
      </section>
    )
  };
}

Header.propTypes = {
};

export default Header;
