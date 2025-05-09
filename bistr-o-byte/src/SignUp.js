import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignUp = async () => {

    if (!username.trim() || !email.trim() || !password || !repeatPassword) {
      alert("All fields are required.");
      return;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = { username, email, password, repeatPassword };

    try {
      const response = await fetch("http://localhost:5062/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("User registered successfully!");
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        alert("Registration failed: " + (errorData.message || "Unknown error."));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <>
    <header className="signup-header">
        <img src="/images/logoG1.gif" alt="Bistr-O-Byte Logo" className="signup-logo" />
        <h1 className="signup-header-title">Bistr-O-Byte</h1>
      </header>

    <div className="signup-container">
      <div className="decorative-form-background">
      <div className="signup-form-container">
      
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <div className="signup-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <button className="signup-button" type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          Already have an account?{" "}
          <a href="/login">Log In</a>
        </div>
      </div>
      </div>
    </div>
    </>
  
  );
}

export default SignUp;
