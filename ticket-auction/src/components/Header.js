import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Search from './Search'
import './Header.css'

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
            <Link 
              to='/' 
              onClick={this.props.logInCallback} 
              className="btn btn-secondary"> Sign Out 
            </Link>
          </section>
        )
      } else {
        return (
          <section>
            <Link 
              to='/sign-in' 
              onClick={this.props.logInCallback} 
              className='btn btn-secondary sign-in-btn'> Sign In 
            </Link>
            <Link 
              to='/register' 
              className='btn btn-secondary register-btn'> Register 
            </Link>
          </section>
        )
      }  
    }

    return (
      <section >
        <section className='d-flex justify-content-between'>
          <div className='left-welcome'>{leftWelcomeMessage()}</div>
          <div className='right-links'>{rightLinks()}</div>
        </section>
        
        <section className='d-flex justify-content-center align-items-center'>
          <h1 className='nav-logo-text'> <NavLink to='/'> Untitled Capstone </NavLink> </h1>
          <Search></Search>
        </section>
      </section>
    )
  };
}

Header.propTypes = {
};

export default Header;
