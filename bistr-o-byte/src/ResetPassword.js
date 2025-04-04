import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      //apel la backend pt resetarea parolei
      const response = await fetch('http://localhost:5062/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, newPassword: password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setErrorMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Server error. Please try again later.');
    }
  };


  return (
    <>
      <header className="header_resetPassword">
        <img src="/images/logo1.png" alt="Bistr-O-Byte Logo" className="logo_resetPassword" />
        <h1 className="header-title_resetPassword">Bistr-O-Byte</h1>
        <div className="login-form_resetPassword">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="login-input_resetPassword"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="login-input_resetPasswordge"
          />
          <button className="login-button_resetPassword">
            <Link to="/homepage" className="login-button_resetPassword">Login</Link>
          </button>
        </div>
      </header>

      
      <div className="reset-password-container">
        <div className="reset-password-form-container">
          <h2 className="reset-password-title">Choose a new password</h2>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form className="reset-password-form" onSubmit={handleResetPassword}>
            <div className="reset-password-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <div className="reset-password-buttons">
              <Link to="/login" className="cancel-button_resetPassword">Cancel</Link>
              <button type="submit" className="done-button_resetPassword">
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;