import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-brand">MyApp</div>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/login" className="logout-btn">
            Logout
          </Link>
        </div>
      </nav>

      <main className="home-content">
        <section className="hero">
          <div className="hero-content">
            <span className="welcome-badge">WELCOME</span>

            <h1>
              Welcome to <span>MyApp</span>
            </h1>

            <p>
              A clean and simple platform designed to give you
              a smooth and enjoyable experience.
            </p>

            <div className="hero-actions">
              <button className="primary-btn">
                Get Started
              </button>

              <Link to="/login" className="secondary-btn">
                Logout
              </Link>
            </div>
          </div>
        </section>

        <section className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast</h3>
            <p>
              Enjoy a quick and smooth user experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>
              Your account and information are protected.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Simple</h3>
            <p>
              Clean interface that is easy to understand.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;