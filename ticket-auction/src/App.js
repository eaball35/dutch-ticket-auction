import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Header from './components/nav/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticket from './components/ticketListing/Ticket'
import NewTicket from './components/ticketListing/NewTicket';
import axios from 'axios';
import List from './components/main/List';
import { Button } from 'react-bootstrap';
import CategoryNav from './components/nav/CategoryNav';


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
      errors: "",
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
          <CategoryNav/>

          <Route path ='/' exact strict>
            <h1>Home</h1>
            <List field={"tickets"} cardType="ticket" />
          </Route>
          
          <Route path ='/tickets/:ticketnum' 
            exact strict 
            render={(props) => <Ticket ticket={exampleTicket} example={false} {...props} /> }
          />
          
          <Route path ='/new-ticket' exact strict>
            <NewTicket exampleTicket={exampleTicket} currentUserId = {this.state.currentUserId}/>
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

          <Route path ='/seller-stats/:sellerId' 
            exact strict
            component={Seller}
          />

          <Route path ='events/category/:type/:genre'
            exact strict
            render={(props) => <List 
              url = {`events/category/${props.match.params.type}/${props.match.params.genre}`} cardType="event"/> }
          />

          <Route path ='/checkout' exact strict>
            <h1>Checkout</h1>
          </Route>

          <Route path ='/events' exact strict>
            <h1>Events</h1>
            <List url='/events/all' cardType="event" />
          </Route>

          <Route path ='/sports' exact strict>
            <h1>Sports</h1>
            <List url="/categories/type/sports" cardType="category"/>
          </Route>

          <Route path ='/music' exact strict>
            <h1>Music</h1>
            <List url="/categories/type/music" cardType="category"/>
          </Route>

          <Route path ='/comedy' exact strict>
            <h1>Comedy</h1>
            <List url="/events/category/comedy" cardType="event"/>
          </Route>

          <Route path ='/cities' exact strict>
            <h1>By City</h1>
            <List url="categories/all" cardType="category"/>
          </Route>
        </div>    
      </Router>
    );
  }
}



const exampleTicket = {
  "id": "5e13d4444b1d7154bbd3ce22",
  "createdAt": "2020-01-07T00:43:48.672+0000",
  "updatedAt": "2020-01-07T00:43:48.672+0000",
  "status": "new",
  "user": {
    "id": "5e13d4444b1d7154bbd3ce15",
    "createdAt": "2020-01-07T00:43:47.729+0000",
    "updatedAt": "2020-01-07T00:43:47.729+0000",
    "providerId": null,
    "firstName": "Emily",
    "lastName": "Ball",
    "email": "eaball35@gmail.com",
    "address1": "141 Parfitt Way SW",
    "address2": "",
    "city": "Bainbridge Island",
    "state": "WA",
    "zipCode": "98110"
  },
  "event": {
    "id": "5e13d4444b1d7154bbd3ce1f",
    "createdAt": "2020-01-07T00:43:48.499+0000",
    "updatedAt": "2020-01-07T00:43:48.499+0000",
    "categories": [
      {
        "id": "5e13d4444b1d7154bbd3ce1b",
        "createdAt": "2020-01-07T00:43:48.331+0000",
        "updatedAt": "2020-01-07T00:43:48.331+0000",
        "type": "music",
        "genre": "pop"
      },
      {
        "id": "5e13d4444b1d7154bbd3ce1c",
        "createdAt": "2020-01-07T00:43:48.331+0000",
        "updatedAt": "2020-01-07T00:43:48.331+0000",
        "type": "music",
        "genre": "rnb"
      }
    ],
    "venue": {
      "id": "5e13d4444b1d7154bbd3ce1a",
      "createdAt": "2020-01-07T00:43:48.229+0000",
      "updatedAt": "2020-01-07T00:43:48.229+0000",
      "eventfulId": "ABCDE",
      "title": "Wrigley Field",
      "description": "Venue Description",
      "address1": "1060 W Addison St",
      "getAddress2": "",
      "city": "Chicago",
      "state": "IL",
      "zipCode": "60613",
      "venueDetails": "Venue Details"
    },
    "eventfulId": "ABCD",
    "title": "Beyonce Lemonade",
    "artist": "Beyonce",
    "description": "Event Description",
    "start": "2020-01-07T00:43:48.499+0000",
    "end": "2020-01-07T00:43:48.499+0000",
    "imageUrls": [
      "https://s3.amazonaws.com/factmag-images/wp-content/uploads/2016/04/02150058/beyonce-the-formation-tour-2-1500x1000.jpg"
    ],
    "allDay": false,
    "eventDetails": "Event Details"
  },
  "ticketQuantity": 4,
  "ticketGrouping": "general admission",
  "auctionStart": "2020-01-01T08:00:00.000+0000",
  "auctionEnd": "2020-01-10T08:00:00.000+0000",
  "startTotalPrice": 400.5,
  "endTotalPrice": 25.2,
  "auctionDetails": "Auction Details",
"overview": "Overview"
}

export default App;
