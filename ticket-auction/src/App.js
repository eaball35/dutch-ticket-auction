import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Header from './components/nav/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticket from './components/listings/Ticket'
import Event from './components/listings/Event'
import NewTicket from './components/forms/NewTicketForm';
import List from './components/main/List';
import CategoryNav from './components/nav/CategoryNav';
import RegisterForm from './components/forms/RegisterForm.js';
import SignInForm from './components/forms/SignInForm.js';
import PurchaseForm from './components/forms/PurchaseForm.js';
import Map from './components/main/Map.js';
import Checkout from './components/main/Checkout.js';
import GMap from './components/main/GoogleMap.js';
import TopCities from './components/main/TopCities';
import { GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';

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
      selectedState: "WA",
      cartTicket: undefined,
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
  
  mapHandler = (event) => {
    this.setState({selectedState: event.target.dataset.name })
  };

  addToCheckout = (cartTicket) => {
    this.setState({cartTicket})
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
            <SignInForm updateCurrentUser={this.updateLoginUser}></SignInForm>
          </Route>
          
          <Route path ='/register' exact strict>
            <header>
              <h1>Register</h1>
            </header>
              <RegisterForm updateCurrentUser={this.updateLoginUser}></RegisterForm>
            
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
              <Checkout cartTicket={this.state.cartTicket} />
            </header>
          </Route>

          <Route path ='/checkout/purchase' exact strict>
            <header>
              <h1>Purchase</h1>
              <PurchaseForm cartTicket={this.state.cartTicket}/>
            </header>
          </Route>

  {/* Create Pages */}
          <Route path ='/new-ticket' exact strict>
            <NewTicket 
              exampleTicket={exampleTicket} 
              currentUserId = {this.state.currentUserId}
            />
          </Route>

  {/* Nav Link Pages */}
          <Route path ='/' exact strict>
            <header>
              <h1>Home</h1>
            </header>
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
              <h1>By Location</h1>
            </header>
            
            <section className="map-cities-container">
              <Map selectedState={this.state.selectedState} mapHandler={this.mapHandler.bind(this)}/>
              <TopCities selectedState={this.state.selectedState}></TopCities>
            </section>
              
              <GMap
                google={this.props.google}
                zoom={8}
                initialCenter="Seattle WA"
                collectionURL="/events/all"
              >
              <Marker position={{ lat: 48.00, lng: -122.00}} />
            </GMap>
          </Route>
        
  {/* Nested Pages */}
          <Route path ='/tickets/:id' 
            exact strict 
            render = {
              (props) => 
              <section >
                <Ticket example={false} {...props} addToCheckout={this.addToCheckout.bind(this)} /> 
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
                  <header>
                    <h1>Events - {props.match.params.type}</h1>
                  </header>
                  <List url = {`/events/category/${props.match.params.type}`} cardType="event"  {...props}/> 
                </section>
            }
          />
          
          
          <Route path ='/events/category/:type/:genre'
            exact strict
            render={
              (props) => 
              <section>
                <header>
                  <h1>Events - {props.match.params.genre}</h1>
                </header>
                <List url = {`/events/category/${props.match.params.type}/${props.match.params.genre}`} cardType="event" {...props}/> 
              </section>
            }
          />

          <Route path ='/events/city/:city'
            exact strict
            render={
              (props) => 
              <section>
                <header>
                  <h1>Events - {props.match.params.city}</h1>
                </header>
                <List url = {`/events/city/${props.match.params.city}`} cardType="event" {...props}/> 
              </section>
            }
          />

          <Route path ='/events/performer/:name/:id'
            exact strict
            render={
              (props) => 
              <section>
                <header>
                  <h1>Events - {props.match.params.name}</h1>
                </header>
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
