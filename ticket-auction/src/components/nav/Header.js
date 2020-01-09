import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Search from './SearchBar'
import '../../css/Header.css'

class Header extends Component {
  render() {
    const leftWelcomeMessage = () => {
      if (this.props.loggedIn) {
        return <p> Welcome {this.props.currentUser.username}! </p>
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
          <section className="top-header">
            <strong>
              <Link to='/new-ticket'> Start Selling</Link>  |  
              <Link to='/seller-stats/2'> Seller Stats</Link>  |  
              <Link to={`/myaccount/${this.props.currentUser.id}`}>  
              My Untitled Account </Link>

            </strong>
            <Link 
              to='/' 
              onClick={this.props.logInCallback} 
              className="btn btn-secondary sign-out-btn"> Sign Out 
            </Link>
          </section>
        )
      } else {
        return (
          <section className='guest-right-links'>
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
        <section className='d-flex justify-content-between top-header'>
          <div className='left-welcome'>{leftWelcomeMessage()}</div>
          <div className='right-links'>{rightLinks()}</div>
        </section>
        
        <section className='d-flex justify-content-center align-items-center'>
          <h1> 
            <NavLink to='/'> 
              <img src="https://www.tryimg.com/u/2020/01/09/TicketClockLogo-01.png" alt="ticketime logo" className="nav-logo"></img>
            </NavLink> </h1>
          <Search></Search>
        </section>
      </section>
    )
  };
}

export default Header;
