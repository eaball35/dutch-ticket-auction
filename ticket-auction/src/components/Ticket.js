import React, { Component } from 'react';
import './Ticket.css';
import axios from 'axios';

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsTab: 'auction',
      ticket: this.props.ticket,
      errorDetails: null,
    };
  }

  componentDidMount = () => {
    if(!this.props.example) {
      this.fetchTicket();
    }
  }

  fetchTicket() {
    axios.get(`http://localhost:8080/tickets/${this.props.match.params.ticketnum}`)
      .then((response) => {
        this.setState({ticket: response.data})
      })
      .catch((error) => {
        this.setState({errorDetails: error.response.data})
      });
  }

  deleteTicket = () => {
    axios.delete(`http://localhost:8080/tickets/${this.state.ticket.id}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        this.setState({errorDetails: error.response.data})
      });
  }

  tabClick = (tab) => {
    if (tab === 'auction') {
      this.setState({detailsTab: 'auction'});
    } else if (tab === 'ticket') {
      this.setState({detailsTab: 'ticket'});
    } else if (tab === 'event') {
      this.setState({detailsTab: 'event'});
    };
  }

  chooseDetails = () => {
    if (this.state.detailsTab === 'auction') {
      return (this.state.ticket.auctionDetails)
    } else if (this.state.detailsTab === 'ticket') {
      return (this.state.ticket.ticketDetails)
    } else if (this.state.detailsTab === 'event') {
      return (this.state.ticket.eventDetails)
    }
  }

  render() {
    const ticketNum = () => {
      if (!this.props.example) {
        const tNum = this.props.match.params.ticketnum
        return (<h6>Ticket #: {tNum}</h6>)
      }
    }
    const listingDetails = this.state.ticket;

    const deleteButton = () => {
      if (!this.props.example) {
        return (<button className='btn btn-primary' onClick={this.deleteTicket}>Delete</button>)
      }
    }


    const errorMessages = () => {
      if (this.state.errorDetails) {
        return <p className="alert alert-danger" role="alert" >Error: {this.state.errorDetails.error} - {this.state.errorDetails.message} </p>
      }
    }

    return (
      <section>
        <section>
          {errorMessages()}
          {deleteButton()}
          {ticketNum()}
          <img src={listingDetails.eventImgUrls} alt={listingDetails.event} className='event-img'/>
          <h1>{listingDetails.artist} - {listingDetails.event}</h1>
          <h4>{listingDetails.eventStart}  |  {listingDetails.ticketQuantity} {listingDetails.ticketGrouping} </h4>
          <h2>@ {listingDetails.eventLocation}  |  {listingDetails.eventCity}, {listingDetails.eventState} </h2>
          <h4>Listed {listingDetails.createdAt} for ${listingDetails.auctionStartTotalPrice/listingDetails.ticketQuantity} <span>ea</span></h4>
          <p>{listingDetails.auctionOverview}</p>
        </section>

        <section>
          <h4>Current Price</h4>
          <h6>$109.99 <span>ea</span></h6>
          <p>last updated 2 min ago</p>
          <button className='btn btn-secondary'>Buy Now</button>
        </section>

        <section>
          <button onClick={() => {this.tabClick('auction')}}>Auction</button>
          <button onClick={() => {this.tabClick('ticket')}}>Ticket</button>
          <button onClick={() => {this.tabClick('event')}}>Event</button>
          
          <section>
            {this.chooseDetails()}
          </section>
        </section>
        
      </section>
    )
  }
}

export default Ticket;
