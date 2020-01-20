import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import '../../css/EventCard.css'
var dateFormat = require('dateformat');

class EventCard extends Component  {    
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
      showDetails: false,
    };
  }

  onClick = () => {
    this.setState({redirect: "/events/" + this.props.event.id})
  }

  moreDetails = () => {
    this.setState({showDetails: !this.state.showDetails})
  }


  render() {
    const start = dateFormat(this.props.event.start, "mmm dd")
    let title = this.props.event.title

    if (title.length > 25) {
      title = title.substring(0,50) + "..."
    }

    const { redirect } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }
    if (this.props.event) {
      
      const showDetails = () => {
        const event = this.props.event
        
        if (this.state.showDetails) {
          return (
            <section>
              <p>@ {event.venue.title}</p>
              <p>{event.venue.address.city.name}, {event.venue.address.city.state}</p>
              <h4> {event.description} </h4>
            </section>
          )
        }
      }



      return (
        <section className="eventCard-wrapper" >
          <section className="eventCard-container">
            <h4 className="eventCard-start">{start}</h4>
            <div className="eventCard-icon-img">
              { (this.props.event.imageUrls)
                ?<img src={this.props.event.imageUrls[0]} alt={title} onClick={this.onClick} />
                : <img src="https://images.squarespace-cdn.com/content/v1/57f0719c725e25e914a27b76/1476469701090-IYP1U1RNY0D3M72C5H3A/ke17ZwdGBToddI8pDm48kCIq0XyLJJk2FAWEONnCmDZZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzlBBQXEp281-O-7PPigqE00Dc4AsyuOsfxkxOwUQ9vmPojz-kpU2wdTDZ9661s8ZQ/events-heavenly-header.jpg?format=1500w" alt="default-event-img" onClick={this.onClick}/>
              }
            </div>
            <div className="eventCard-details">
              <h2 onClick={this.onClick}> {title} </h2>
              { (this.props.event.venue.address) 
                ? <h4> {`${this.props.event.venue.address.city.name}, ${this.props.event.venue.address.city.state}`} </h4>
                : <h4> </h4>
              }
              <p onClick={this.moreDetails}> ▼ More details </p>
            </div>
            <div className="eventCard-browseBtn">
              <button className="btn btn-dark browse-tickets-btn" onClick={this.onClick}>Browse Tickets</button>
            </div>
          </section>
          {showDetails()}
        </section>
      )
    }
    return;
  }
}

export default EventCard;
