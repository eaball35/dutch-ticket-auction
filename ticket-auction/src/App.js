import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticket from './components/Ticket'
import NewTicket from './components/NewTicket';

const exampleTicket = {
  createdAt: '3 days ago',
  updatedAt: 'December 26, 2019 04:18:00',
  userId: 1234,
  eventDetails: {
    artist: 'Cliche Artist',
    event: 'The Capstone Tour 2020',
    imgUrls: ['https://posterhouse.org/wp-content/uploads/2019/08/H0849-L71392902.jpg'],
    location: 'Hipster Ballroom',
    city: 'Seattle',
    state: 'WA',
    date: 'Mon - Jan 01, 2020',
    startTime: '8:00',
    endTime: null,
    details:'Event Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  ticketDetails: {
    quantity: 2,
    grouping: 'together',
    details: 'Ticket Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  auctionDetails: {
    start: {
      totalPrice: 259.99,
      date: 'Mon - Jan 01, 2020',
      time: '8:00'
    },
    end: {
      totalPrice: 17.99,
      date: 'Mon - Jan 05, 2020',
      time: '8:00'
    },
    overview: 'Auction Overview: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    details: 'Auction Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
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

  updateLoginUser = () => {
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
            logInCallback={this.updateLoginUser}
          />

        <Route path ='/' exact strict>
          <h1>Home</h1>
          <Link to='/ticket/123'>ticket123</Link>
        </Route>
        <Route path ='/ticket/:ticketnum' 
          exact strict 
          render={(props) => <Ticket ticket={exampleTicket} example={false}{...props} /> }
        />
        <Route path ='/new-ticket' exact strict>
          <NewTicket exampleTicket={exampleTicket}/>
        </Route>
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
        </div>
      </Router>
      
    );
}
}

export default App;
