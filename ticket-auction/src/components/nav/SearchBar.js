import React, { Component } from 'react';
import '../../css/SearchBar.css'
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      redirect: undefined,
    };
  }

  onChange = (event) => {
    this.setState({ query: event.target.value })
  }

  onSubmit = () => {
    this.setState({ 
      query: "",
      redirect: `/search/${this.state.query}` })
  }
  
  render() {
    const { redirect } = this.state;
      if (redirect !== undefined) {
        return ( 
          <div>
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
              className='btn btn-dark'
            />
          </form>
        </section>
        <Redirect to={redirect}/>
        </div>
      )
      }
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
            className='btn btn-dark'
          />
        </form>
      </section>
    )
  };
}

export default SearchBar;
