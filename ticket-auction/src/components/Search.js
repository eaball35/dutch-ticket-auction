import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import './Search.css'

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  onChange = (event) => {
    this.setState({ query: event.target.value })
  }
  
  render() {
    return(
      <section>
        <form onSubmit={this.onSubmit}>
          <input 
            className='large-search-bar'
            type='text' 
            placeholder='Search tickets...' 
            value={this.state.query}
            onChange={this.onChange} 
          />
          <input 
            type='submit' 
            value='Search'
            className='btn btn-primary'
          />
        </form>
      </section>
    )
  };
}

Search.propTypes = {
};

export default Search;
