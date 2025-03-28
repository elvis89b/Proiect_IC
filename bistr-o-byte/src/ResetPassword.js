import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const [password, setPassword] = useState('');

  return (
    <>
      {/* Header-ul cu logo-ul si titlul */}
      <header className="signup-header">
        <img src="/logo1.png" alt="Bistr-O-Byte Logo" className="signup-logo" />
        <h1 className="signup-header-title">Bistr-O-Byte</h1>
      </header>

    <div className="reset-password-container">
      <div className="reset-password-form-container">
        <h2 className="reset-password-title">Choose a new password</h2>
        <form className="reset-password-form">
          <div className="reset-password-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <div className="reset-password-buttons">
            <Link to="/login" className="cancel-button">Cancel</Link>
            <button type="button" className="done-button">Done</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default ResetPassword;
