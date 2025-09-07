import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
    marginBottom: "1.5rem",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    marginRight: "1rem",
  };

  const buttonStyle = {
    border: "1px solid #dc3545",
    backgroundColor: "transparent",
    color: "#dc3545",
    padding: "0.35rem 0.75rem",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontWeight: "bold", fontSize: "1.2rem" }}>
          Mon Blog
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
          <li><Link to="/" style={linkStyle}>Accueil</Link></li>
          {token && (
            <>
              <li><Link to="/articles" style={linkStyle}>Articles</Link></li>
              <li><Link to="/friends" style={linkStyle}>Amis</Link></li>
              <li><Link to="/articles/new" style={linkStyle}>Créer un article</Link></li>
            </>
          )}
        </ul>

        <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, marginLeft: "2rem" }}>
          {!token ? (
            <>
              <li><Link to="/login" style={linkStyle}>Connexion</Link></li>
              <li><Link to="/register" style={linkStyle}>Inscription</Link></li>
            </>
          ) : (
            <li>
              <button style={buttonStyle} onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
