import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { deleteArticle, getAllArticles, type IArticle } from "../service/article"
import "../App.css"

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [articles, setArticles] = useState<IArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const res = await getAllArticles()
      if (res.data) {
        setArticles(res.data)
      }
    } catch (err) {
      console.error("Failed to load articles:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("REFRESH_TOKEN")
    navigate("/login")
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      setDeletingId(id)
      await deleteArticle(id)
      setArticles((prev) => prev.filter((a) => a._id !== id))
    } catch (err) {
      console.error("Failed to delete article:", err)
      alert("Could not delete article.")
    } finally {
      setDeletingId(null)
    }
  }

  // Filter articles based on search query and selected tag
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag =
      !selectedTag ||
      (article.tags && article.tags.includes(selectedTag))

    return matchesSearch && matchesTag
  })

  // Collect all unique tags
  const allTags = Array.from(
    new Set(
      articles
        .flatMap((a) => a.tags || [])
        .map((t) => t.trim())
        .filter(Boolean)
    )
  )

  return (
    <div className="home-dashboard-layout">
      {/* Navbar */}
      <header className="article-navbar">
        <div className="nav-container">
          <Link to="/" className="brand-logo">
            <span className="logo-icon">📰</span>
            <span className="logo-text">RAD Articles</span>
          </Link>

          <div className="nav-user-actions">
            <span className="user-greeting">
              Signed in as <strong>{user?.email || user?.name || "User"}</strong>
            </span>
            <Link to="/create-article" className="btn-primary-nav">
              + New Article
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">Week 06 • Class Project</span>
          <h1>Knowledge Sharing & Article Hub</h1>
          <p>
            Create, publish, and explore articles with rich cover images powered
            by Express Multipart Form Data and MongoDB.
          </p>
          <div className="hero-ctas">
            <Link to="/create-article" className="hero-cta-btn">
              ✍️ Write New Article
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Controls Bar: Search & Tag Filter */}
        <div className="filters-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title, author, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          {allTags.length > 0 && (
            <div className="tag-filters">
              <button
                className={`tag-filter-btn ${selectedTag === null ? "active" : ""}`}
                onClick={() => setSelectedTag(null)}
              >
                All ({articles.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-filter-btn ${selectedTag === tag ? "active" : ""}`}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Articles Feed */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading articles from backend...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-icon">📝</div>
            <h3>No articles found</h3>
            <p>
              {searchTerm || selectedTag
                ? "No articles matched your filter criteria."
                : "No articles have been saved yet. Be the first to publish one!"}
            </p>
            <Link to="/create-article" className="btn-empty-cta">
              Create First Article
            </Link>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map((article) => {
              const formattedDate = new Date(
                article.createdAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })

              return (
                <article key={article._id} className="article-card">
                  {/* Cover Image */}
                  <div className="article-card-cover">
                    {article.imageURL ? (
                      <img
                        src={article.imageURL}
                        alt={article.title}
                        className="article-img"
                        onError={(e) => {
                          // Fallback if image fails loading
                          ;(e.target as HTMLElement).style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="placeholder-cover">
                        <span className="placeholder-icon">📄</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="article-card-body">
                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="article-tags-row">
                        {article.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="tag-badge"
                            onClick={() => setSelectedTag(t)}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="article-title">{article.title}</h2>

                    <p className="article-snippet">{article.content}</p>

                    {/* Footer Info */}
                    <div className="article-card-footer">
                      <div className="author-info">
                        <span className="author-avatar">
                          {article.author.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div className="author-name">{article.author}</div>
                          <div className="article-date">{formattedDate}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(article._id, article.title)}
                        className="btn-delete-card"
                        disabled={deletingId === article._id}
                        title="Delete article"
                      >
                        {deletingId === article._id ? "..." : "🗑️"}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}