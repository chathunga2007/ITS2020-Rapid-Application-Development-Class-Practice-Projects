import React, { useEffect, useState } from "react";
import axios from "axios";
import type { User, Item } from "../types";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState<string | null>(null);

  // New item form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [isSubmittingItem, setIsSubmittingItem] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const fetchItems = async () => {
    setLoadingItems(true);
    setItemsError(null);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/item/all");
      if (res.data && Array.isArray(res.data.data)) {
        setItems(res.data.data);
      } else {
        setItems([]);
      }
    } catch (err: any) {
      console.error("Fetch items error:", err);
      setItemsError("Could not fetch items. Make sure backend is running.");
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice.trim()) return;

    setIsSubmittingItem(true);
    try {
      await axios.post("http://localhost:3000/api/v1/item", {
        name: newItemName.trim(),
        price: Number(newItemPrice) || newItemPrice,
      });

      setNewItemName("");
      setNewItemPrice("");
      // Refresh items list
      await fetchItems();
    } catch (err: any) {
      console.error("Create item error:", err);
      alert("Failed to add item: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmittingItem(false);
    }
  };

  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim()) return name.trim().charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="dashboard-container">
      {/* Hero Welcome */}
      <div className="dashboard-hero">
        <div className="hero-left">
          <h2>
            Welcome back, {user.name || user.username || "User"}!
            <span className="badge badge-success">Authenticated</span>
          </h2>
          <p>
            You have successfully logged in via <code>POST /api/v1/auth/login</code>
            <button
              onClick={onLogout}
              style={{
                marginLeft: "12px",
                background: "transparent",
                border: "none",
                color: "#fda4af",
                cursor: "pointer",
                fontSize: "0.85rem",
                textDecoration: "underline",
              }}
            >
              (Sign out)
            </button>
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-chip">
            <div className="stat-label">Total Items</div>
            <div className="stat-value">{items.length}</div>
          </div>
          <div className="stat-chip">
            <div className="stat-label">User Role</div>
            <div className="stat-value" style={{ fontSize: "1rem", color: "#a5b4fc" }}>
              {user.roles?.join(", ") || "USER"}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: User Profile & Items Manager */}
      <div className="dashboard-grid">
        {/* Profile Details Card */}
        <div className="panel-card">
          <div className="panel-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Auth Profile Details
            </h3>
            <span className={`badge ${user.approve ? "badge-success" : "badge-warning"}`}>
              {user.approve ? "Approved" : "Pending Approval"}
            </span>
          </div>

          <div className="profile-overview">
            <div className="avatar-large">
              {getInitials(user.name || user.username, user.email)}
            </div>
            <div className="profile-meta">
              <h4>{user.name || user.username || "Anonymous"}</h4>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="detail-list">
            <div className="detail-row">
              <span className="detail-label">Database ID</span>
              <span className="detail-value">{user._id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Username</span>
              <span className="detail-value">{user.username || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Assigned Roles</span>
              <div>
                {user.roles?.map((role, idx) => (
                  <span key={idx} className="badge badge-role" style={{ marginLeft: "4px" }}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className="detail-value" style={{ color: user.approve ? "var(--success)" : "var(--warning)" }}>
                {user.approve ? "Active / Approved" : "Awaiting Approval"}
              </span>
            </div>
          </div>

          {/* Collapsible Backend JSON */}
          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              onClick={() => setShowJson(!showJson)}
              style={{
                background: "transparent",
                border: "1px dashed var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                padding: "8px 12px",
                width: "100%",
                fontSize: "0.85rem",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {showJson ? "▲ Hide Raw Auth Payload" : "▼ Inspect Raw Auth API Response JSON"}
            </button>
            {showJson && (
              <pre className="json-viewer" style={{ marginTop: "10px" }}>
                {JSON.stringify(user, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Items List Card (Preserving & upgrading your previous work) */}
        <div className="panel-card">
          <div className="panel-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              Items API (/api/v1/item)
            </h3>
            <button
              type="button"
              onClick={fetchItems}
              disabled={loadingItems}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                padding: "4px 10px",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {loadingItems ? "Refreshing..." : "↻ Refresh"}
            </button>
          </div>

          {/* Quick Add Item Form */}
          <form onSubmit={handleCreateItem} className="add-item-form">
            <input
              type="text"
              placeholder="Item name (e.g. Laptop)"
              className="form-input no-icon"
              style={{ flex: 2 }}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="form-input no-icon"
              style={{ flex: 1 }}
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "auto", margin: 0, padding: "0 16px" }}
              disabled={isSubmittingItem}
            >
              {isSubmittingItem ? "..." : "+ Add"}
            </button>
          </form>

          {/* Items Display */}
          {itemsError && (
            <div className="alert alert-error">
              <span>{itemsError}</span>
            </div>
          )}

          {loadingItems && items.length === 0 ? (
            <div className="empty-state">
              <span className="spinner"></span>
              <p>Loading items from backend...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <p>No items in database yet.</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                Add your first item using the form above!
              </p>
            </div>
          ) : (
            <div className="items-list">
              {items.map((it: any, index: number) => (
                <div key={it._id || index} className="item-card">
                  <div className="item-info">
                    <h4>{it.name}</h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      ID: {it._id || index + 1}
                    </span>
                  </div>
                  <div className="item-price">
                    Rs. {Number(it.price).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
