import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticket from './components/Ticket'
import NewTicket from './components/NewTicket';
import axios from 'axios';
import TicketList from './components/TicketList';

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
      tickets: undefined,
      errors: "",
    };
  }

  componentDidMount = () => {
    this.fetchTickets();
  }

  fetchTickets() {
    axios.get('http://localhost:8080/tickets/all')
      .then((response) => {
        this.setState({tickets: response.data})
      })
      .catch((error) => {
        this.setState({tickets: error})
      });
  }

  updateLoginUser = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  exampleTicket = {
    id: 12345,
    createdAt: '2020-01-02T19:59:44.570+0000',
    userId: 123,
    artist: "Example Artist",
    event: "Example Event",
    eventImgUrls: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    eventLocation: "Fun Concert Hall",
    eventCity: "Chicago",
    eventState: "IL",
    eventStart: '2020-01-02T19:59:44.570+0000',
    eventEnd: '2020-01-02T19:59:44.570+0000',
    eventDetails: "Event Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ticketQuantity: 2,
    ticketGrouping: "together",
    ticketDetails: "Ticket Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    auctionStartTotalPrice: 250.99,
    auctionStart: '2020-01-02T19:59:44.570+0000',
    auctionEndTotalPrice: 5.29,
    auctionEnd: '2020-01-02T19:59:44.570+0000',
    auctionOverview: "Ticket Overview: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    auctionDetails: "Auction Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
          <Link to='/tickets/1'>Ticket1</Link>
          <Link to='/tickets/2'>Ticket2</Link>
          <Link to='/tickets/3'>Ticket3</Link>
          {console.log(this.state.tickets)}
          <TicketList tickets={this.state.tickets}/>
        </Route>
        <Route path ='/tickets/:ticketnum' 
          exact strict 
          render={(props) => <Ticket ticket={this.exampleTicket} example={false}{...props} /> }
        />
        <Route path ='/new-ticket' exact strict>
          <NewTicket exampleTicket={this.exampleTicket}/>
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
