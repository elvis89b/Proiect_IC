import React from 'react';
import { Link } from 'react-router-dom';
import './DishFinder.css';
import AIChat from './AIChat';

function DishFinder() {
  return (
    <div className="dishfinder-container">
      <header className="dishfinder-header">
        <img 
          src="/images/logo3.png" 
          alt="Bistr-O-Byte Logo" 
          className="dishfinder-logo" 
        />
        <h1 className="dishfinder-title">Bistr-O-Byte</h1>
        <nav className="dishfinder-nav">
          <Link to="/homepage" className="nav-button">Homepage</Link>
          <Link to="/fridge" className="nav-button">My Fridge</Link>
          <Link to="/design-plan" className="nav-button">Design Plan</Link>
        </nav>
      </header>
    
      <div className="dishfinder-ai-chat">
        <h2>Chat with AI</h2>
        <AIChat />
      </div>
    </div>
  );
}

export default DishFinder;
