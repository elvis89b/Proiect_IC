import React from 'react';
import { Link } from 'react-router-dom'; 
import './ForgotPassword.css';

function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">
        <h2 className="forgot-password-title">Find your account</h2>
        <p className="forgot-password-instructions">
          Please enter your email to search for your account.
        </p>
        <form className="forgot-password-form">
          <div className="forgot-password-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="forgot-password-buttons">
            <Link to="/login" className="cancel-button">
              Cancel
            </Link>

            <button type="button" className="search-button">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
