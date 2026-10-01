import { useState } from "react";
import type { User } from "./types";
import { Navbar } from "./components/Navbar";
import { AuthCard } from "./components/AuthCard";
import { Dashboard } from "./components/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("rad_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem("rad_auth_user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to persist user in localStorage:", e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem("rad_auth_user");
    } catch (e) {
      console.error("Failed to remove user from localStorage:", e);
    }
  };

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <AuthCard onLoginSuccess={handleLoginSuccess} />
        )}
      </main>
    </div>
  );
}

export default App;