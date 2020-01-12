import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
    };
  }
  


  render() {  
    if (this.props.currentUser) {
      
      const { redirect } = this.state;
      if (redirect !== undefined) {
        return <Redirect to={redirect}/>;
      }
      return (
        <section>
          <ul>
            <li>
              <Link to={`/myaccount/edit/${this.props.currentUser}`}>Edit Account Settings</Link>
            </li>
            <li>
              <Link to={`/myaccount/delete/${this.props.currentUser}`}>Delete Account</Link>
            </li>
          </ul>
        </section>
      )
    } 
    return("");
  }
}

export default MyAccount;