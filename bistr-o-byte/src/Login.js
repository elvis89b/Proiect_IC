import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
  
    const params = new URLSearchParams({ username, password });
  
    try {
      const response = await fetch(
        `http://localhost:5062/api/auth/login?${params.toString()}`, 
        { method: 'GET' }
      );
  
      const data = await response.json();  
  
      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("plannerId", data.plannerId);
        navigate('/homepage');
      } else {
        setErrorMsg(data.message || 'Login failed.');
      }
    } catch (error) {
      setErrorMsg('Error connecting to server.');
    }
  };
  

  return (
    <>
      <header className="header_login">
        <img src="/images/logoG1.gif" alt="Bistr-O-Byte Logo" className="logo_login" />
        <h1 className="header-title_login">Bistr-O-Byte</h1>
      </header>

      <div className="login-container">
      <div class="decorative-form-background-L">
        <div className="login-form-container">
          <h2 className="login-title">Sign In</h2>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-button" type="submit">
              LOGIN
            </button>
          </form>

          <div className="login-links">
            <a href="/forgot-password">Forgot account?</a>
          </div>

          <div className="login-new-user">
            <span>New User? </span>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Login;