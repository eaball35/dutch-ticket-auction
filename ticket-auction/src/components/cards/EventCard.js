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
      title = title.substring(0,25) + "..."
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
              <p>Other details</p>
            </section>
          )
        }
      }


      return (
        <section className="eventCard-wrapper" >
          <section className="eventCard-container">
            <h4 className="eventCard-start">{start}</h4>
            <div className="eventCard-icon-img">
              <img src={this.props.event.imageUrls[0]} alt={title} onClick={this.onClick} />
            </div>
            <div className="eventCard-details">
              <h2 onClick={this.onClick}> {title} </h2>
              <h4> {this.props.event.description} </h4>
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
