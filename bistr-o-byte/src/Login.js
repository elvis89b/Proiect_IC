import React from 'react';
import { Link } from 'react-router-dom'; 
import './Login.css';

function Login() {
  return (
    <>
      <header className="signup-header">
        <img src="/logo1.png" alt="Bistr-O-Byte Logo" className="signup-logo" />
        <h1 className="signup-header-title">Bistr-O-Byte</h1>
      </header>

    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Sign In</h2>
        <form className="login-form">
          <div className="login-form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="johndoe"
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
            />
          </div>

          <button className="login-button" type="button">
            <Link to="/homepage">LOGIN</Link>
          </button>
        </form>

        <div className="login-links">
          <Link to="/forgot-password">Forgot account?</Link>
        </div>

        <div className="login-new-user">
          <span>New User? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
