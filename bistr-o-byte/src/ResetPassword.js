import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5062/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: password }),
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
        <img src="/images/logoG1.gif" alt="Bistr-O-Byte Logo" className="logo_resetPassword" />
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
            className="login-input_resetPassword"
          />
          <button className="login-button_resetPassword">
            <Link to="/homepage" className="login-button_resetPassword">Login</Link>
          </button>
        </div>
      </header>

      <div className="reset-password-container">
        <div className="decorative-form-background-RP">
          <div className="reset-password-form-container">
            <h2 className="reset-password-title">Reset Your Password</h2>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form className="reset-password-form" onSubmit={handleResetPassword}>
              <div className="reset-password-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  readOnly
                  className="login-input_resetPassword"
                />
              </div>
              <div className="reset-password-form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="reset-password-buttons">
                <Link to="/login" className="cancel-button_resetPassword">Cancel</Link>
                <button type="submit" className="done-button_resetPassword">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
