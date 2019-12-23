import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Header from './components/Header'

const Ticket = ({match}) => {
  return (<h1>Ticket {match.params.ticketnum}</h1>)
}

const User = ({match}) => {
  return (<h1>User {match.params.userId}</h1>)
}

const Seller = ({match}) => {
  return (<h1>Seller {match.params.sellerId}</h1>)
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      currentUserId: 0,
    };
  }

  logInUser = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header 
            loggedIn={this.state.loggedIn}
            currentUserId={this.state.currentUserId}
            logInCallback={this.logInUser}
          />
        </div>

        <Route path ='/' exact strict>
          <h1>Home</h1>
        </Route>
        <Route path ='/ticket/:ticketnum' 
          exact strict 
          component={Ticket}
        />
        <Route path ='/sign-in' exact strict>
          <h1>Sign In</h1>
        </Route>

        <Route path ='/register' exact strict>
          <h1>Register</h1>
        </Route>
        <Route 
          path ='/myaccount/:userId' 
          exact strict
          component={User}
        />
        <Route path ='/new-ticket/:sellerId' 
          exact strict
          component={Seller}
        />
        <Route path ='/seller-stats/:sellerId' 
          exact strict
          component={Seller}
        />
      </Router>
    );
}
}

export default App;
