import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="header_homepage">
        <img src="/images/logo3.png" alt="Bistr-O-Byte Logo" className="logo_homepage" />
        <h1 className="header-title_homepage">Bistr-O-Byte</h1>
      </header>

      <div className="homepage-content_homepage">
        <div className="image-container_homepage">
          <img src="/images/imag.png" alt="Descriere Poza" className="home-image_homepage" />
        </div>


        <div className="buttons-container_homepage">
          <Link to="/fridge" className="button_homepage">My Fridge</Link>
          <Link to="/dish-finder" className="button_homepage">Dish Finder</Link>
          <Link to="/design-plan" className="button_homepage">Design Plan</Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
