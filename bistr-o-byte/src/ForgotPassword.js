import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './ForgotPassword.css';

function ForgotPassword() {
        const [password, setPassword] = useState('');
        const [username, setUsername] = useState('');

  return (
    <>
      <header className="header_forgotPassword">
        <img src="/images/logo1.png" alt="Bistr-O-Byte Logo" className="logo_forgotPassword" />
        <h1 className="header-title_forgotPassword">Bistr-O-Byte</h1>
        <div className="login-form_forgotPassword">
                                    <input 
                                        type="text" 
                                        placeholder="Username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="login-input_forgotPassword"
                                    />
                                    <input 
                                        type="password" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="login-input_forgotPassword"
                                    />
                                    <button className="login-button_forgotPassword">
                                        <Link to="/homepage" className="login-button_forgotPassword">Login</Link>
                                    </button>
                                </div>
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
            <Link to="/login" className="cancel-button_forgotPassword">
              Cancel
            </Link>

            <Link to="/reset-password" className="search-button_forgotPassword">
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
