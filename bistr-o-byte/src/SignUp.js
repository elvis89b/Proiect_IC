import React from 'react';
import './SignUp.css'; // Importă fișierul CSS

function SignUp() {
  return (
    <div className="signup-container">
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
            Sign Up
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
