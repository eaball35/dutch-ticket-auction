import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Search from './SearchBar'
import '../../css/Header.css'

class Header extends Component {
  render() {
    const leftWelcomeMessage = () => {
      if (this.props.loggedIn) {
        return <p className="welcome-message"> Welcome {this.props.currentUser.username}! </p>
      } else {
        return <p className="welcome-message"> Welcome! Please 
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
              <Link to='/new-ticket' className='login-links'> Start Selling</Link>  |  
              <Link to='/seller-stats/2' className='login-links'> Seller Stats</Link>  |  
              <Link to={`/myaccount/${this.props.currentUser.id}`} className='login-links'>  
              My TicketTime Account </Link>

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
        
        <section className='header-middle-sect d-flex justify-content-center align-items-center'>
          <h1> 
            <NavLink to='/'> 
              <img src="https://www.tryimg.com/u/2020/01/10/TicketClockLogo-01-01c77c1710841bf592.png" alt="ticketime logo" className="nav-logo"></img>
            </NavLink> </h1>
          <Search></Search>
        </section>
      </section>
    )
  };
}

export default Header;
