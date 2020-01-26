import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Header from './components/nav/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticket from './components/listings/Ticket'
import Event from './components/listings/Event'
import Order from './components/listings/Order'
import NewTicket from './components/forms/NewTicketForm';
import EventTicketForm from './components/forms/EventTicketForm';
import List from './components/main/List';
import ByLocationPage from './components/main/ByLocationPage';
import ManageMyTickets from './components/main/ManageMyTickets';
import CategoryNav from './components/nav/CategoryNav';
import RegisterForm from './components/forms/RegisterForm.js';
import EditAccountForm from './components/forms/EditAccountForm.js';
import SignInForm from './components/forms/SignInForm.js';
import PurchaseForm from './components/forms/PurchaseForm.js';
import Data from './components/cards/Data.js'
import Map from './components/main/Map.js';
import Checkout from './components/main/Checkout.js';
import GMap from './components/main/GoogleMap.js';
import TopCities from './components/main/TopCities';
import { GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import MyAccount from './components/main/MyAccount';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      currentUser: undefined,
      cartTicket: "",
      shippingAddress: undefined,
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
  
  updateShippingAddress = (shippingAddress) => {
    this.setState({shippingAddress})
  }

  logout = () => {
    this.setState({})
  }

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
            <main>
              <header>
                <h1>Sign In</h1>
              </header>
              <SignInForm updateCurrentUser={this.updateLoginUser}></SignInForm>
            </main>
          </Route>
          
          <Route path ='/register' exact strict>
            <main>
              <header>
                <h1>Register</h1>
              </header>
              <RegisterForm updateCurrentUser={this.updateLoginUser}></RegisterForm>
            </main>
          </Route>
          
  {/* User/Account Pages */}
          <Route path ='/myaccount/:userId' 
            exact strict 
            render = { (props) => 
              <main>
                {
                  (this.state.currentUser)
                    ? <MyAccount currentUser={this.state.currentUser}/>
                    : <h2 className="no-access-msg">Sorry, you can't access this page</h2>
                }
              </main>
            }
          />

          <Route path ='/myaccount/edit/:userId' 
            exact strict 
            render = { (props) => 
              <main >
                {
                  (this.state.currentUser)
                    ? <EditAccountForm currentUser={this.state.currentUser}/>
                    : <h2 className="no-access-msg">Sorry, you can't access this page.</h2>
                }
              </main>
            }
          />

          <Route path ='/myaccount/delete/:userId' 
            exact strict 
            render = { (props) => 
              <main >
                {
                  (this.state.currentUser)
                    ? <h1>Delete {this.state.currentUser.username}'s account</h1>
                    : <h2 className="no-access-msg">Sorry, you can't access this page</h2>
                }
              </main>
            }
          />

          <Route path ='/myaccount/tickets/:userId'
            exact strict 
            render = { (props) => 
              <main >
                {
                  (this.state.currentUser)
                    ? <ManageMyTickets currentUser={this.state.currentUser}/>
                    : <h2 className="no-access-msg">Sorry, you can't access this page</h2>
                }
              </main>
            }
          />
          
          <Route path ='/seller-stats/:userId'
            exact strict
            render = { (props) => 
              <main >
                {
                  (this.state.currentUser)
                    ? <h1>{this.state.currentUser.username}'s Seller Stats </h1>
                    : <h2 className="no-access-msg">Sorry, you can't access this page</h2>
                }
              </main>
            }
          />

  {/* Checkout Pages */}
          <Route path ='/checkout' exact strict>
            <main>
              <header>
                <h1>Checkout</h1>  
              </header>
              <Checkout cartTicket={this.state.cartTicket} updateLoginUser={this.updateLoginUser} currentUser={this.state.currentUser} updateShippingAddress={this.updateShippingAddress} />
            </main>
          </Route>

          <Route path ='/checkout/purchase' exact strict>
            <main>
            <header>
              <h1>Purchase</h1>
            </header>
            <PurchaseForm cartTicket={this.state.cartTicket} currentUser={this.state.currentUser} shippingAddress={this.state.shippingAddress}/>
            </main>
          </Route>

          <Route path ='/orders/:id' 
            exact strict 
            render = {
              (props) => 
              <main >
                <Order orderId={props.match.params.id}/>
              </main>
            }
          />

          <Route path ='/test' 
            exact strict 
            render = {
              (props) => 
              <main >
                <Data/>
              </main>
            }
          />

  {/* Create Pages */}
          <Route path ='/new-ticket' exact strict>
            <main>
              
              <section>
                    <header>
                      <h1>Create New Ticket Listing</h1>
                    </header>
                    <EventTicketForm currentUser = {this.state.currentUser} />
                    {/* <NewTicket currentUser = {this.state.currentUser} /> */}
                  </section> 
            </main>
          </Route>

  {/* Nav Link Pages */}
          <Route path ='/' exact strict>
            <main>
              <header>
                <h1>Home</h1>
              </header>
            </main>
          </Route>

          <Route path ='/search/:query' 
            exact strict 
            render = {
              (props) => 
              <main >
                <header>
                  <h1>Search : "{props.match.params.query}"</h1>
                </header>
                <List url={`/search?q=${props.match.params.query}`} cardType="event"/>
              </main>
            }
          />

          <Route path ='/events' exact strict>
            <main>
              <header>
                <h1>Events</h1>
              </header>
              <List url='/events/all' cardType="event" />
            </main>
          </Route>

          <Route path ='/performers' exact strict>
            <main>
              <header>
                <h1>Performers</h1>
              </header>
              <List url='/performers/all' cardType="performer" />
            </main>
          </Route>

          <Route path ='/sports' exact strict>
            <main>
              <header>
                <h1>Sports</h1>
              </header>
              <List url="/categories/type/sports" cardType="category"/>
            </main>
          </Route>

          <Route path ='/music' exact strict>
            <main>
              <header>
                <h1>Music</h1>
              </header>
              <List url="/categories/type/music" cardType="category"/>
            </main>
          </Route>

          <Route path ='/comedy' exact strict>
            <main>
              <header>
                <h1>Comedy</h1>
              </header>
              <List url="/events/category?type=comedy" cardType="event"/>
            </main>
          </Route>

          <Route path ='/location' exact strict>
            <main>
              <header>
                <h1>By Location</h1>
              </header>
              <ByLocationPage/>  
            </main>
          </Route>
        
  {/* Nested Pages */}
          <Route path ='/tickets/:id' 
            exact strict 
            render = {
              (props) => 
              <main >
                <Ticket example={false} {...props} addToCheckout={this.addToCheckout.bind(this)} ticketId={props.match.params.id} /> 
              </main>
            }
          />

          <Route path ='/events/:id' 
            exact strict 
            render={
              (props) => 
                <main>
                  <Event {...props} /> 
                </main>
            }
          />

        <Route path ='/events/category/:type'
            exact strict
            render={
              (props) => 
                <main>
                  <header>
                    <h1>Events - {props.match.params.type}</h1>
                  </header>
                  <List url = {`/events/category?type=${props.match.params.type}`} cardType="event"  {...props}/> 
                </main>
            }
          />
          
          
          <Route path ='/events/category/:type/:genre'
            exact strict
            render={
              (props) => 
              <main>
                <header>
                  <h1>Events - {props.match.params.genre}</h1>
                </header>
                <List url = {`/events/category?type=${props.match.params.type}&genre=${props.match.params.genre}`} cardType="event" {...props}/> 
              </main>
            }
          />

          <Route path ='/events/city/:city'
            exact strict
            render={
              (props) => 
              <main>
                <header>
                  <h1>Events - {props.match.params.city}</h1>
                </header>
                <List url = {`/events?city=${props.match.params.city}`} cardType="event" {...props}/> 
              </main>
            }
          />

          <Route path ='/events/performer/:name/:id'
            exact strict
            render={
              (props) => 
              <main>
                <header>
                  <h1>Events - {props.match.params.name}</h1>
                </header>
                <List url = {`/events?performer=${props.match.params.id}`} cardType="event" {...props}/> 
              </main>
            }
          />

          <footer></footer>
        
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
