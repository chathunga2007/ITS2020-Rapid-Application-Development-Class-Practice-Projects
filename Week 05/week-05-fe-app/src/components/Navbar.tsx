import React from "react";
import type { User } from "../types";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim()) return name.trim().charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">RAD</div>
        <div>
          <div className="brand-text">Week 05 Portal</div>
        </div>
        <span className="brand-tag">Express + Vite</span>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <div className="user-badge-header">
              <div className="user-avatar-sm">
                {getInitials(user.name || user.username, user.email)}
              </div>
              <span>{user.name || user.username || user.email}</span>
            </div>
            <button className="btn-logout" onClick={onLogout} title="Log out from session">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </>
        ) : (
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            API: http://localhost:3000
          </span>
        )}
      </div>
    </header>
  );
};
