import React, { useState } from "react";
import "./AdminLoginScreen.css";

function AdminLoginScreen({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (onLogin) {
      onLogin();
    }
  }

  return (
    <div className="admin-login-screen">

      {/* TOP NAVIGATION */}

      <div className="admin-top-navigation">

        <button
          type="button"
          className="admin-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

      </div>

      {/* MAIN CONTENT */}

      <main className="admin-login-content">

        {/* HEADER */}

        <div className="admin-login-header">

          <div className="admin-login-logo">
            ♻️
          </div>

          <div>
            <h1>
              Admin Portal
            </h1>

            <p className="admin-login-subtitle">
              Manage and monitor the recycling platform
            </p>
          </div>

        </div>

        {/* LOGIN SECTION */}

        <div className="admin-login-form-section">

          <div className="admin-login-heading">
            <h2>
              Administrator Login
            </h2>

            <p>
              Sign in to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="admin-form-group">

              <label htmlFor="admin-email">
                Email Address
              </label>

              <input
                id="admin-email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            {/* PASSWORD */}

            <div className="admin-form-group">

              <label htmlFor="admin-password">
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* SIGN IN */}

            <button
              type="submit"
              className="admin-login-button"
            >
              <span className="admin-login-button-text">
                Sign In
              </span>

              <span className="admin-login-button-arrow">
                →
              </span>
            </button>

          </form>

        </div>

        {/* SECURITY */}

        <div className="admin-security-note">
          <span>🔒</span>

          <div>
            <strong>
              Authorized administrators only
            </strong>

            <small>
              Secure access to the recycling management platform
            </small>
          </div>
        </div>

      </main>

    </div>
  );
}

export default AdminLoginScreen;