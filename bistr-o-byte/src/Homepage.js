import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  return (
    
<>
      <header className="header_homepage">
        <img src="/images/logoG1.gif" alt="Bistr-O-Byte Logo" className="logo_homepage" />
        <h1 className="header-title_homepage">Bistr-O-Byte</h1>
        <Link to="/login" className="Logout_button_homepage">Logout</Link>
      </header>

    <main className="homepage-container">
      <div className="homepage-content_homepage">
        <div className="image-container_homepage">
          <img src="/images/pizza.gif" alt="Descriere Poza" className="home-image_homepage" />
        </div>

        <div className="buttons-container_homepage">
          <Link to="/fridge" className="button_homepage">My Fridge</Link>
          <Link to="/meal-planner" className="button_homepage">Meal Planner</Link>
          
        </div>
      </div>
    </main>
    </>
  );
}

export default Homepage;
