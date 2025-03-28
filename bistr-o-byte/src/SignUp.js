import React from 'react';
import './SignUp.css'; 

function SignUp() {
  return (
    
    <div className="signup-container">
      <header className="signup-header">
        <img src="/images/logo1.png" alt="Bistr-O-Byte Logo" className="signup-logo" />
        <h1 className="signup-header-title">Bistr-O-Byte</h1>
      </header>
      <div className="signup-form-container">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form">
          <div className="signup-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat your password"
            />
          </div>

          
            <button type="button" className="signup-button">
              Sign up
            </button>
         
        </form>

        <div className="signup-footer">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  
  );
}

export default SignUp;
