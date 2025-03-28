import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="header">
        <img src="/images/logo3.png" alt="Bistr-O-Byte Logo" className="logo" />
        <h1 className="header-title">Bistr-O-Byte</h1>
      </header>

      <div className="homepage-content">
        <div className="image-container">
          <img src="/images/imag.png" alt="Descriere Poza" className="home-image" />
        </div>


        <div className="buttons-container">
          <Link to="/my-fridge" className="button">My Fridge</Link>
          <Link to="/dish-finder" className="button">Dish Finder</Link>
          <Link to="/design-plan" className="button">Design Plan</Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
