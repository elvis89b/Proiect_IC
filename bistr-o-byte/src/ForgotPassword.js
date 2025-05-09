import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
        const [password, setPassword] = useState('');
        const [username, setUsername] = useState('');

        const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5062/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/reset-password'); // navighezi către pagina următoare
      } else {
        setErrorMessage(data.message || 'Email not found.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <>
      <header className="header_forgotPassword">
        <img src="/images/logoG1.gif" alt="Bistr-O-Byte Logo" className="logo_forgotPassword" />
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
    <div class="decorative-form-background">
      <div className="forgot-password-form-container">
        <h2 className="forgot-password-title">Find your account</h2>
        <p className="forgot-password-instructions">
          Please enter your email to search for your account.
        </p>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="forgot-password-form" onSubmit={handleSearch}>
          <div className="forgot-password-form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>

          <div className="forgot-password-buttons">
            <Link to="/login" className="cancel-button_forgotPassword">
              Cancel
            </Link>

            <button type="submit" className="search-button_forgotPassword">
            Search
            </button>

          </div>
        </form>
      </div>
      </div>
    </div>
    </>
  );
}

export default ForgotPassword;
