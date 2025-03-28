import React from 'react';
import { Link } from 'react-router-dom'; 
import './ForgotPassword.css';

function ForgotPassword() {
  return (
    <>
      {/* Header-ul cu logo-ul si titlul */}
      <header className="signup-header">
        <img src="/logo1.png" alt="Bistr-O-Byte Logo" className="signup-logo" />
        <h1 className="signup-header-title">Bistr-O-Byte</h1>
      </header>

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

            <Link to="/reset-password" className="search-button">
               Search
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default ForgotPassword;
