import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Header from './components/nav/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticket from './components/ticketListing/Ticket'
import Event from './components/events/Event'
import NewTicket from './components/ticketListing/NewTicket';
import axios from 'axios';
import List from './components/main/List';
import { Button } from 'react-bootstrap';
import CategoryNav from './components/nav/CategoryNav';
import RegisterForm from './components/login/RegisterForm.js';

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
      currentUser: undefined,
    };
  }

  updateLoginUser = (user = 123) => {
    if(this.state.loggedIn) {
      this.setState({
        loggedIn: false,
        currentUserId: undefined
      })
    } else {
      this.setState({
        loggedIn: true,
        currentUser: user
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <section className="app-header">
            <Header 
              loggedIn={this.state.loggedIn}
              currentUser={this.state.currentUser}
              logInCallback={this.updateLoginUser}
            />
            <CategoryNav/>
          </section>
          
  {/* Login/Login Pages */}
          <Route path ='/sign-in' exact strict>
            <header>
              <h1>Sign In</h1>
            </header>
          </Route>
          
          <Route path ='/register' exact strict>
            <header>
              <h1>Register</h1>
              <RegisterForm updateCurrentUser={this.updateLoginUser}></RegisterForm>
            </header>
          </Route>
          
  {/* User/Account Pages */}
          <Route path ='/myaccount/:userId' 
            exact strict 
            render = { (props) => 
              <section >
                {
                  (this.state.currentUser)
                    ? <h1>{this.state.currentUser.username}'s account</h1>
                    : <h2>Sorry, you can't access this page</h2>
                }
              </section>
            }
          />
          
          <Route path ='/new-ticket/:sellerId' 
            exact strict
            component={Seller}
          />
          
          <Route path ='/seller-stats/:sellerId' 
            exact strict
            component={Seller}
          />

  {/* Checkout Pages */}
          <Route path ='/checkout' exact strict>
            <header>
              <h1>Checkout</h1>
            </header>
          </Route>

  {/* Create Pages */}
          <Route path ='/new-ticket' exact strict>
            <NewTicket exampleTicket={exampleTicket} currentUserId = {this.state.currentUserId}/>
          </Route>

  {/* Nav Link Pages */}
          <Route path ='/' exact strict>
            <header>
              <h1>Home</h1>
            </header>
            <List url="/tickets/all" cardType="ticket" />
          </Route>

          <Route path ='/events' exact strict>
            <header>
              <h1>Events</h1>
            </header>
            <List url='/events/all' cardType="event" />
          </Route>

          <Route path ='/performers' exact strict>
            <header>
              <h1>Performers</h1>
            </header>
            <List url='/performers/all' cardType="performer" />
          </Route>

          <Route path ='/sports' exact strict>
            <header>
              <h1>Sports</h1>
            </header>
            <List url="/categories/type/sports" cardType="category"/>
          </Route>

          <Route path ='/music' exact strict>
            <header>
              <h1>Music</h1>
            </header>
            <List url="/categories/type/music" cardType="category"/>
          </Route>

          <Route path ='/comedy' exact strict>
            <header>
              <h1>Comedy</h1>
            </header>
            <List url="/events/category/comedy" cardType="event"/>
          </Route>

          <Route path ='/cities' exact strict>
            <header>
              <h1>By City</h1>
            </header>
            <List url="/cities/all" cardType="city"/>
          </Route>
        
  {/* Nested Pages */}
          <Route path ='/tickets/:id' 
            exact strict 
            render = {
              (props) => 
              <section >
                <Ticket example={false} {...props} /> 
              </section>
            }
          />

          <Route path ='/events/:id' 
            exact strict 
            render={
              (props) => <Event {...props} /> 
            }
          />

        <Route path ='/events/category/:type'
            exact strict
            render={
              (props) => 
                <section>
                  <List url = {`/events/category/${props.match.params.type}`} cardType="event"  {...props}/> 
                </section>
            }
          />
          
          
          <Route path ='/events/category/:type/:genre'
            exact strict
            render={
              (props) => 
              <section>
                <List url = {`/events/category/${props.match.params.type}/${props.match.params.genre}`} cardType="event" {...props}/> 
              </section>
            }
          />

          <Route path ='/events/city/:city'
            exact strict
            render={
              (props) => 
              <section>
                <List url = {`/events/city/${props.match.params.city}`} cardType="event" {...props}/> 
              </section>
            }
          />

          <Route path ='/events/performer/:id'
            exact strict
            render={
              (props) => 
              <section>
                <List url = {`/events/performer/${props.match.params.id}`} cardType="event" {...props}/> 
              </section>
            }
          />
        
        </div>    
      </Router>
    );
  }
}

const exampleTicket = {
  "id": "5e152ac98dc670548c07cab4",
  "createdAt": "2020-01-08T01:05:13.404+0000",
  "updatedAt": "2020-01-08T01:05:13.404+0000",
  "status": "new",
  "user": {
    "id": "5e152ac88dc670548c07caa2",
    "createdAt": "2020-01-08T01:05:12.647+0000",
    "updatedAt": "2020-01-08T01:05:12.647+0000",
    "providerId": null,
    "firstName": "Emily",
    "lastName": "Ball",
    "email": "eaball35@gmail.com",
    "address": {
      "id": "5e152ac88dc670548c07ca9c",
      "createdAt": "2020-01-08T01:05:12.120+0000",
      "updatedAt": "2020-01-08T01:05:12.120+0000",
      "address1": "141 Parfitt Way SW",
      "address2": "",
      "city": "Bainbridge Island",
      "state": "WA",
      "zipCode": "98110"
    }
  },
  "event": {
    "id": "5e152ac98dc670548c07caae",
    "createdAt": "2020-01-08T01:05:13.160+0000",
    "updatedAt": "2020-01-08T01:05:13.160+0000",
    "categories": [
      {
        "id": "5e152ac88dc670548c07caa8",
        "createdAt": "2020-01-08T01:05:12.926+0000",
        "updatedAt": "2020-01-08T01:05:12.926+0000",
        "type": "music",
        "genre": "pop",
        "imageUrls": [
          "https://www.muralswallpaper.com/app/uploads/dotted-explosion-pop-art-retro-plain-820x532.jpg"
        ]
      },
      {
        "id": "5e152ac98dc670548c07caa9",
        "createdAt": "2020-01-08T01:05:12.926+0000",
        "updatedAt": "2020-01-08T01:05:12.926+0000",
        "type": "music",
        "genre": "rnb",
        "imageUrls": [
          "https://images.8tracks.com/cover/i/009/209/935/tumblr_n2ckgciXRP1s5p5luo1_r1_500-6742.jpg?rect=0,0,500,500&q=98&fm=jpg&fit=max"
        ]
      }
    ],
    "venue": {
      "id": "5e152ac88dc670548c07caa7",
      "createdAt": "2020-01-08T01:05:12.818+0000",
      "updatedAt": "2020-01-08T01:05:12.818+0000",
      "eventfulId": "ABCDE",
      "title": "Wrigley Field",
      "description": "Venue Description",
      "venueDetails": "Venue Details",
      "location": {
        "id": "5e152ac88dc670548c07caa1",
        "createdAt": "2020-01-08T01:05:12.120+0000",
        "updatedAt": "2020-01-08T01:05:12.120+0000",
        "address1": "1060 W Addison St",
        "address2": "",
        "city": "Chicago",
        "state": "IL",
        "zipCode": "60613"
      }
    },
    "eventfulId": "ABCD",
    "title": "Beyonce Lemonade",
    "artist": "Beyonce",
    "description": "Event Description",
    "start": "2020-01-08T01:05:13.160+0000",
    "end": "2020-01-08T01:05:13.160+0000",
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
