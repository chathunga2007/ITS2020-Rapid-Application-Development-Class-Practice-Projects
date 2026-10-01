import React, { useState } from "react";
import axios from "axios";
import type { User } from "../types";

interface AuthCardProps {
  onLoginSuccess: (user: User) => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("USER");
  const [showRegPassword, setShowRegPassword] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginEmail || !loginPassword) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email: loginEmail.trim(),
        password: loginPassword,
      });

      const result = response.data;
      setSuccessMessage(result.message || "Login successful!");
      
      // Pass logged-in user data to parent
      if (result.data) {
        setTimeout(() => {
          onLoginSuccess(result.data);
        }, 400);
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else if (err.message === "Network Error") {
        setErrorMessage("Network error! Make sure backend server is running on http://localhost:3000");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!regEmail || !regPassword) {
      setErrorMessage("Email and password are required!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
        name: regName.trim() || undefined,
        username: regUsername.trim() || undefined,
        email: regEmail.trim(),
        password: regPassword,
        roles: [regRole],
        approve: true, // auto approve new register for smooth demo
      });

      setSuccessMessage(response.data?.message || "Account created successfully! You can now log in.");
      setLoginEmail(regEmail);
      setLoginPassword(regPassword);
      
      // Switch tab to login after short delay
      setTimeout(() => {
        setActiveTab("login");
      }, 900);
    } catch (err: any) {
      console.error("Register Error:", err);
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else if (err.message === "Network Error") {
        setErrorMessage("Network error! Make sure backend server is running on http://localhost:3000");
      } else {
        setErrorMessage("Registration failed! Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{activeTab === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p>
            {activeTab === "login"
              ? "Sign in with your email & password"
              : "Register a new user in the database"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("login");
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("register");
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
          >
            Register
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMessage && (
          <div className="alert alert-error" style={{ marginBottom: "18px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" style={{ marginBottom: "18px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {activeTab === "login" ? (
          /* LOGIN FORM */
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="login-password"
                  type={showLoginPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showLoginPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="reg-name">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="reg-name"
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">@</span>
                <input
                  id="reg-username"
                  type="text"
                  className="form-input"
                  placeholder="johndoe"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  id="reg-email"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="reg-password"
                  type={showRegPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Create a strong password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                >
                  {showRegPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-role">Role</label>
              <select
                id="reg-role"
                className="form-select"
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Registering...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        )}

        <div className="quick-fill-box">
          <div className="quick-fill-title">API Target Endpoint</div>
          <div className="demo-credentials">
            <span>POST /api/v1/auth/login</span>
            <span>POST /api/v1/auth/register</span>
          </div>
        </div>
      </div>
    </div>
  );
};
