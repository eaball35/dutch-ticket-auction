import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../css/SearchBar.css'

class CategoryNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  render() {
    return(
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/events" className="nav-link"> Events </Link>
            </li>
            <li className="nav-item">
              <Link to="/location" className="nav-link"> ByLocation </Link>
            </li>
            <li className="nav-item">
              <Link to="/performers" className="nav-link"> Performers </Link>
            </li>
            <li className="nav-item">
              <Link to="/music" className="nav-link"> Music </Link>
            </li>
            <li className="nav-item">
              <Link to="/sports" className="nav-link"> Sports </Link>
            </li>
            <li className="nav-item">
              <Link to="/comedy" className="nav-link"> Comedy </Link>
            </li>
          </ul>
        </div>
</nav>
    )
  };
}

export default CategoryNav;
