import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  return (
    
<>
      <header className="header_homepage">
        <img src="/images/logo3.png" alt="Bistr-O-Byte Logo" className="logo_homepage" />
        <h1 className="header-title_homepage">Bistr-O-Byte</h1>
      </header>

    <main className="homepage-container">
      <div className="homepage-content_homepage">
        <div className="image-container_homepage">
          <img src="/images/imag.png" alt="Descriere Poza" className="home-image_homepage" />
        </div>


        <div className="buttons-container_homepage">
          <Link to="/fridge" className="button_homepage">My Fridge</Link>
          <Link to="/dish-finder" className="button_homepage">Dish Finder</Link>
          <Link to="/meal-planner" className="button_homepage">Meal Planner</Link>
        </div>
      </div>
    </main>
    </>
  );
}

export default Homepage;
